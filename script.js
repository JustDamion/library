const libraryGrid = document.getElementById("library");
const addBookButton = document.getElementById("add-book");
const addBookModal = document.getElementById("book-modal");
const addBookForm = document.getElementById("book-form");
const closeBookModal = document.getElementById("book-modal-close-btn");

addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(addBookForm);
    addBookToLibrary(
        formData.get("bookTitle"),
        formData.get("bookAuthor"),
        formData.get("bookPages"),
        formData.get("bookGenre"),
        formData.get("bookRating"),
        formData.get("bookDateFinished"),
        formData.get("bookStage"));
    displayLibrary();

    addBookModal.close();
})

addBookButton.addEventListener("click", () => {
    addBookModal.showModal();
})

closeBookModal.addEventListener("click", () => {
    addBookModal.close();
})

const library = [];

function Book(title, pages, author, genre, rating, finishDate, status) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.pages = pages;
    this.author = author;
    this.genre = genre;
    this.rating = rating;
    this.finishDate = finishDate;
    this.status = status;
}

function addBookToLibrary(title, pages, author, genre, rating, finishDate, status) {
    const book = new Book(title, pages, author, genre, rating, finishDate, status);
    library.push(book);
}

function removeBookFromLibrary(bookId) {
    const bookIndex = library.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        library.splice(bookIndex, 1);
    }
}

function updateStats() {
    const booksFinished = document.getElementById("stats-finished");
    const booksUnfinished = document.getElementById("stats-unfinished");
    const totalBooks = document.getElementById("stats-total");

    let finishedCounter = 0;
    let unfinishedCounter = 0;

    for (let i = 0; i < library.length; i++) {
        console.log(library[i]);
        if (library[i].status === "finished") {
            finishedCounter++;
        } else {
            unfinishedCounter++;
        }
    }

    booksFinished.textContent = finishedCounter;
    booksUnfinished.textContent = unfinishedCounter;
    totalBooks.textContent = library.length;
}

function createBookCard(book) {
    let status = "Unknown"
    switch (book.status) {
        case "dnf":
            status = "Did not finish"
            break;
        case "tbr":
            status = "To be read"
            break;
        case "inProgress":
            status = "Reading"
            break;
        case "finished":
            status = "Finished"
            break;
        default:
            status = "Finished"
    }

    const bookCard = document.createElement("div");
    bookCard.setAttribute("class", "book card");
    bookCard.setAttribute("data-id", book.id);

    const bookCardTopLine = document.createElement("div");
    bookCardTopLine.setAttribute("class", "book__top-line");

    const bookCardTitle = document.createElement("h2");
    bookCardTitle.setAttribute("class", "book__title")
    bookCardTitle.textContent = book.title;
    bookCardTopLine.appendChild(bookCardTitle);

    const bookCardPages = document.createElement("p");
    bookCardPages.setAttribute("class", "book__pages");
    bookCardPages.textContent = `Pages: ${book.pages}`;
    bookCardTopLine.appendChild(bookCardPages);

    bookCard.appendChild(bookCardTopLine);

    const bookCardAuthor = document.createElement("p");
    bookCardAuthor.setAttribute("class", "book__author")
    bookCardAuthor.textContent = `By: ${book.author}`;
    bookCard.appendChild(bookCardAuthor);

    const bookCardGenre = document.createElement("p");
    bookCardGenre.setAttribute("class", "book__genre");
    bookCardGenre.textContent = `Genre: ${book.genre}`;
    bookCard.appendChild(bookCardGenre);

    const bookCardRating = document.createElement("p");
    bookCardRating.setAttribute("class", "book__rating");
    bookCardRating.textContent = `Rating: ${book.rating ? book.rating : "-"} / 10`;
    bookCard.appendChild(bookCardRating);

    const bookCardFinishDate = document.createElement("p");
    bookCardFinishDate.setAttribute("class", "book__finish-date");
    bookCardFinishDate.textContent = `Finish Date: ${book.finishDate ? book.finishDate : "N / A"}`
    bookCard.appendChild(bookCardFinishDate);

    const bookCardStatus = document.createElement("p");
    bookCardStatus.setAttribute("class", "book__status");
    bookCardStatus.textContent = status;
    bookCard.appendChild(bookCardStatus);

    libraryGrid.appendChild(bookCard);
}

function createNewBookCard() {
    const bookCard = document.createElement("div");
    bookCard.setAttribute("class", "book card new-book__card");

    const bookCardNewButton = document.createElement("button");
    bookCardNewButton.setAttribute("class", "button new-book__action");
    bookCardNewButton.setAttribute("id", "add-book");
    bookCardNewButton.textContent = "New Book +";
    bookCard.appendChild(bookCardNewButton);

    libraryGrid.appendChild(bookCard);
}

function displayLibrary() {
    libraryGrid.replaceChildren(libraryGrid.firstElementChild)
    updateStats();
    for (const book of library) {
        createBookCard(book);
    }
}

addBookToLibrary("Mad Honey", "464", "Jodi Picoult & Jennifer Finney Bolan", "Mystery", null, null, "inProgress");
addBookToLibrary("Atomic Habits", "320", "James Clear", "Self Help", "7", "4/12/26", "finished");
displayLibrary();