# 📚 ShelfScope

ShelfScope is a modern book discovery web app that allows users to explore, search, and interact with books using real-time data and an engaging UI.

---

## 🚀 Features

### 🔍 Search Books

•⁠ ⁠Search books by _title or author_
•⁠ ⁠Fetches real-time results using the _Open Library API_

### 📚 Book Display

•⁠ ⁠Displays:

- Book cover 🖼️
- Title 📖
- Author ✍️
  •⁠ ⁠Organized in a clean _bookshelf-style grid layout_

### 📊 Sort by Publish Year

•⁠ ⁠Sort books based on publication year:

- Old → New
- New → Old

### 🔄 Flip Card Animation

•⁠ ⁠Interactive _card flip effect_
•⁠ ⁠Front: Book cover  
•⁠ ⁠Back: Book details (title, author, year)

### ❤️ Favorites

•⁠ ⁠Add/remove books to favorites
•⁠ ⁠Stored using _localStorage_
•⁠ ⁠View favorite books instantly

### ⚠️ Empty Search Handling

•⁠ ⁠Displays meaningful message when no results are found

### ⚡ Debounced Search

•⁠ ⁠Optimized API calls while typing
•⁠ ⁠Improves performance and user experience

### 🌗 Dark / Light Mode

•⁠ ⁠Toggle between themes
•⁠ ⁠Preference saved in localStorage

---

## 🛠️ Tech Stack

•⁠ ⁠HTML
•⁠ ⁠CSS
•⁠ ⁠JavaScript
•⁠ ⁠Open Library API

---

## ⚙️ How It Works

1.⁠ ⁠Fetches books from Open Library API  
2.⁠ ⁠Displays books in card format  
3.⁠ ⁠Applies:

- Search → ⁠ filter() ⁠ / API query
- Sorting → ⁠ sort() ⁠  
  4.⁠ ⁠Flip animation shows additional details  
  5.⁠ ⁠Favorites stored using localStorage  
  6.⁠ ⁠Theme preference persists across sessions

---

## 📂 Project Structure

ShelfScope/
│── index.html
│── style.css
│── script.js

---

## 🧠 Key Concepts Used

•⁠ ⁠Array Higher Order Functions:

- ⁠ filter() ⁠
- ⁠ sort() ⁠
- ⁠ find() ⁠
  •⁠ ⁠DOM Manipulation
  •⁠ ⁠API Integration
  •⁠ ⁠Local Storage
  •⁠ ⁠Event Handling
  •⁠ ⁠Debouncing

---

## 💡 Challenges Solved

•⁠ ⁠❌ Excess API calls → solved using debouncing  
•⁠ ⁠❌ Missing book covers → handled with fallback images  
•⁠ ⁠❌ Undefined data → sanitized before display  
•⁠ ⁠❌ UI responsiveness → improved layout and spacing

---

## 🌐 Live Demo

Add your deployed link here

---

## 👩‍💻 Author

## Mritunjay Sahu
