export class Book {
  isbn: string;
  genre: string;
  title: string;
  author: string;

  constructor(isbn: string, genre: string, title: string, author: string) {
    this.isbn = isbn;
    this.genre = genre;
    this.title = title;
    this.author = author;
  }
}
