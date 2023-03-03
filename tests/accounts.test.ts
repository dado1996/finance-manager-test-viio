import { describe, expect, jest, test } from "@jest/globals";
import AccountsService from '../src/services/accounts.services';

const service = new AccountsService();

describe("method tests for accounts", () => {
  test("get all accounts", () => {
    const result = service.get();
    expect(result).resolves.toBeTruthy();
  });

  test("get a single account", () => {
    const id = 12345678;
    const result = service.getFirst(id);
    expect(result).rejects.toThrowError('Account not found');
  });

  test("create an account", () => {
    const body = {
      clientEmail: "diegodelgado_96@hotmail.com",
      bankName: "Banco Caja Social",
      totalValue: 5000,
    };
    const result = service.store(body);
    expect(result).resolves.toBeTruthy();
  });

  test("edit account", () => {
    const accountId = 12345678;
    const body = {
      clientEmail: "diegodelgado_96@hotmail.com",
      bankName: "Banco Caja Social",
      totalValue: 5000,
    };
    const result = service.edit(accountId, body);
    expect(result).rejects.toThrowError('Account doesn\'t exists');
  });

  test("delete account", () => {
    const accountId = 99523523;
    const result = service.remove(accountId);
    expect(result).resolves.toBeTruthy();
  });
});