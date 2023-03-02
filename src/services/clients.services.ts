import { CreateClientsInterface } from "../interfaces/clients.interface";
import { prisma } from "../lib/prisma";
import { compare, hash } from "../utils/hashing";
import { generateToken } from "../lib/jwt";

class ClientsServices {
  constructor() {}

  async login(email: string, password: string) {
    const getUser = await prisma.clients.findFirst({
      where: {
        email: email
      }
    });

    if (!getUser) {
      throw new Error('Email doesn\'t exists');
    }

    if (!compare(password, getUser.password)) {
      throw new Error('Invalid password');
    }

    return generateToken({ name: getUser.name, email: getUser.email });
  }

  async get() {
    const allUsers = await prisma.clients.findMany();

    return allUsers;
  }

  async getFirst(id: number) {}

  async store(body: CreateClientsInterface) {
    const { name, email, password } = body;

    const checkIfEmailExists = await prisma.clients.findFirst({
      where: {
        email: email
      }
    });

    if (checkIfEmailExists) {
      throw new Error('Email already registered');
    }

    const newClient = await prisma.clients.create({
      data: {
        name: name,
        email: email,
        password: hash(password),
      }
    });

    return newClient;
  }

  async edit(id: number, body: any) {}

  async remove(id: number) {}
}

export default ClientsServices;