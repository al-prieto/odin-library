const myLibrary = [];
const container = document.getElementById("container");

const table = document.createElement("table");
const header = table.createTHead();
const rowHeader = header.insertRow();

const form = document.getElementById("bookForm");
const newBookBtn = document.getElementById("newBookBtn");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");

const formContainer = document.getElementById("bookFormContainer");

newBookBtn.addEventListener("click", () => {
  formContainer.classList.toggle("show");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const read = readInput.checked;

  if (title && author && pages) {
    addBookToLibrary(title, author, pages, read);
    displayLibrary();

    setTimeout(() => {
      formContainer.classList.remove("show");
    }, 200);
    form.reset();
  } else {
    alert("Please fill in all the fields");
  }
});

const headers = ["Title", "Author", "Pages", "Read", ""];
headers.forEach((text) => {
  const cellHeader = document.createElement("th");
  cellHeader.textContent = text;
  rowHeader.appendChild(cellHeader);
});

const body = table.createTBody();

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.toggleReadStatus = function () {
    this.read = this.read ? false : true;
    console.log(this.read);
  };
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  newBook.id = myLibrary.length;
  myLibrary.push(newBook);
}

function removeBook(id) {
  const bookIndex = myLibrary.findIndex((book) => book.id === id);

  if (bookIndex > -1) {
    myLibrary.splice(bookIndex, 1);
  }
  displayLibrary();
}

function displayLibrary() {
  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }

  myLibrary.forEach((book) => {
    const row = body.insertRow();

    row.setAttribute("data-id", book.id);
    Object.keys(book).forEach((key) => {
      if (key !== "id" && key !== "read" && key !== "toggleReadStatus") {
        const cell = row.insertCell();
        cell.textContent = book[key];
      }
    });

    const statusCell = row.insertCell();
    const statusSpan = document.createElement("span");

    if (book.read) {
      statusSpan.textContent = "Read";
      statusSpan.style.backgroundColor = "#d4f8d4";
      statusSpan.style.color = "#007500";
    } else {
      statusSpan.textContent = "Unread";
      statusSpan.style.backgroundColor = "#f8d4d4";
      statusSpan.style.color = "#750000";
    }

    statusSpan.style.padding = "5px 15px";
    statusSpan.style.borderRadius = "8px";
    statusSpan.style.display = "inline-block";
    statusSpan.style.fontWeight = "500";
    statusSpan.style.cursor = "pointer";

    statusCell.appendChild(statusSpan);

    statusSpan.addEventListener("click", () => {
      const bookIndex = myLibrary.findIndex((b) => b.id === book.id);
      if (bookIndex !== -1) {
        myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
      }
      displayLibrary();
    });

    const btnCell = row.insertCell();
    const button = document.createElement("button");
    button.textContent = "Remove";
    btnCell.appendChild(button);

    button.addEventListener("click", () => {
      removeBook(book.id);
    });
  });
}

addBookToLibrary("El Quijote", "Miguel de Cervantes", 863, true);
addBookToLibrary("1984", "George Orwell", 328, false);

displayLibrary();

container.appendChild(table);
