import { Hono } from "hono";
import { BookStorageRepository } from "../repositories/BookStorage-Repository";
import { BookSource } from "../datasources/BookSource";
import { BookInteractor } from "../interactors/Book-Interactor";
import { serve } from "@hono/node-server";

const bookAdapter = new Hono();
const storageRepository: BookStorageRepository = new BookSource();
const bookInteractor = new BookInteractor(storageRepository);

bookAdapter.get("/book/:isbn", async (c) => {
  const { isbn } = c.req.param();
  const account = await bookInteractor.get(isbn);
  return c.json({ data: account }, 200);
});

bookAdapter.get("/books", async (c) => {
  const accounts = await bookInteractor.all();
  return c.json({ data: accounts }, 200);
});

serve({ fetch: bookAdapter.fetch, port: 3001 }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
