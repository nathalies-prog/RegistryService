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
const BookSource_1 = require("../datasources/BookSource");
const Book_Interactor_1 = require("../interactors/Book-Interactor");
const node_server_1 = require("@hono/node-server");
const bookAdapter = new hono_1.Hono();
const storageRepository = new BookSource_1.BookSource();
const bookInteractor = new Book_Interactor_1.BookInteractor(storageRepository);
const PORT = 3001;
bookAdapter.get("/book/:isbn", (c) => __awaiter(void 0, void 0, void 0, function* () {
    const { isbn } = c.req.param();
    const account = yield bookInteractor.get(isbn);
    return c.json({ data: account }, 200);
}));
bookAdapter.get("/books", (c) => __awaiter(void 0, void 0, void 0, function* () {
    const accounts = yield bookInteractor.all();
    return c.json({ data: accounts }, 200);
}));
(0, node_server_1.serve)({ fetch: bookAdapter.fetch, port: 3001 }, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
