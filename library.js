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
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

addBookToLibrary("El Quijote", "Miguel de Cervantes", 863, true);
addBookToLibrary("1984", "George Orwell", 328, false);

myLibrary.forEach((book) => {
  const row = body.insertRow();

  Object.values(book).forEach((value) => {
    const cell = row.insertCell();
    cell.textContent = value;
  });
});

container.appendChild(table);
