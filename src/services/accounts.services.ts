import { AccountsInterface, CreateAccountsInterface, EditAccountInterface } from "../interfaces/accounts.interface";
import { prisma } from "../lib/prisma";
import moment from "moment";

class AccountsServices {
  constructor() {}

  async get() {
    const accounts = await prisma.accounts.findMany({
      select: {
        accountId: true,
        totalValue: true,
        client: {
          select: {
            name: true,
            email: true,
          }
        },
        bankName: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        status: true,
      },
      take: 100,
      orderBy: {
        client: {
          email: 'asc',
        }
      },
    });

    return accounts.map(acc => ({
      ...acc,
      createdAt: moment(acc.createdAt).format("YYYY-MM-DD"),
      updatedAt: moment(acc.updatedAt).format("YYYY-MM-DD"),
    }));
  }

  async getFirst(accountId: number) {
    const account = await prisma.accounts.findFirst({
      select: {
        accountId: true,
        totalValue: true,
        client: {
          select: {
            name: true,
            email: true,
          }
        },
        bankName: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        status: true,
        accountId: accountId,
      },
    });

    return {
      ...account,
      createdAt: moment(account?.createdAt).format("YYYY-MM-DD"),
      updatedAt: moment(account?.updatedAt).format("YYYY-MM-DD"),
    };
  }

  async store(body: CreateAccountsInterface) {
    const { bankName, clientEmail, totalValue } = body;

    const client = await prisma.clients.findFirst({
      where: {
        email: clientEmail,
      },
    });

    if (!client) {
      throw new Error("Client doesn't exists");
    }

    let uniqueAccountNumber = Math.floor(Math.random() * 100000000);

    while (true) {
      const checkIfAccountNumberExists = await prisma.accounts.findFirst({
        where: {
          accountId: uniqueAccountNumber,
        },
      });

      if (!checkIfAccountNumberExists) break;
    }

    const result = await prisma.accounts.create({
      data: {
        accountId: uniqueAccountNumber,
        bankName: bankName,
        totalValue: totalValue,
        client: {
          connect: {
            id: client.id,
          },
        },
      },
      select: {
        accountId: true,
        bankName: true,
        totalValue: true,
        client: {
          select: {
            name: true,
            email: true,
          }
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    return result;
  }

  async edit(accountId: number, body: EditAccountInterface): Promise<AccountsInterface> {
    const { totalValue, bankName, clientEmail } = body;
    const account = await prisma.accounts.update({
      data: {
        totalValue: totalValue,
        bankName: bankName,
        client: {
          connect: {
            email: clientEmail,
          }
        }
      },
      where: {
        accountId: accountId,
      },
      select: {
        accountId: true,
        client: {
          select: {
            name: true,
            email: true,
          }
        },
        bankName: true,
        totalValue: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return account as AccountsInterface;
  }

  async remove(accountId: number) {
    const result = await prisma.accounts.update({
      data: {
        status: false,
      },
      where: {
        accountId: accountId
      },
      select: {
        id: true, 
      }
    });

    return result;
  }
}

export default AccountsServices;
