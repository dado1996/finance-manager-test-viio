import { prisma } from "../lib/prisma";
import moment from "moment";
import { v4 as uuid } from "uuid";
import {
  CreateTransactionsInterface,
  EditTransactionsInterface,
} from "../interfaces/transactions.interface";
import ClientsServices from "./clients.services";
import AccountsServices from "./accounts.services";

class TransactionsServices {
  constructor() {}

  async get() {
    const transactions = await prisma.transactions.findMany({
      select: {
        id: true,
        uniqueId: true,
        accountSender: {
          select: {
            accountId: true,
            bankName: true,
          },
        },
        accountReceiver: {
          select: {
            accountId: true,
            bankName: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      where: {
        status: {
          not: "CANCELED",
        },
      },
      take: 1000,
      orderBy: {
        uniqueId: 'asc'
      },
    });

    return transactions.map((transact) => ({
      ...transact,
      createdAt: moment(transact.createdAt).format("YYYY-MM-DD"),
      updatedAt: moment(transact.updatedAt).format("YYYY-MM-DD"),
    }));
  }

  async getFirst(id: string) {
    const transaction = await prisma.transactions.findFirst({
      select: {
        id: true,
        uniqueId: true,
        accountSender: {
          select: {
            accountId: true,
            bankName: true,
          },
        },
        accountReceiver: {
          select: {
            accountId: true,
            bankName: true,
          }
        },
        createdAt: true,
        updatedAt: true,
      },
      where: { uniqueId: id },
    });

    return transaction
      ? {
          ...transaction,
          createdAt: moment(transaction?.createdAt).format("YYYY-MM-DD"),
          updatedAt: moment(transaction?.updatedAt).format("YYYY-MM-DD"),
        }
      : null;
  }

  async store(body: CreateTransactionsInterface) {
    const { amount, accountSenderId, accountReceiverId } = body;

    const checkIfAccountSenderExists = await new AccountsServices().getFirst(
      accountSenderId
    );
    if (!checkIfAccountSenderExists) throw new Error("The account sender doesn't exists");

    const checkIfAccountReceiverExists = await new AccountsServices().getFirst(
      accountReceiverId
    );
    console.log({ accountReceiverId, checkIfAccountReceiverExists });
    if (!checkIfAccountReceiverExists) throw new Error("The account receiver doesn't exists");

    if (checkIfAccountSenderExists.totalValue < amount)
      throw new Error("Insuficient funds");

    const sustractFromSender = await prisma.accounts.update({
      data: {
        totalValue: checkIfAccountSenderExists.totalValue - amount,
      },
      where: {
        accountId: accountSenderId,
      }
    });

    const addToReceiver = await prisma.accounts.update({
      data: {
        totalValue: checkIfAccountReceiverExists.totalValue + amount,
      },
      where: {
        accountId: accountReceiverId,
      }
    });

    const result = await prisma.transactions.create({
      data: {
        uniqueId: uuid(),
        amount: amount,
        accountSender: {
          connect: {
            accountId: accountSenderId,
          },
        },
        accountReceiver: {
          connect: {
            accountId: accountReceiverId,
          }
        },
        status: "PENDING",
      },
      select: {
        uniqueId: true,
        amount: true,
        accountSender: {
          select: {
            accountId: true,
            bankName: true,
          },
        },
        accountReceiver: {
          select: {
            accountId: true,
            bankName: true,
          }
        },
        status: true,
      },
    });

    return result;
  }

  async edit(id: string, body: EditTransactionsInterface) {
    const { amount, accountSenderId, accountReceiverId, } = body;

    const checkIfAccountSenderExists = await new AccountsServices().getFirst(
      accountSenderId
    );
    if (!checkIfAccountSenderExists) throw new Error("The account sender doesn't exists");

    const checkIfAccountReceiverExists = await new AccountsServices().getFirst(
      accountReceiverId
    );
    if (!checkIfAccountReceiverExists) throw new Error("The account receiver doesn't exists");

    if (checkIfAccountSenderExists.totalValue < amount)
      throw new Error("Insuficient funds");

    const result = await prisma.transactions.update({
      data: {
        uniqueId: uuid(),
        amount: amount,
        accountSender: {
          connect: {
            accountId: accountSenderId,
          },
        },
        accountReceiver: {
          connect: {
            accountId: accountReceiverId,
          }
        },
        status: "ONHOLD",
      },
      where: {
        uniqueId: id,
      },
      select: {
        uniqueId: true,
        amount: true,
        accountSender: {
          select: {
            accountId: true,
            bankName: true,
          },
        },
        accountReceiver: {
          select: {
            accountId: true,
            bankName: true,
          },
        },
        status: true,
      },
    });

    return result;
  }

  async remove(id: string) {
    const result = await prisma.transactions.update({
      data: {
        status: "CANCELED",
      },
      where: {
        uniqueId: id,
      },
      select: {
        id: true,
        uniqueId: true,
      },
    });

    return result;
  }
}

export default TransactionsServices;
