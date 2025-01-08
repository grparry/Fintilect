export interface BankAccount {
  accountNumber: string;
  routingNumber: string;
  accountType: 'checking' | 'savings';
}

export interface Payee {
  PayeeId: string;
  Name: string;
  Email: string;
  Phone: string;
  Status: 'ACTIVE' | 'INACTIVE';
  BankAccounts: BankAccount[];
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy?: string;
  ModifiedDate?: Date;
  DeletedBy?: string;
  DeletedDate?: Date;
  Amount?: number; // For active payments
}

export interface CreatePayeeRequest {
  name: string;
  email: string;
  phone: string;
  bankAccounts?: BankAccount[];
}

export interface UpdatePayeeRequest {
  name?: string;
  email?: string;
  phone?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  bankAccounts?: BankAccount[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface PayeeRecord {
  PayeeId: string;
  Name: string;
  Email: string;
  Phone: string;
  Status: 'ACTIVE' | 'INACTIVE';
  BankAccounts: BankAccount[];
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy?: string;
  ModifiedDate?: Date;
  DeletedBy?: string;
  DeletedDate?: Date;
}

export interface PayeeCreateData {
  Name: string;
  Email: string;
  Phone: string;
  BankAccounts?: BankAccount[];
}

export interface PayeeUpdateData {
  Name?: string;
  Email?: string;
  Phone?: string;
  Status?: 'ACTIVE' | 'INACTIVE';
  BankAccounts?: BankAccount[];
}

export interface PayeeResponse<T> {
  recordset: T[];
  recordsets: T[][];
  rowsAffected: number[];
  output?: Record<string, any>;
}

export interface PaginatedResponse<T> extends PayeeResponse<T & { TotalCount: number }> {}
