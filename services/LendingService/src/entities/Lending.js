"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lending = void 0;
class Lending {
    constructor(lend_at, return_at, book_isbn, accountnumber) {
        this.lend_at = lend_at;
        this.return_at = return_at;
        this.book_isbn = book_isbn;
        this.accountnumber = accountnumber;
    }
}
exports.Lending = Lending;
