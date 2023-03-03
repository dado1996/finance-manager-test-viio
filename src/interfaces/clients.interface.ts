export interface ClientsInterface {
  id?: number;
  name: string | null;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClientsInterface extends Omit<ClientsInterface, "createdAt" | "updatedAt"> {
  confirmPassword: string;
}
