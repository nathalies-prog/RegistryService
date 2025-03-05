import { Lending } from "../entities/Lending";
import { getPool } from "../db/Db";
import { LendingRepository } from "../repositories/Lending-Repository";

export class LendingSource implements LendingRepository {
  async lendingBook(lending: Lending): Promise<boolean> {
    try {
      const isUserThere = await fetch(`http://localhost:3000/account/${lending.accountnumber}`);
      if (!isUserThere) return false;
      const isBookThere = await fetch(`http://localhost:3001/book/${lending.book_isbn}`);
      if (!isBookThere) return false;
      const res = await getPool().query(
        `INSERT into lending (lend_at,return_at,book_isbn,accountnumber) VALUES($1,$2,$3,$4) RETURNING *`,
        [lending.lend_at, lending.return_at, lending.book_isbn, lending.accountnumber]
      );
      return true;
    } catch (error) {
      console.error(`Etwas ist beim Ausleihen des Buches schiefgelaufen..`, error);
      return false;
    }
  }

  async getAllLendings(): Promise<Lending[] | null> {
    try {
      const res = await getPool().query("SELECT * FROM lending");
      return res.rows;
    } catch (error) {
      console.error("Fehler beim Abrufen aller ausgeliehenen Bücher.", error);
      return null;
    }
  }
  async deleteLending(book_isbn: string): Promise<boolean> {
    // const isLendingThere = await getPool().query("SELECT * FROM lending WHERE book_isbn = $1 ", [book_isbn]);

    // if (!isLendingThere) return false;

    const deleteLending = await getPool().query("DELETE  FROM lending WHERE book_isbn = $1", [book_isbn]);

    if (!deleteLending) return false;

    return true;
  }
}
