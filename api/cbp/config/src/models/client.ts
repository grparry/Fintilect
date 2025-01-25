export interface ClientRecord {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  status: string;
  clientType?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
