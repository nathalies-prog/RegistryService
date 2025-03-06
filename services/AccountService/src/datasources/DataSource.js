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
exports.DataSource = void 0;
const Db_1 = require("../db/Db");
class DataSource {
    getAllAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield (0, Db_1.getPool)().query(`SELECT * FROM account`);
                return res.rows;
            }
            catch (error) {
                console.error("Fehler beim Abrufen aller Accounts", error);
                return null;
            }
        });
    }
    getAccount(accountNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield (0, Db_1.getPool)().query(`SELECT * FROM account WHERE "accountNumber"=$1`, [accountNumber]);
                return res.rows[0];
            }
            catch (error) {
                console.error(`Fehler beim Abrufen des abgefragten ${accountNumber} Accounts`, error);
                return null;
            }
        });
    }
    createAccount(firstName, lastName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield (0, Db_1.getPool)().query(`INSERT into account ("firstName","lastName") VALUES($1,$2) RETURNING * `, [firstName, lastName]);
                return res.rows[0];
            }
            catch (error) {
                console.error("Es konnt kein Account erstellt werden..", error);
                return null;
            }
        });
    }
}
exports.DataSource = DataSource;
