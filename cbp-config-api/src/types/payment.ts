export interface PaymentRecord {
  id: string;
  amount: number;
  currency: string;
  status: string;
  payeeId: string;
  paymentDate: Date;
  effectiveDate: Date;
  paymentMethod?: string;
  description?: string;
  metadata?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PaymentCreateData {
  amount: number;
  currency: string;
  payeeId: string;
  paymentDate: Date;
  effectiveDate: Date;
  paymentMethod?: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface PaymentUpdateData {
  amount?: number;
  currency?: string;
  status?: string;
  paymentDate?: Date;
  effectiveDate?: Date;
  paymentMethod?: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface PaymentSearchParams {
  status?: string;
  payeeId?: string;
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
  currency?: string;
}
