"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LendingSource = void 0;
const Db_1 = require("../db/Db");
class LendingSource {
    lendingBook(lending) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isUserThere = yield fetch(`http://localhost:3000/account/${lending.accountnumber}`);
                if (!isUserThere)
                    return false;
                const isBookThere = yield fetch(`http://localhost:3001/book/${lending.book_isbn}`);
                if (!isBookThere)
                    return false;
                const res = yield (0, Db_1.getPool)().query(`INSERT into lending (lend_at,return_at,book_isbn,accountnumber) VALUES($1,$2,$3,$4) RETURNING *`, [lending.lend_at, lending.return_at, lending.book_isbn, lending.accountnumber]);
                return true;
            }
            catch (error) {
                console.error(`Etwas ist beim Ausleihen des Buches schiefgelaufen..`, error);
                return false;
            }
        });
    }
    getAllLendings() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield (0, Db_1.getPool)().query("SELECT * FROM lending");
                return res.rows;
            }
            catch (error) {
                console.error("Fehler beim Abrufen aller ausgeliehenen Bücher.", error);
                return null;
            }
        });
    }
    deleteLending(book_isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            // const isLendingThere = await getPool().query("SELECT * FROM lending WHERE book_isbn = $1 ", [book_isbn]);
            // if (!isLendingThere) return false;
            const deleteLending = yield (0, Db_1.getPool)().query("DELETE  FROM lending WHERE book_isbn = $1", [book_isbn]);
            if (!deleteLending)
                return false;
            return true;
        });
    }
}
exports.LendingSource = LendingSource;
