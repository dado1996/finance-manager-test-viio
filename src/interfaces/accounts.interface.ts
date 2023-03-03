import { ClientsInterface } from "./clients.interface";
import { TransactionsInterface } from "./transactions.interface";

export interface AccountsInterface {
  accountId: number;
  client: Omit<ClientsInterface, "id" | "createdAt" | "updatedAt" | "password">;
  transactions?: TransactionsInterface[];
  totalValue: number;
  bankName: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CreateAccountsInterface
  extends Omit<
    AccountsInterface,
    "id" | "accountId" | "client" | "createdAt" | "updatedAt"
  > {
  clientEmail: string;
}

export interface EditAccountInterface
  extends Omit<
    AccountsInterface,
    "id" | "accountId" | "client" | "transactions" | "createdAt" | "updatedAt"
  > {
  clientEmail: string;
}
