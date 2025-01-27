import { PayeeService } from '@/../services/payee.service';
import { PayeeRecord, PayeeResponse, PaginatedResponse } from '@/../types/payee';
import { DatabaseService } from '@/../interfaces/database';
import { PayeeTestHelper, mockPayees } from '@/integration/helpers/payee.helper';
import { HttpError } from '@/../utils/errors';

describe('PayeeService', () => {
  let payeeService: PayeeService;
  let mockDb: DatabaseService;

  beforeEach(async () => {
    mockDb = {
      query: jest.fn(),
      executeProc: jest.fn(),
      beginTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
    } as jest.Mocked<DatabaseService>;

    payeeService = new PayeeService(mockDb);
  });

  describe('listPayees', () => {
    it('should list all active payees with pagination', async () => {
      const mockResult = {
        recordset: [
          {
            PayeeId: mockPayees.standard.PayeeId,
            Name: mockPayees.standard.Name,
            Email: mockPayees.standard.Email,
            Phone: mockPayees.standard.Phone,
            Status: 'ACTIVE',
            BankAccounts: [],
            CreatedBy: 'system',
            CreatedDate: new Date(),
            TotalCount: 2
          }
        ],
        recordsets: [[]],
        rowsAffected: [1],
        output: {}
      };

      (mockDb.query as jest.Mock).mockResolvedValue(mockResult);
      const result = await payeeService.listPayees(1, 10);
      
      expect(result.recordset).toEqual(mockResult.recordset);
      expect(result.recordset[0].PayeeId).toBe(mockPayees.standard.PayeeId);
      expect(result.recordset[0].TotalCount).toBe(2);
    });

    it('should handle empty results', async () => {
      const emptyResult = {
        recordset: [],
        recordsets: [[]],
        rowsAffected: [0],
        output: {}
      };

      (mockDb.query as jest.Mock).mockResolvedValue(emptyResult);
      const result = await payeeService.listPayees(1, 10);
      
      expect(result.recordset).toEqual([]);
    });

    it('should throw error for invalid page number', async () => {
      await expect(payeeService.listPayees(0, 10)).rejects.toThrow(
        new HttpError(400, 'Invalid page number')
      );
    });

    it('should throw error for invalid page size', async () => {
      await expect(payeeService.listPayees(1, 0)).rejects.toThrow(
        new HttpError(400, 'Invalid page size')
      );
    });
  });

  describe('getPayee', () => {
    it('should get an active payee by id', async () => {
      const mockPayee = {
        recordset: [{
          PayeeId: mockPayees.standard.PayeeId,
          Name: mockPayees.standard.Name,
          Email: mockPayees.standard.Email,
          Phone: mockPayees.standard.Phone,
          Status: 'ACTIVE',
          BankAccounts: [],
          CreatedBy: 'system',
          CreatedDate: new Date()
        }],
        recordsets: [[]],
        rowsAffected: [1],
        output: {}
      };

      (mockDb.query as jest.Mock).mockResolvedValue(mockPayee);
      const result = await payeeService.getPayee(mockPayees.standard.PayeeId);
      
      expect(result).toEqual(mockPayee.recordset[0]);
    });

    it('should get an inactive payee by id', async () => {
      const mockPayee = {
        recordset: [{
          PayeeId: mockPayees.inactive.PayeeId,
          Name: mockPayees.inactive.Name,
          Email: mockPayees.inactive.Email,
          Phone: mockPayees.inactive.Phone,
          Status: 'INACTIVE',
          BankAccounts: [],
          CreatedBy: 'system',
          CreatedDate: new Date()
        }],
        recordsets: [[]],
        rowsAffected: [1],
        output: {}
      };

      (mockDb.query as jest.Mock).mockResolvedValue(mockPayee);
      const result = await payeeService.getPayee(mockPayees.inactive.PayeeId);
      
      expect(result).toEqual(mockPayee.recordset[0]);
    });

    it('should return empty record when payee not found', async () => {
      const emptyResult = {
        recordset: [],
        recordsets: [[]],
        rowsAffected: [0],
        output: {}
      };

      (mockDb.query as jest.Mock).mockResolvedValue(emptyResult);
      const result = await payeeService.getPayee('999999');
      
      expect(result).toEqual({} as PayeeRecord);
    });
  });

  describe('deletePayee', () => {
    it('should delete payee without active payments', async () => {
      const emptyPayments = {
        recordset: [],
        recordsets: [[]],
        rowsAffected: [0],
        output: {}
      };

      const deleteResult = {
        recordset: [],
        recordsets: [[]],
        rowsAffected: [1],
        output: {}
      };

      (mockDb.executeProc as jest.Mock).mockResolvedValueOnce(emptyPayments);
      (mockDb.executeProc as jest.Mock).mockResolvedValueOnce(deleteResult);
      
      await payeeService.deletePayee(mockPayees.inactive.PayeeId);
      
      expect(mockDb.executeProc).toHaveBeenCalledWith('ACTIVE_PAYMENTS', expect.any(Object));
      expect(mockDb.executeProc).toHaveBeenCalledWith('PAYEE', expect.any(Object));
    });

    it('should throw error when payee has active payments', async () => {
      const mockActivePayments = {
        recordset: [{ count: 1 }],
        recordsets: [[]],
        rowsAffected: [1],
        output: {}
      };

      (mockDb.executeProc as jest.Mock).mockResolvedValue(mockActivePayments);

      await expect(payeeService.deletePayee(mockPayees.standard.PayeeId)).rejects.toThrow(
        new HttpError(400, 'Cannot delete payee with active payments')
      );
    });

    it('should throw error when payee not found', async () => {
      const emptyResult = {
        recordset: [],
        recordsets: [[]],
        rowsAffected: [0],
        output: {}
      };

      (mockDb.executeProc as jest.Mock).mockResolvedValue(emptyResult);

      await expect(payeeService.deletePayee('999999')).rejects.toThrow(
        new HttpError(404, 'Payee not found')
      );
    });
  });
});
