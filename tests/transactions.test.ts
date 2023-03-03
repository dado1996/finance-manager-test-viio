import { describe, expect, jest, test } from "@jest/globals";
import TransactionsService from '../src/services/transactions.services';
import { v4 as uuid } from 'uuid';

const service = new TransactionsService();

describe("method tests for transactions", () => {
  test("get all transactions", () => {
    const result = service.get();
    expect(result).resolves.toBeTruthy();
  });

  test("get a single transaction", () => {
    const result = service.getFirst(uuid());
    expect(result).rejects.toThrowError('Transaction not found');
  });

  test("create a transaction", () => {
    const body = {
      clientEmail: "diegodelgado_96@hotmail.com",
      accountSenderId: 99950431,
      accountReceiverId: 56660431,
      amount: 300,
    };
    const result = service.store(body);
    expect(result).resolves.toBeTruthy();
  });

  test("edit transaction", () => {
    const transactionId = uuid();
    const body = {
      clientEmail: "diegodelgado_96@hotmail.com",
      accountSenderId: 99950431,
      accountReceiverId: 56660431,
      amount: 300,
    };
    const result = service.edit(transactionId, body);
    expect(result).rejects.toThrowError('Transaction doesn\'t exists');
  });

  test("delete transaction", () => {
    const accountId = "383409a2-1976-45c1-9dce-f9dd4cd60ce9";
    const result = service.remove(accountId);
    expect(result).resolves.toBeTruthy();
  });
});