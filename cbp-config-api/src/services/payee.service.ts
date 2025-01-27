import { PayeeCreateData, PayeeUpdateData, PayeeRecord } from '@/types/payee';
import { DatabaseService } from '@/interfaces/database';
import { HttpError } from '@/utils/errors';

export interface PayeeQueryResult {
  PayeeId: string;
  Name: string;
  Email: string;
  Phone: string;
  Status: 'ACTIVE' | 'INACTIVE';
  BankAccounts: any[];
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy?: string;
  ModifiedDate?: Date;
  DeletedBy?: string;
  DeletedDate?: Date;
  TotalCount?: number;
}

export class PayeeService {
  constructor(private db: DatabaseService) {}

  async listPayees(page: number, pageSize: number): Promise<{
    recordset: PayeeQueryResult[];
    recordsets: PayeeQueryResult[][];
    rowsAffected: number[];
    output?: Record<string, any>;
  }> {
    if (page < 1) throw new HttpError(400, 'Invalid page number');
    if (pageSize < 1) throw new HttpError(400, 'Invalid page size');

    const offset = (page - 1) * pageSize;
    const query = `
      SELECT p.*,
             COUNT(*) OVER() as TotalCount
      FROM Payees p
      WHERE p.DeletedDate IS NULL
      ORDER BY p.CreatedDate DESC
      OFFSET @offset ROWS
      FETCH NEXT @pageSize ROWS ONLY;
    `;

    return this.db.query<PayeeQueryResult>(query, { offset, pageSize });
  }

  async getPayee(id: string): Promise<PayeeQueryResult> {
    const query = `
      SELECT *
      FROM Payees
      WHERE PayeeId = @id AND DeletedDate IS NULL;
    `;

    const result = await this.db.query<PayeeQueryResult>(query, { id });
    if (!result || !result.recordset || result.recordset.length === 0) {
      return {} as PayeeQueryResult;
    }
    return result.recordset[0];
  }

  async createPayee(data: PayeeCreateData): Promise<PayeeQueryResult> {
    const query = `
      INSERT INTO Payees (Name, Email, Phone, BankAccounts, CreatedBy, CreatedDate)
      OUTPUT INSERTED.*
      VALUES (@name, @email, @phone, @bankAccounts, @createdBy, GETDATE());
    `;

    const result = await this.db.query<PayeeQueryResult>(query, {
      name: data.Name,
      email: data.Email,
      phone: data.Phone,
      bankAccounts: JSON.stringify(data.BankAccounts || []),
      createdBy: 'system'
    });

    if (!result || !result.recordset || result.recordset.length === 0) {
      throw new HttpError(500, 'Failed to create payee');
    }
    return result.recordset[0];
  }

  async updatePayee(id: string, data: PayeeUpdateData): Promise<PayeeQueryResult> {
    const updates: string[] = [];
    const params: Record<string, any> = { id };

    if (data.Name !== undefined) {
      updates.push('Name = @name');
      params.name = data.Name;
    }
    if (data.Email !== undefined) {
      updates.push('Email = @email');
      params.email = data.Email;
    }
    if (data.Phone !== undefined) {
      updates.push('Phone = @phone');
      params.phone = data.Phone;
    }
    if (data.Status !== undefined) {
      updates.push('Status = @status');
      params.status = data.Status;
    }
    if (data.BankAccounts !== undefined) {
      updates.push('BankAccounts = @bankAccounts');
      params.bankAccounts = JSON.stringify(data.BankAccounts);
    }

    if (updates.length === 0) {
      throw new HttpError(400, 'No updates provided');
    }

    const query = `
      UPDATE Payees
      SET ${updates.join(', ')},
          ModifiedBy = @modifiedBy,
          ModifiedDate = GETDATE()
      OUTPUT INSERTED.*
      WHERE PayeeId = @id AND DeletedDate IS NULL;
    `;

    params.modifiedBy = 'system';

    const result = await this.db.query<PayeeQueryResult>(query, params);
    if (!result || !result.recordset || result.recordset.length === 0) {
      throw new HttpError(404, 'Payee not found');
    }
    return result.recordset[0];
  }

  async deletePayee(id: string): Promise<void> {
    // First check if payee has any active payments
    const activePayments = await this.getActivePayments(id);
    if (activePayments && activePayments.length > 0) {
      throw new HttpError(400, 'Cannot delete payee with active payments');
    }

    const result = await this.db.executeProc('PAYEE', {
      id,
      deletedBy: 'system'
    });

    if (!result || !result.rowsAffected || result.rowsAffected[0] === 0) {
      throw new HttpError(404, 'Payee not found');
    }
  }

  async getActivePayments(payeeId: string): Promise<any[]> {
    const result = await this.db.executeProc('ACTIVE_PAYMENTS', { id: payeeId });
    return result.recordset || [];
  }
}
