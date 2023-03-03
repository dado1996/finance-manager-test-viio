import { describe, expect, test } from "@jest/globals";
import ClientsServices from "../src/services/clients.services";

const service = new ClientsServices();

describe("login tests", () => {
  test("login", async () => {
    const result = service.login("diegodelgado_96@hotmail.com", "diego1234.0");
    console.log(await result);
    await expect(result).resolves.toBeTruthy();
  });

  test("login fail", async () => {
    const result = service.login("diegodelgado_96@hotmail.com", "abcdefg");
    await expect(result).rejects.toThrowError('Invalid password');
  })
});