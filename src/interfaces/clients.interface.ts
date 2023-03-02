export interface ClientsInterface {
  id?: number;
  name?: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClientsInterface extends ClientsInterface {
  confirmPassword: string;
}
