export interface PayeeRecord {
  id: string;
  name: string;
  status: string;
  email?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  paymentMethods?: string[];
  defaultPaymentMethod?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PayeeCreateData {
  name: string;
  email?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  paymentMethods?: string[];
  defaultPaymentMethod?: string;
}

export interface PayeeUpdateData {
  name?: string;
  email?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  paymentMethods?: string[];
  defaultPaymentMethod?: string;
  status?: string;
}
