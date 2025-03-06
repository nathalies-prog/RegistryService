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
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const DataSource_1 = require("../datasources/DataSource");
const Account_Interactor_1 = require("../interactors/Account-Interactor");
const accountAdapter = new hono_1.Hono();
const storageRepository = new DataSource_1.DataSource();
const accountInteractor = new Account_Interactor_1.AccountInteractor(storageRepository);
const PORT = 3000;
// REGISTRIEREN
accountAdapter.post("/create", (c) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName } = yield c.req.json();
    const newAccount = yield accountInteractor.create(firstName, lastName);
    return c.json({ data: newAccount }, 201);
}));
accountAdapter.get("/account/:accountNumber", (c) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountNumber } = c.req.param();
    const account = yield accountInteractor.get(parseInt(accountNumber, 10));
    return c.json({ data: account }, 200);
}));
accountAdapter.get("/accounts", (c) => __awaiter(void 0, void 0, void 0, function* () {
    const accounts = yield accountInteractor.all();
    return c.json({ data: accounts }, 200);
}));
(0, node_server_1.serve)({ fetch: accountAdapter.fetch, port: PORT }, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
