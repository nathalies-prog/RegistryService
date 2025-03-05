export class Account {
  accountNumber: number;
  firstName: string;
  lastName: string;

  constructor(accountNumber: number, firstName: string, lastName: string) {
    this.accountNumber = accountNumber;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
