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
exports.BookInteractor = void 0;
class BookInteractor {
    constructor(storageRepository) {
        this.storageRepository = storageRepository;
    }
    get(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield this.storageRepository.getBook(isbn);
            if (book == null) {
                throw new Error(`Book == null, Book mit ISBN: ${isbn} konnte nicht gefunden werden`);
            }
            return book;
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield this.storageRepository.getAllBooks();
            if (books == null) {
                throw new Error("Books == null, Es existieren keine Buecher.");
            }
            return books;
        });
    }
}
exports.BookInteractor = BookInteractor;
