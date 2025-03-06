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
exports.LendingInteractor = void 0;
class LendingInteractor {
    constructor(lendingRepository) {
        this.lendingRepository = lendingRepository;
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            const lending = yield this.lendingRepository.getAllLendings();
            if (lending == null)
                throw new Error("Lending = null, Nix geliehen da?");
            return lending;
        });
    }
    delete(book_isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            const lendingDeleted = yield this.lendingRepository.deleteLending(book_isbn);
            if (!lendingDeleted)
                throw new Error("Not deleted weil Computer sagt nein!");
            return lendingDeleted;
        });
    }
    lend(lending) {
        return __awaiter(this, void 0, void 0, function* () {
            const lended = yield this.lendingRepository.lendingBook(lending);
            if (!lended)
                throw new Error("Lenden war nicht erfolgreich.");
            return lended;
        });
    }
}
exports.LendingInteractor = LendingInteractor;
