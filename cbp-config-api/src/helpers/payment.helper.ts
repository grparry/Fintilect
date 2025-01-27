import { Pool } from 'pg';
import { TestDatabase } from '@/config/test.db';

export interface Payment {
  id: number;
  amount: number;
  status: string;
  description?: string;
  createdDate: Date;
  modifiedDate: Date;
  deletedDate?: Date;
}

type DatabaseClient = Pool | TestDatabase;

export class PaymentHelper {
  constructor(private db: DatabaseClient) {}

  private async executeQuery(query: string, params?: any[]): Promise<any> {
    if (this.db instanceof Pool) {
      return this.db.query(query, params);
    } else {
      const result = await this.db.executeProcedure(query, params || {});
      return {
        rows: result.recordset || [],
        rowCount: (result.rowsAffected && result.rowsAffected[0]) || 0
      };
    }
  }

  async getPayments(): Promise<Payment[]> {
    const result = await this.executeQuery('GetPayments()', []);
    return result.rows || result.recordset || [];
  }

  async getPaymentDetails(id: number): Promise<Payment | null> {
    const result = await this.executeQuery('GetPaymentDetails($1)', [id]);
    const rows = result.rows || result.recordset || [];
    return rows[0] || null;
  }

  async insertPayment(payment: Omit<Payment, 'id' | 'createdDate' | 'modifiedDate' | 'deletedDate'>): Promise<Payment> {
    const result = await this.executeQuery('InsertPayment($1, $2, $3)', [
      payment.amount,
      payment.status,
      payment.description
    ]);
    const rows = result.rows || result.recordset || [];
    return rows[0];
  }

  async updatePayment(id: number, updates: Partial<Omit<Payment, 'id' | 'createdDate' | 'modifiedDate' | 'deletedDate'>>): Promise<Payment | null> {
    const result = await this.executeQuery('UpdatePayment($1, $2, $3, $4)', [
      id,
      updates.amount,
      updates.status,
      updates.description
    ]);
    const rows = result.rows || result.recordset || [];
    return rows[0] || null;
  }

  async deletePayment(id: number): Promise<boolean> {
    const result = await this.executeQuery('DeletePayment($1)', [id]);
    return ((result.rowCount ?? 0) > 0) || ((result.rowsAffected?.[0] ?? 0) > 0);
  }
}
