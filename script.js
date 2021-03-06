//Declaring DOM objects
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const isbn = document.querySelector("#isbn");
const message = document.querySelector(".message");
const submitBtn = document.querySelector(".btn");
const titleList = document.querySelector(".book-title");
const authorList = document.querySelector(".book-author");
const isbnList = document.querySelector(".book-isbn");
const deleteButton = document.querySelector(".deleteMe");
let storedBooks;
let counter = -1;
let c = -1;
//Defining the book class
class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

// Initializing local storage
if (localStorage.getItem("Books") == null) {
	storedBooks = [];
} else {
	storedBooks = JSON.parse(localStorage.getItem("Books"));
	storedBooks.forEach(Book => {
		addBook(Book);
		addDelete(Book);
	});
}

function addBook(book) {
	counter++;
	let bookTitle = document.createElement("li");
	bookTitle.className = `title li-${counter} list-group-item p-0`;
	bookTitle.textContent = book.title;
	titleList.appendChild(bookTitle);
	let bookAuthor = document.createElement("li");
	bookAuthor.className = `author li-${counter} list-group-item p-0`;
	bookAuthor.textContent = book.author;
	authorList.appendChild(bookAuthor);
	let bookIsbn = document.createElement("li");
	bookIsbn.className = `isbn li-${counter} list-group-item  p-0`;
	bookIsbn.textContent = book.isbn;
	isbnList.appendChild(bookIsbn);
}

function addDelete(book) {
	c++;
	let deleteList = document.createElement("li");
	deleteButton.appendChild(deleteList);
	let deleteBtn = document.createElement("a");
	deleteBtn.textContent = "X";
	deleteBtn.className = "list-group-item ";
	deleteBtn.setAttribute("href", "#");
	deleteBtn.setAttribute("id", `${c}`);

	deleteList.appendChild(deleteBtn);
	deleteBtn.addEventListener("click", e => {
		message.textContent = "Book has been removed";
		message.className = "bg-success d-block";
		window.setTimeout(() => {
			message.className = "d-none";
		}, 3000);
		let removeIndex = e.target.getAttribute("id");
		console.log(removeIndex);
		let toRemove = document.querySelectorAll(`.li-${removeIndex}`);
		console.log(toRemove);
		toRemove.forEach(li => {
			console.log(li);
			li.remove();
		});
		deleteList.remove();
		removeFromStorage(book);
	});
}

function removeFromStorage(book) {
	let r = localStorage.getItem("Books");

	r = JSON.parse(r);
	r.forEach((bk, index) => {
		if (bk.isbn == book.isbn) {
			r.splice(index, 1);
		}
	});
	// console.log(r);
	// let i = r.findIndex(obj => obj.isbn == book.isbn);
	// console.log(i);
	// r.splice(i, 1);
	// console.log(r);
	r = JSON.stringify(r);
	localStorage.setItem("Books", r);
}

//Adding a book
submitBtn.addEventListener("click", e => {
	e.preventDefault();

	// Validates if user input all the fields
	if (title.value == "" || author.value == "" || isbn.value == "") {
		message.className = "bg-danger d-block";
		message.textContent = "Please fill in all the fields";
		window.setTimeout(() => {
			message.className = "d-none";
		}, 3000);
	} else {
		// Create a book object
		let book = new Book(title.value, author.value, isbn.value);
		title.value = "";
		author.value = "";
		isbn.value = "";
		message.textContent = "Book has been added";
		message.className = "bg-success d-block";
		window.setTimeout(() => {
			message.className = "d-none";
		}, 3000);

		addBook(book);
		addDelete(book);
		storedBooks.push(book);
		localStorage.setItem("Books", JSON.stringify(storedBooks));
	}
});
