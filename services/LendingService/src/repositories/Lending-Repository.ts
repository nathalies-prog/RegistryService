import { Lending } from "../entities/Lending";

export interface LendingRepository {
  lendingBook(lending: Lending): Promise<boolean>;
  getAllLendings(): Promise<Lending[] | null>;
  deleteLending(book_isbn: string): Promise<boolean>;
}
