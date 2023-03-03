import { CreateClientsInterface } from "../interfaces/clients.interface";
import { prisma } from "../lib/prisma";
import { compare, hash } from "../utils/hashing";
import { generateToken } from "../lib/jwt";
import moment from "moment";

class ClientsServices {
  constructor() {}

  async login(email: string, password: string) {
    const getUser = await prisma.clients.findFirst({
      where: {
        email: email,
      },
    });

    if (!getUser) {
      throw new Error("Email doesn't exists");
    }

    if (!compare(password, getUser.password)) {
      throw new Error("Invalid password");
    }

    return generateToken({ name: getUser.name, email: getUser.email });
  }

  async get() {
    const allUsers = await prisma.clients.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        status: true,
      },
      take: 100,
      orderBy: {
        email: "asc",
      },
    });
    return allUsers.map((user) => ({
      ...user,
      createdAt: moment(user.createdAt).format("YYYY-MM-DD"),
      updatedAt: moment(user.updatedAt).format("YYYY-MM-DD"),
    }));
  }

  async getFirst(id: number) {
    const user = await prisma.clients.findFirst({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id: id,
        status: true,
      },
    });

    return user ? {
      ...user,
      createdAt: moment(user?.createdAt).format("YYYY-MM-DD"),
      updatedAt: moment(user?.updatedAt).format("YYYY-MM-DD"),
    } : null;
  }

  async getByEmail(email: string) {
    const client = await prisma.clients.findFirst({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        status: true,
        email: email,
      }
    });

    return client;
  }

  async store(body: CreateClientsInterface) {
    const { name, email, password } = body;

    const checkIfEmailExists = await prisma.clients.findFirst({
      where: {
        email: email,
      },
    });

    if (checkIfEmailExists) {
      throw new Error("Email already registered");
    }

    const newClient = await prisma.clients.create({
      data: {
        name: name,
        email: email,
        password: hash(password),
      },
    });

    return newClient;
  }

  async edit(id: number, body: CreateClientsInterface) {
    const { name, email, password } = body;

    const currentEmail = await prisma.clients.findFirst({
      select: {
        email: true,
      },
      where: {
        id: id,
      },
    });

    const checkIfEmailExists = await prisma.clients.findFirst({
      where: {
        AND: [
          {
            email: email,
          },
          {
            NOT: {
              email: currentEmail?.email,
            },
          },
        ],
      },
    });

    if (checkIfEmailExists) {
      throw new Error("Email already registered");
    }

    const editedUser = await prisma.clients.update({
      data: {
        name: name,
        email: email,
        password: hash(password),
        updatedAt: new Date(),
      },
      where: {
        id: id,
      },
      select: {
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      ...editedUser,
      createdAt: moment(editedUser.createdAt).format("YYYY-MM-DD"),
      updatedAt: moment(editedUser.updatedAt).format("YYYY-MM-DD"),
    };
  }

  async remove(id: number) {
    const result = await prisma.clients.update({
      data: {
        status: false,
      },
      where: {
        id: id,
      },
      select: {
        id: true,
      },
    });

    return result;
  }
}

export default ClientsServices;
