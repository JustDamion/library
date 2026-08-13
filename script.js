const libraryGrid = document.getElementById("library");
const bookModal = document.getElementById("book-modal");
const bookForm = document.getElementById("book-form");

libraryGrid.addEventListener("click", (event) => {
    if (event.target.className.includes("book__remove")) {
        removeBookFromLibrary(event.target.parentNode.dataset.id);
        displayLibrary();
    }

    if (event.target.className.includes("book__update-read")) {
        updateRead(event.target.parentNode.dataset.id);
        displayLibrary();
    }
})

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(bookForm);
    addBookToLibrary(formData.get("bookTitle"), formData.get("bookAuthor"), formData.get("bookPublishYear"), formData.get("bookPages"), formData.get("bookRead"));
    displayLibrary();

    bookModal.close();
})

const library = [];

function Book(title, author, publishYear, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.publishYear = publishYear;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, publishYear, pages, read) {
    const book = new Book(title, author, publishYear, pages, read);
    library.push(book);
}

function removeBookFromLibrary(bookId) {
    const bookIndex = library.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        library.splice(bookIndex, 1);
    }
}

function updateRead(bookId) {
    const bookIndex = library.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        library[bookIndex].read = library[bookIndex].read ? false : true;
    }
}

function buildBookCard(book) {
    const bookCard = document.createElement("div");
    bookCard.setAttribute("class", "book card");
    bookCard.setAttribute("data-id", book.id);

    const bookRemoveButton = document.createElement("button");
    bookRemoveButton.setAttribute("class", "button book__remove");
    bookRemoveButton.textContent = "X";
    bookCard.appendChild(bookRemoveButton);

    const bookCardTitle = document.createElement("h2");
    bookCardTitle.setAttribute("class", "book__title")
    bookCardTitle.textContent = book.title;
    bookCard.appendChild(bookCardTitle);

    const bookCardAuthor = document.createElement("p");
    bookCardAuthor.setAttribute("class", "book__author")
    bookCardAuthor.textContent = `Author: ${book.author}`;
    bookCard.appendChild(bookCardAuthor);

    const bookCardPublishYear = document.createElement("p");
    bookCardPublishYear.setAttribute("class", "book__publish-year")
    bookCardPublishYear.textContent = `Published: ${book.publishYear}`;
    bookCard.appendChild(bookCardPublishYear);

    const bookCardPages = document.createElement("p");
    bookCardPages.setAttribute("class", "book__pages");
    bookCardPages.textContent = `Pages: ${book.pages}`;
    bookCard.appendChild(bookCardPages);

    const bookCardReadContainer = document.createElement("div");
    const bookCardRead = document.createElement("p");
    bookCardRead.textContent = "Read:";
    bookCardRead.setAttribute("class", "book__read");
    bookCardReadContainer.appendChild(bookCardRead);

    const bookCardReadCheckbox = document.createElement("input");
    bookCardReadCheckbox.setAttribute("type", "checkbox");
    bookCardReadCheckbox.setAttribute("class", "book__read-checkbox");
    bookCardReadCheckbox.setAttribute("disabled", true);
    bookCardReadCheckbox.checked = book.read;
    bookCardReadContainer.appendChild(bookCardReadCheckbox);

    bookCard.appendChild(bookCardReadContainer);

    const updateReadButton = document.createElement("button");
    updateReadButton.setAttribute("class", "button book__update-read");
    updateReadButton.textContent = "Update Read Status";
    bookCard.appendChild(updateReadButton);

    libraryGrid.appendChild(bookCard);
}

function displayLibrary() {
    libraryGrid.textContent = "";
    for (const book of library) {
        buildBookCard(book);
    }
}

addBookToLibrary("Pride and Prejudice", "Jane Austen", "1832", "123", true);
addBookToLibrary("The Count of Monte Cristo", "Alexandre Dumas", "1845", "596", false);
displayLibrary();