const bookList = document.querySelector("#book-list");
const bookForm = document.querySelector("#book-form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const completed = document.querySelector("#completed");
const myLibrary = [];

function Book(title, author, pages, completed) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.completed = completed;

  this.book = () => {
    console.log(`${title}`);
  };
}

function addBookToLibrary(book) {
  // do stuff here
  myLibrary.push(book);
}

let renderBooks = () => {
  bookList.innerHTML = "";
  myLibrary.forEach((book, index) => {
    bookList.insertAdjacentHTML(
      "beforeend",
      `<div class="card">
        <div class="book-info">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.completed ? "Yes" : "No"}</p>
        </div>
        <div id="button-container">
        <button class="remove-btn" data-index="${index}">Remove</button>
        <button class="read-btn" data-read="${index}">Toggle Read</button>
        </div>
      </div>`,
    );
  });

  // Event listener for Remove button
  const remButtons = document.querySelectorAll(".remove-btn");
  remButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      myLibrary.splice(index, 1);
      renderBooks();
    });
  });

  // Event listener for Toggle Read button
  const readButtons = document.querySelectorAll(".read-btn");
  readButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-read");
      myLibrary[index].completed = !myLibrary[index].completed;
      renderBooks();
    });
  });
};

const book1 = new Book("Fire", "Scott", 200, false);
addBookToLibrary(book1);

const clearFields = () => {
  title.value = "";
  author.value = "";
  pages.value = "";
  completed.checked = false;
};

renderBooks();
bookForm.addEventListener("submit", (event) => {
  const isCompleted = completed.checked;
  event.preventDefault();
  const book = new Book(title.value, author.value, pages.value, isCompleted);
  addBookToLibrary(book);
  clearFields();
  renderBooks();
});
