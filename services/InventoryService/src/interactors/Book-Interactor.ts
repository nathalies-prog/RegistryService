import { Book } from "../entities/Book";
import { BookStorageRepository } from "../repositories/BookStorage-Repository";
export class BookInteractor {
  storageRepository: BookStorageRepository;
  constructor(storageRepository: BookStorageRepository) {
    this.storageRepository = storageRepository;
  }
  async get(isbn: string): Promise<Book> {
    const book: Book | null = await this.storageRepository.getBook(isbn);
    if (book == null) {
      throw new Error(
        `Book == null, Book mit ISBN: ${isbn} konnte nicht gefunden werden`
      );
    }
    return book;
  }
  async all(): Promise<Book[]> {
    const books: Book[] | null = await this.storageRepository.getAllBooks();
    if (books == null) {
      throw new Error("Books == null, Es existieren keine Buecher.");
    }
    return books;
  }
}
