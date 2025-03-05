import { getPool } from "../db/Db";
import { Book } from "../entities/Book";
import { BookStorageRepository } from "../repositories/BookStorage-Repository";

export class BookSource implements BookStorageRepository {
  async getBook(isbn: string): Promise<Book | null> {
    try {
      const res = await getPool().query(`SELECT * FROM book WHERE isbn=$1`, [
        isbn,
      ]);
      return res.rows[0];
    } catch (error) {
      console.error(
        `Fehler beim Abrufen vom Book mit der ISBN: ${isbn} `,
        error
      );
      return null;
    }
  }
  async getAllBooks(): Promise<Book[] | null> {
    try {
      const res = await getPool().query(`SELECT * FROM book`);
      return res.rows;
    } catch (error) {
      console.error("Fehler beim Abrufen aller Buecher", error);
      return null;
    }
  }
}
