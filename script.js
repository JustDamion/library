const library = [];

function Book(title, author, yearPublished, genre) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.yearPublished = yearPublished;
    this.genre = genre;
}

function addBookToLibrary(title, author, yearPublished, genre) {
    const book = new Book(title, author, yearPublished, genre);
    library.push(book);
}