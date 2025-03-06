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
exports.AccountInteractor = void 0;
class AccountInteractor {
    constructor(storageRepository) {
        this.storageRepository = storageRepository;
    }
    create(firstName, lastName) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.storageRepository.createAccount(firstName, lastName);
            if (account == null) {
                throw new Error("Account == null, Account konnte nicht erstellt werden");
            }
            return account;
        });
    }
    get(accountNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.storageRepository.getAccount(accountNumber);
            if (account == null) {
                throw new Error(`Account == null, Account mit Nummer ${accountNumber} konnte nicht gefunden werden`);
            }
            return account;
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            const accounts = yield this.storageRepository.getAllAccounts();
            if (accounts == null) {
                throw new Error("Account == null, Es existieren keine Accounts.");
            }
            return accounts;
        });
    }
}
exports.AccountInteractor = AccountInteractor;
