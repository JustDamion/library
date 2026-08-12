const libraryGrid = document.getElementById("library");

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

function displayLibrary() {
    for (const book of library) {
        const bookCard = document.createElement("div");
        bookCard.setAttribute("class", "book card");

        const bookCardTitle = document.createElement("h2");
        bookCardTitle.setAttribute("class", "book__title")
        bookCardTitle.textContent = book.title;

        const bookCardAuthor = document.createElement("p");
        bookCardAuthor.setAttribute("class", "book__author")
        bookCardAuthor.textContent = book.author;

        const bookCardPublishYear = document.createElement("p");
        bookCardPublishYear.setAttribute("class", "book__publish-year")
        bookCardPublishYear.textContent = book.publishYear;

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