const libraryGrid = document.getElementById("library");
const bookModal = document.getElementById("book-modal");
const bookForm = document.getElementById("book-form");

libraryGrid.addEventListener("click", (event) => {
    if (event.target.className.includes("book__remove")) {
        removeBookFromLibrary(event.target.parentNode.dataset.id);
        displayLibrary();
    }
})


bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(bookForm);
    console.log(formData);
    console.log(formData.get("bookTitle"));

    addBookToLibrary(formData.get("bookTitle"), formData.get("bookAuthor"), formData.get("bookPublishYear"));
    displayLibrary();

    bookModal.close();
})

const library = [];

function Book(title, author, publishYear) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.publishYear = publishYear;
}

function addBookToLibrary(title, author, publishYear) {
    const book = new Book(title, author, publishYear);
    library.push(book);
}

function removeBookFromLibrary(bookId) {
    const bookIndex = library.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        library.splice(bookIndex, 1);
    }
}

function displayLibrary() {
    libraryGrid.textContent = "";

    for (const book of library) {
        const bookCard = document.createElement("div");
        bookCard.setAttribute("class", "book card");
        bookCard.setAttribute("data-id", book.id);

        const bookRemoveButton = document.createElement("button");
        bookRemoveButton.setAttribute("class", "button book__remove");
        bookRemoveButton.textContent = "X";

        const bookCardTitle = document.createElement("h2");
        bookCardTitle.setAttribute("class", "book__title")
        bookCardTitle.textContent = book.title;

        const bookCardAuthor = document.createElement("p");
        bookCardAuthor.setAttribute("class", "book__author")
        bookCardAuthor.textContent = book.author;

        const bookCardPublishYear = document.createElement("p");
        bookCardPublishYear.setAttribute("class", "book__publish-year")
        bookCardPublishYear.textContent = book.publishYear;

        bookCard.appendChild(bookRemoveButton);
        bookCard.appendChild(bookCardTitle);
        bookCard.appendChild(bookCardAuthor);
        bookCard.appendChild(bookCardPublishYear);

        libraryGrid.appendChild(bookCard);
    }
}

addBookToLibrary("Pride and Prejudice", "Jane Austen", "1832");
addBookToLibrary("The Count of Monte Cristo", "Alexandre Dumas", "1845");
console.log(library);
displayLibrary();