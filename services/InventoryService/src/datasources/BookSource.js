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
exports.BookSource = void 0;
const Db_1 = require("../db/Db");
class BookSource {
    getBook(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield (0, Db_1.getPool)().query(`SELECT * FROM book WHERE isbn=$1`, [
                    isbn,
                ]);
                return res.rows[0];
            }
            catch (error) {
                console.error(`Fehler beim Abrufen vom Book mit der ISBN: ${isbn} `, error);
                return null;
            }
        });
    }
    getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield (0, Db_1.getPool)().query(`SELECT * FROM book`);
                return res.rows;
            }
            catch (error) {
                console.error("Fehler beim Abrufen aller Buecher", error);
                return null;
            }
        });
    }
}
exports.BookSource = BookSource;
