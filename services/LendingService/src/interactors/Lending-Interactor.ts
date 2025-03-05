import { Lending } from "../entities/Lending";
import { LendingRepository } from "../repositories/Lending-Repository";

export class LendingInteractor {
  lendingRepository: LendingRepository;
  constructor(lendingRepository: LendingRepository) {
    this.lendingRepository = lendingRepository;
  }

  async all(): Promise<Lending[]> {
    const lending: Lending[] | null = await this.lendingRepository.getAllLendings();
    if (lending == null) throw new Error("Lending = null, Nix geliehen da?");

    return lending;
  }

  async delete(book_isbn: string): Promise<boolean> {
    const lendingDeleted: boolean = await this.lendingRepository.deleteLending(book_isbn);
    if (!lendingDeleted) throw new Error("Not deleted weil Computer sagt nein!");

    return lendingDeleted;
  }

  async lend(lending: Lending): Promise<boolean> {
    const lended: boolean = await this.lendingRepository.lendingBook(lending);
    if (!lended) throw new Error("Lenden war nicht erfolgreich.");

    return lended;
  }
}
