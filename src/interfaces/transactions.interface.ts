import { AccountsInterface } from "./accounts.interface";
import { ClientsInterface } from "./clients.interface";

export interface TransactionsInterface {
  id: number;
  uniqueId: string;
  amount: number;
  clientReceiver: ClientsInterface;
  account: AccountsInterface;
  createdAt: Date;
  updatedAt: Date;
}