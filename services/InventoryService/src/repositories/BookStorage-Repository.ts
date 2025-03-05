import { Book } from "../entities/Book";

export interface BookStorageRepository {
  getAllBooks(): Promise<Book[] | null>;
  getBook(isbn : string): Promise<Book | null>;
}
