import { faker, fakerDE } from "@faker-js/faker";
import { Book } from "../src/entities/Book";
import { getClient } from "../src/db/Db";
import { Client, QueryConfig } from "pg";

const NUMBER_OF_BOOKS = 50;

async function generateBooks(db: Client) {
  let books: Book[] = [];
  for (let i = 0; i < NUMBER_OF_BOOKS; i++) {
    const isbn = fakerDE.commerce.isbn();
    const genre = fakerDE.book.genre();
    const title = fakerDE.book.title();
    const author = fakerDE.book.author();
    books.push({
      isbn: isbn,
      genre: genre,
      title: title,
      author: author,
    });
  }
  const bookValues = books.flatMap((b) => [b.isbn, b.genre, b.title, b.author]);
  const bookPlaceholders = books
    .map(
      (_, i) => `($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})`
    )
    .join(",");
  const bookQuery: QueryConfig = {
    text: `INSERT INTO book (isbn,genre,title,author) VALUES ${bookPlaceholders}`,
    values: bookValues,
  };
  await db.query(bookQuery);
  console.info("📚 Book data seeded!");
}

async function seed() {
  try {
    const db = getClient();
    await db.connect();
    console.info("🔌 Connected to the Database.");
    const books = await generateBooks(db);
    console.info("✅ Seeding successful!");
  } catch (error) {
    console.error("🚨 Seeding failed. error:", error);
  }
}

seed();
