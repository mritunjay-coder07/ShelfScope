let books = [];
let container = document.getElementById("booksContainer");
let loader = document.getElementById("loader");
let searchInput = document.getElementById("search");

let randomQueries = [
  "fiction", "science", "romance", "history",
  "technology", "fantasy", "mystery", "biography"
];

let randomQuery = randomQueries[Math.floor(Math.random() * randomQueries.length)];

fetch(`https://openlibrary.org/search.json?q=${randomQuery}`)
  .then(res => res.json())
  .then(data => {
    loader.style.display = "none";
    books = data.docs;
    displayBooks(books);
  })
  .catch((err) => {
    console.log(err);
    loader.innerText = "Uh-Oh! Failed to load books!";
  });

// fetch(`https://openlibrary.org/search.json?q=${searchInput.value || "books"}`)
//   .then(res => res.json())
//   .then(data => {
//     loader.style.display = "none";
//     books = data.docs;
//     displayBooks(books);
//   })
//   .catch(() => {
//     loader.innerText = "Uh-Oh!Failed to load books!";
//   });

function displayBooks(data) {
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<h2>No books found!</h2>";
    return;
  }

  data.slice(0, 50).forEach(book => {
    const card = document.createElement("div");
    card.classList.add("card");

    const cover = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "";

    card.innerHTML = `
      <img src="${cover}" alt="cover">
      <h3>${book.title}</h3>
      <p>${book.author_name?.[0] || "Unknown"}</p>
    `;

    container.appendChild(card);
  });
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value;

  if (!query.trim()) {
  displayBooks(books);
  return;
}

  loader.style.display = "block";

  fetch(`https://openlibrary.org/search.json?q=${query}`)
    .then(res => res.json())
    .then(data => {
      loader.style.display = "none";
      books = data.docs;
      displayBooks(books);
    })
    .catch(() => {
      loader.innerText = "Error fetching books 😢";
    });
});

// let books = [];
let sortYear = document.getElementById("sortYear");

sortYear.addEventListener("change", () => {
  let result = [...books];

  if (sortYear.value === "asc") {
    result.sort((a, b) => 
      (a.first_publish_year || 0) - (b.first_publish_year || 0)
    );
  } else if (sortYear.value === "desc") {
    result.sort((a, b) => 
      (b.first_publish_year || 0) - (a.first_publish_year || 0)
    );
  }

  displayBooks(result);
});