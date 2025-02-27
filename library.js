const myLibrary = [];
const container = document.getElementById("container");

const table = document.createElement("table");
const header = table.createTHead();
const rowHeader = header.insertRow();

const headers = ["Title", "Author", "Pages", "Read"];
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
    const checkboxCell = row.insertCell();
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = book.read;
    checkboxCell.appendChild(checkbox);
    const btnCell = row.insertCell();
    const button = document.createElement("button");
    button.textContent = "Remove";
    btnCell.appendChild(button);

    checkbox.addEventListener("click", () => {
      book.toggleReadStatus();
      displayLibrary();
    });
    button.addEventListener("click", () => {
      removeBook(book.id);
    });
  });
}

addBookToLibrary("El Quijote", "Miguel de Cervantes", 863, true);
addBookToLibrary("1984", "George Orwell", 328, false);

displayLibrary();

container.appendChild(table);
