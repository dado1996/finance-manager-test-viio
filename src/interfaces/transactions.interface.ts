import { AccountsInterface } from "./accounts.interface";
import { ClientsInterface } from "./clients.interface";

export interface TransactionsInterface {
  id: number;
  uniqueId: string;
  amount: number;
  accountSender: AccountsInterface;
  accountReceiver: AccountsInterface;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTransactionsInterface extends Omit<TransactionsInterface, "id" | "uniqueId" | "accountSender" | "accountReceiver" | "createdAt" | "updatedAt"> {
  accountSenderId: number;
  accountReceiverId: number;
}

export interface EditTransactionsInterface extends Omit<TransactionsInterface, "id" | "uniqueId" | "accountSender" | "accountReceiver" | "createdAt" | "updatedAt"> {
  accountSenderId: number;
  accountReceiverId: number;
}