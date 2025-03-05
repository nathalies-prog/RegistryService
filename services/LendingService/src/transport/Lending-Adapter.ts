import { Hono } from "hono";
import { LendingRepository } from "../repositories/Lending-Repository";
import { LendingSource } from "../datasources/LendingSource";
import { LendingInteractor } from "../interactors/Lending-Interactor";
import { serve } from "@hono/node-server";
import { Lending } from "../entities/Lending";

const lendingAdapter = new Hono();
const storageRepository: LendingRepository = new LendingSource();
const lendingInteractor = new LendingInteractor(storageRepository);

lendingAdapter.post("/lend", async (c) => {
  const { lend_at, return_at, book_isbn, accountnumber } = await c.req.json();
  const lending: Lending = {
    lend_at: lend_at,
    return_at: return_at,
    book_isbn: book_isbn,
    accountnumber: accountnumber,
  };
  const lend = await lendingInteractor.lend(lending);
  return c.json({ data: lend });
});

lendingAdapter.get("/lendings", async (c) => {
  const lendings = await lendingInteractor.all();
  return c.json({ data: lendings }, 200);
});

lendingAdapter.delete("/delete/:book_isbn", async (c) => {
  const { book_isbn } = c.req.param();
  const deleted = await lendingInteractor.delete(book_isbn);
  return c.json({ data: deleted });
});

serve({ fetch: lendingAdapter.fetch, port: 3002 }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
