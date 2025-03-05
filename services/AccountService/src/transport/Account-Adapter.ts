import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { StorageRepository } from "../repositories/Storage-Repository";
import { DataSource } from "../datasources/DataSource";
import { AccountInteractor } from "../interactors/Account-Interactor";
import { registerService } from "../../../../etcd/etcd-helper";
const accountAdapter = new Hono();
const storageRepository: StorageRepository = new DataSource();
const accountInteractor = new AccountInteractor(storageRepository);
const PORT = 3000;
// REGISTRIEREN
registerService("AccountService", `http://localhost:${PORT}`);

accountAdapter.post("/create", async (c) => {
  const { firstName, lastName } = await c.req.json();
  const newAccount = await accountInteractor.create(firstName, lastName);
  return c.json({ data: newAccount }, 201);
});

accountAdapter.get("/account/:accountNumber", async (c) => {
  const { accountNumber } = c.req.param();
  const account = await accountInteractor.get(parseInt(accountNumber, 10));
  return c.json({ data: account }, 200);
});

accountAdapter.get("/accounts", async (c) => {
  const accounts = await accountInteractor.all();
  return c.json({ data: accounts }, 200);
});

serve({ fetch: accountAdapter.fetch, port: PORT }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
