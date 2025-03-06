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
const faker_1 = require("@faker-js/faker");
const Db_1 = require("../src/db/Db");
const NUMBER_OF_BOOKS = 50;
function generateBooks(db) {
    return __awaiter(this, void 0, void 0, function* () {
        let books = [];
        for (let i = 0; i < NUMBER_OF_BOOKS; i++) {
            const isbn = faker_1.fakerDE.commerce.isbn();
            const genre = faker_1.fakerDE.book.genre();
            const title = faker_1.fakerDE.book.title();
            const author = faker_1.fakerDE.book.author();
            books.push({
                isbn: isbn,
                genre: genre,
                title: title,
                author: author,
            });
        }
        const bookValues = books.flatMap((b) => [b.isbn, b.genre, b.title, b.author]);
        const bookPlaceholders = books
            .map((_, i) => `($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})`)
            .join(",");
        const bookQuery = {
            text: `INSERT INTO book (isbn,genre,title,author) VALUES ${bookPlaceholders}`,
            values: bookValues,
        };
        yield db.query(bookQuery);
        console.info("📚 Book data seeded!");
    });
}
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = (0, Db_1.getClient)();
            yield db.connect();
            console.info("🔌 Connected to the Database.");
            const books = yield generateBooks(db);
            console.info("✅ Seeding successful!");
        }
        catch (error) {
            console.error("🚨 Seeding failed. error:", error);
        }
    });
}
seed();
