import ClientsService from "../src/services/clients.services";
import { describe, expect, jest, test } from "@jest/globals";

const service = new ClientsService();

describe("services test", () => {
  test("get all clients", async () => {
    const result = service.get();
    await expect(result).resolves.not.toBeFalsy();
    await expect(result).resolves.not.toBeUndefined();
  });

  test("get a single client", async () => {
    const id = 4
    const result = service.getFirst(id);
    expect(result).rejects.toThrowError('Transaction not found');
  });

  test("create a client", async () => {
    const body = {
      name: "Diego Delgado Otalora",
      email: "diegodelgadoalejandro@gmail.com",
      password: "12345",
      confirmPassword: "12345",
    };
    const result = service.store(body);
    expect(result).resolves.toBeTruthy();
  });

  test("edit a client", async () => {
    const id = 8;
    const body = {
      name: "Diego Delgado Otalora",
      email: "diegodelgadoalejandro@gmail.com",
      password: "12345",
      confirmPassword: "12345",
    };
    const result = service.edit(id, body);
    expect(result).rejects.toThrowError('Transaction doesn\'t exists');
  });

  test("delete a client", async () => {
    const id = 4;
    const result = service.remove(id);
    expect(result).resolves.toBeTruthy();
  });
});