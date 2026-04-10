let books = [];
let container = document.getElementById("booksContainer");
let loader = document.getElementById("loader");
let searchInput = document.getElementById("search");

const bookModal = document.getElementById("bookModal");
const modalDetails = document.getElementById("modalDetails");
const closeModal = document.querySelector(".close-modal");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.querySelector(".close-lightbox");

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
      : "https://via.placeholder.com/200x300?text=No+Cover";

    const author = book.author_name?.[0] || "Unknown Author";
    const year = book.first_publish_year || "N/A";

    card.innerHTML = `
      <div class="card-inner">

        <!-- FRONT -->
        <div class="card-front">
          <button class="fav-btn">🤍</button>
          <img src="${cover}" alt="book">
        </div>

        <!-- BACK -->
        <div class="card-back">
          <button class="fav-btn">🤍</button>
          <h3>${book.title}</h3>
          <p>${author}</p>
          <p>Year: ${year}</p>
        </div>

      </div>
    `;

    const favBtns = card.querySelectorAll(".fav-btn");
    favBtns.forEach(btn => updateFavIcon(btn, book.key));


    favBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFavorite(book);
        favBtns.forEach(b => updateFavIcon(b, book.key));
      });
    });

    card.addEventListener("click", () => {
      showBookDetails(book);
    });

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

function getFavorites() {
  return JSON.parse(localStorage.getItem("bookFavorites")) || [];
}

function toggleFavorite(book) {
  let favs = getFavorites();

  const exists = favs.find(b => b.key === book.key);

  if (exists) {
    favs = favs.filter(b => b.key !== book.key);
  } else {
    favs.push(book);
  }

  localStorage.setItem("bookFavorites", JSON.stringify(favs));
}

function updateFavIcon(btn, key) {
  const favs = getFavorites();
  const isFav = favs.find(b => b.key === key);

  btn.textContent = isFav ? "❤️" : "🤍";
}

const toggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggle.checked = true;
}

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});

function showFavorites() {
  const favs = getFavorites();

  if (favs.length === 0) {
    container.innerHTML = "<h2>No favorites yet ❤️</h2>";
    return;
  }

  displayBooks(favs);
}

function showAllBooks() {
  displayBooks(books);
}

function goBack() {
  displayBooks(books); 
}

async function showBookDetails(book) {
  const coverLarge = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : "https://via.placeholder.com/400x600?text=No+Cover";
  
  const author = book.author_name?.join(", ") || "Unknown Author";

  modalDetails.innerHTML = `
    <div class="modal-centered-content">
      <img src="${coverLarge}" class="modal-cover" alt="Book Cover" onclick="openFullScreen('${coverLarge}')">
      <div class="modal-info">
        <div class="modal-header">
          <h2>${book.title}</h2>
          <button class="fav-main-btn" onclick="toggleFavoriteAndRefresh(${JSON.stringify(book).replace(/"/g, '&quot;')})">
            ❤️ Add to Favorites
          </button>
        </div>
        <p><span class="label">Author:</span> ${author}</p>
        <p><span class="label">First Published:</span> ${book.first_publish_year || "N/A"}</p>
        <div id="bookDescription" class="book-description">
          <p class="loading-text">Fetching description...</p>
        </div>
      </div>
    </div>
  `;
  bookModal.style.display = "block";

  if (book.key) {
    try {
      const res = await fetch(`https://openlibrary.org${book.key}.json`);
      const data = await res.json();
      const descriptionDiv = document.getElementById("bookDescription");
      
      let description = "No description available for this book.";
      if (data.description) {
        description = typeof data.description === 'string' 
          ? data.description 
          : data.description.value;
      }
      
      descriptionDiv.innerHTML = `
        <h3>Description</h3>
        <p>${description}</p>
      `;
    } catch (err) {
      document.getElementById("bookDescription").innerHTML = "<p>Could not load description.</p>";
    }
  }
}

function openFullScreen(url) {
  lightboxImg.src = url;
  lightbox.style.display = "flex";
}

closeModal.onclick = () => (bookModal.style.display = "none");
closeLightbox.onclick = () => (lightbox.style.display = "none");

window.onclick = (event) => {
  if (event.target == bookModal) bookModal.style.display = "none";
  if (event.target == lightbox) lightbox.style.display = "none";
};

function toggleFavoriteAndRefresh(book) {
  toggleFavorite(book);
  showBookDetails(book); 
  displayBooks(books); 
}