class Book {
    id = crypto.randomUUID();
    favorite = false;

    constructor(title, pages, author, genre, rating, finishDate, status) {
        this.title = title;
        this.pages = pages;
        this.author = author;
        this.genre = genre;
        this.rating = rating;
        this.finishDate = finishDate;
        this.status = status;
    }

    updateFavorite() {
        this.favorite = this.favorite ? false : true;
    }
};

const Library = class {
    static books = [];

    static addBook(title, pages, author, genre, rating, finishDate, status) {
        const book = new Book(title, pages, author, genre, rating, finishDate, status);
        this.books.push(book);
    }

    static removeBook(bookId) {
        const bookIndex = books.findIndex(book => book.id === bookId);
        if (bookIndex !== -1) {
            this.books.splice(bookIndex, 1);
        }
    }

    static findBook(bookId) {
        const bookIndex = this.books.findIndex(book => book.id === bookId);
        if (bookIndex !== -1) {
            return this.books[bookIndex];
        }

        return { value: "No book found", inputId: bookId }
    }
};

const ScreenController = (() => {
    const libraryGrid = document.getElementById("library");
    const addBookButton = document.getElementById("add-book");
    const addBookModal = document.getElementById("book-modal");
    const addBookForm = document.getElementById("book-form");
    const closeBookModal = document.getElementById("book-modal-close-btn");

    function updateStats() {
        const booksFinished = document.getElementById("stats-finished");
        const booksUnfinished = document.getElementById("stats-unfinished");
        const totalBooks = document.getElementById("stats-total");

        let finishedCounter = 0;
        let unfinishedCounter = 0;

        for (let i = 0; i < Library.books.length; i++) {
            if (Library.books[i].status === "finished") {
                finishedCounter++;
            } else {
                unfinishedCounter++;
            }
        }

        booksFinished.textContent = finishedCounter;
        booksUnfinished.textContent = unfinishedCounter;
        totalBooks.textContent = Library.books.length;
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

        const bookCardPages = document.createElement("p");
        bookCardPages.setAttribute("class", "book__pages");
        bookCardPages.textContent = `Pages: ${book.pages}`;

        const bookCardAuthor = document.createElement("p");
        bookCardAuthor.setAttribute("class", "book__author")
        bookCardAuthor.textContent = `By: ${book.author}`;

        const bookCardGenre = document.createElement("p");
        bookCardGenre.setAttribute("class", "book__genre");
        bookCardGenre.textContent = `Genre: ${book.genre}`;

        const bookCardRating = document.createElement("p");
        bookCardRating.setAttribute("class", "book__rating");
        bookCardRating.textContent = `Rating: ${book.rating ? book.rating : "-"} / 10`;

        const bookCardFinishDate = document.createElement("p");
        bookCardFinishDate.setAttribute("class", "book__finish-date");
        bookCardFinishDate.textContent = `Finish Date: ${book.finishDate ? book.finishDate : "N / A"}`

        const bookCardBottomLine = document.createElement("div");
        bookCardBottomLine.setAttribute("class", "book__bottom-line");

        const bookCardStatus = document.createElement("p");
        bookCardStatus.setAttribute("class", "book__status");
        bookCardStatus.textContent = status;

        const bookCardFavoriteButton = document.createElement("button");
        bookCardFavoriteButton.setAttribute("class", "book__favorite-button");

        const bookCardFavorite = document.createElement("img");
        bookCardFavorite.setAttribute("class", "book__favorite");
        bookCardFavorite.setAttribute("src", book.favorite ? "images/favorite-fill.svg" : "images/favorite-outline.svg");
        bookCardFavorite.setAttribute("alt", "Favorite this book");

        bookCardTopLine.appendChild(bookCardTitle);
        bookCardTopLine.appendChild(bookCardPages);
        bookCard.appendChild(bookCardTopLine);

        bookCard.appendChild(bookCardGenre);
        bookCard.appendChild(bookCardAuthor);
        bookCard.appendChild(bookCardRating);
        bookCard.appendChild(bookCardFinishDate);

        bookCardBottomLine.appendChild(bookCardStatus);
        bookCardFavoriteButton.appendChild(bookCardFavorite);
        bookCardBottomLine.append(bookCardFavoriteButton);
        bookCard.appendChild(bookCardBottomLine);

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
        for (const book of Library.books) {
            createBookCard(book);
        }
    }

    libraryGrid.addEventListener("click", (event) => {
        const favoriteButtonEl = event.target.parentNode;
        const bottomLineEl = favoriteButtonEl.parentNode;
        const bookCardEl = bottomLineEl.parentNode;

        if (favoriteButtonEl.className.includes("book__favorite-button")) {
            const targetBook = Library.findBook(bookCardEl.dataset.id);
            targetBook.updateFavorite();
            displayLibrary();
        }
    })

    addBookForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(addBookForm);
        Library.addBook(
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

    Library.addBook("Mad Honey", "464", "Jodi Picoult & Jennifer Finney Bolan", "Mystery", null, null, "inProgress");
    Library.addBook("Atomic Habits", "320", "James Clear", "Self Help", "7", "4/12/26", "finished", true);

    displayLibrary();
})()
