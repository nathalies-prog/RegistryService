import { Account } from "../entitites/Account";

export interface StorageRepository{
    createAccount(firstName : string, lastName : string) : Promise<Account | null>;
    getAllAccounts() :  Promise<Account[] | null>;
    getAccount(accountNumber : number ) : Promise<Account | null>;
}