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
const hono_1 = require("hono");
const LendingSource_1 = require("../datasources/LendingSource");
const Lending_Interactor_1 = require("../interactors/Lending-Interactor");
const node_server_1 = require("@hono/node-server");
const lendingAdapter = new hono_1.Hono();
const storageRepository = new LendingSource_1.LendingSource();
const lendingInteractor = new Lending_Interactor_1.LendingInteractor(storageRepository);
lendingAdapter.post("/lend", (c) => __awaiter(void 0, void 0, void 0, function* () {
    const { lend_at, return_at, book_isbn, accountnumber } = yield c.req.json();
    const lending = {
        lend_at: lend_at,
        return_at: return_at,
        book_isbn: book_isbn,
        accountnumber: accountnumber,
    };
    const lend = yield lendingInteractor.lend(lending);
    return c.json({ data: lend });
}));
lendingAdapter.get("/lendings", (c) => __awaiter(void 0, void 0, void 0, function* () {
    const lendings = yield lendingInteractor.all();
    return c.json({ data: lendings }, 200);
}));
lendingAdapter.delete("/delete/:book_isbn", (c) => __awaiter(void 0, void 0, void 0, function* () {
    const { book_isbn } = c.req.param();
    const deleted = yield lendingInteractor.delete(book_isbn);
    return c.json({ data: deleted });
}));
(0, node_server_1.serve)({ fetch: lendingAdapter.fetch, port: 3002 }, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
