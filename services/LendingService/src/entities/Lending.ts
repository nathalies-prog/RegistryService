export class Lending {
  lend_at: string;
  return_at: string;
  book_isbn: string;
  accountnumber: number;

  constructor(lend_at: string, return_at: string, book_isbn: string, accountnumber: number) {
    this.lend_at = lend_at;
    this.return_at = return_at;
    this.book_isbn = book_isbn;
    this.accountnumber = accountnumber;
  }
}
