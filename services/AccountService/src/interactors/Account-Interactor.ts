import { Account } from "../entitites/Account";
import { StorageRepository } from "../repositories/Storage-Repository";

export class AccountInteractor {
  storageRepository: StorageRepository;
  constructor(storageRepository: StorageRepository) {
    this.storageRepository = storageRepository;
  }
  async create(firstName: string, lastName: string): Promise<Account> {
    const account: Account | null = await this.storageRepository.createAccount(
      firstName,
      lastName
    );
    if (account == null) {
      throw new Error("Account == null, Account konnte nicht erstellt werden");
    }
    return account;
  }
  async get(accountNumber: number): Promise<Account> {
    const account: Account | null = await this.storageRepository.getAccount(
      accountNumber
    );
    if (account == null) {
      throw new Error(
        `Account == null, Account mit Nummer ${accountNumber} konnte nicht gefunden werden`
      );
    }
    return account;
  }
  async all(): Promise<Account[]> {
    const accounts: Account[] | null =
      await this.storageRepository.getAllAccounts();
    if (accounts == null) {
      throw new Error("Account == null, Es existieren keine Accounts.");
    }
    return accounts;
  }
}
