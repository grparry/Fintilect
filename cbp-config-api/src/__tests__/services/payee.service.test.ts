import { PayeeService } from '../../services/payee.service';
import { TestDb } from '../../config/test.db';
import { HttpError } from '../../utils/errors';

describe('PayeeService', () => {
  let payeeService: PayeeService;
  let testDb: TestDb;

  beforeEach(() => {
    testDb = new TestDb();
    payeeService = new PayeeService(testDb);
    jest.spyOn(testDb, 'executeProc');
  });

  describe('listPayees', () => {
    it('should list all payees with pagination', async () => {
      const mockPayees = () => [
        {
          PayeeId: '1',
          Name: 'Test Payee 1',
          AccountNumber: '123456',
          Status: 'ACTIVE',
          TotalCount: 2
        },
        {
          PayeeId: '2',
          Name: 'Test Payee 2',
          AccountNumber: '789012',
          Status: 'ACTIVE',
          TotalCount: 2
        }
      ];

      testDb.setMockResponse('PAYEE', mockPayees);

      const result = await payeeService.listPayees(1, 10);
      expect(result).toMatchObject({
        pagination: {
          total: 2,
          page: 1,
          pageSize: 10,
          totalPages: 1
        }
      });
      expect(Array.from(result.data)).toEqual(mockPayees());
    });

    it('should handle empty result', async () => {
      const mockPayees = () => [];

      testDb.setMockResponse('PAYEE', mockPayees);

      const result = await payeeService.listPayees(1, 10);
      expect(result).toMatchObject({
        pagination: {
          total: 0,
          page: 1,
          pageSize: 10,
          totalPages: 0
        }
      });
      expect(Array.from(result.data)).toEqual(mockPayees());
    });

    it('should throw error if database returns invalid response', async () => {
      // Return an empty array to simulate a response without a recordset
      const mockPayees = () => [];
      
      // Mock the executeProc method to return undefined recordset
      (testDb.executeProc as jest.Mock).mockResolvedValueOnce({
        recordset: undefined,
        recordsets: [],
        rowsAffected: [0],
        output: {},
        returnValue: 0
      });

      testDb.setMockResponse('PAYEE', mockPayees);

      await expect(payeeService.listPayees(1, 10)).rejects.toThrow(
        new HttpError(500, 'Invalid response from database')
      );
    });

    it('should throw error if database call fails', async () => {
      const mockPayees = () => {
        throw new Error('Database error');
      };

      testDb.setMockResponse('PAYEE', mockPayees);

      await expect(payeeService.listPayees(1, 10)).rejects.toThrow(
        new HttpError(500, 'Failed to list payees')
      );
    });
  });

  describe('getPayee', () => {
    it('should get a payee by id', async () => {
      const mockPayee = () => {
        return {
          PayeeId: '1',
          Name: 'John Doe',
          AccountNumber: 'ACC123',
          Status: 'ACTIVE',
          CreatedBy: 'system',
          CreatedDate: new Date('2025-01-06T18:00:00-07:00'),
          ModifiedBy: null,
          ModifiedDate: null,
          DeletedBy: null,
          DeletedDate: null
        };
      };

      testDb.setMockResponse('PAYEE_GET', mockPayee);

      const result = await payeeService.getPayee('1');
      expect(result).toEqual(mockPayee());
      expect(testDb.executeProc).toHaveBeenCalledWith('PAYEE_GET', { id: '1' });
    });

    it('should throw error if payee not found', async () => {
      const mockPayee = () => [];

      testDb.setMockResponse('PAYEE_GET', mockPayee);

      await expect(payeeService.getPayee('999')).rejects.toThrow(
        new HttpError(404, 'Payee not found')
      );
    });

    it('should throw error if database call fails', async () => {
      const mockPayee = () => {
        throw new Error('Database error');
      };

      testDb.setMockResponse('PAYEE_GET', mockPayee);

      await expect(payeeService.getPayee('1')).rejects.toThrow(
        new HttpError(500, 'Failed to get payee')
      );
    });
  });

  describe('createPayee', () => {
    it('should create a payee', async () => {
      const payeeData = {
        name: 'John Doe',
        accountNumber: 'ACC123'
      };

      const expectedDbParams = {
        Name: payeeData.name,
        AccountNumber: payeeData.accountNumber,
        Status: 'ACTIVE',
        CreatedBy: 'system',
        CreatedDate: expect.any(Date)
      };

      const mockPayee = () => {
        return {
          PayeeId: '1',
          Name: payeeData.name,
          AccountNumber: payeeData.accountNumber,
          Status: 'ACTIVE',
          CreatedBy: 'system',
          CreatedDate: new Date('2025-01-06T18:00:00-07:00'),
          ModifiedBy: null,
          ModifiedDate: null,
          DeletedBy: null,
          DeletedDate: null
        };
      };

      testDb.setMockResponse('PAYEE_CREATE', mockPayee);

      const result = await payeeService.createPayee(payeeData);
      expect(result).toEqual(mockPayee());
      expect(testDb.executeProc).toHaveBeenCalledWith('PAYEE_CREATE', expectedDbParams);
    });

    it('should throw error if creation fails', async () => {
      const payeeData = {
        name: 'John Doe',
        accountNumber: 'ACC123'
      };

      const mockPayee = () => [];

      testDb.setMockResponse('PAYEE_CREATE', mockPayee);

      await expect(payeeService.createPayee(payeeData)).rejects.toThrow(
        new HttpError(500, 'Failed to create payee')
      );
    });
  });

  describe('updatePayee', () => {
    it('should update a payee', async () => {
      const payeeData = {
        name: 'John Doe Updated',
        status: 'INACTIVE'
      };

      const expectedDbParams = {
        id: '1',
        Name: payeeData.name,
        Status: payeeData.status,
        ModifiedBy: 'system',
        ModifiedDate: expect.any(Date)
      };

      const mockPayee = () => {
        return {
          PayeeId: '1',
          Name: payeeData.name,
          AccountNumber: 'ACC123',
          Status: payeeData.status,
          CreatedBy: 'system',
          CreatedDate: new Date('2025-01-06T18:00:00-07:00'),
          ModifiedBy: 'system',
          ModifiedDate: expect.any(Date),
          DeletedBy: null,
          DeletedDate: null
        };
      };

      testDb.setMockResponse('PAYEE_UPDATE', mockPayee);

      const result = await payeeService.updatePayee('1', payeeData);
      expect(result).toEqual(mockPayee());
      expect(testDb.executeProc).toHaveBeenCalledWith('PAYEE_UPDATE', expectedDbParams);
    });

    it('should throw error if payee not found', async () => {
      const payeeData = {
        name: 'John Doe Updated'
      };

      const mockPayee = () => [];

      testDb.setMockResponse('PAYEE_UPDATE', mockPayee);

      await expect(payeeService.updatePayee('999', payeeData)).rejects.toThrow(
        new HttpError(404, 'Payee not found')
      );
    });
  });

  describe('deletePayee', () => {
    it('should delete a payee', async () => {
      // Mock the first call to check for payments
      (testDb.executeProc as jest.Mock).mockResolvedValueOnce({
        recordset: [{ hasPayments: false }],
        recordsets: [[{ hasPayments: false }]],
        rowsAffected: [1],
        output: {},
        returnValue: 0
      });

      // Mock the second call to delete the payee
      (testDb.executeProc as jest.Mock).mockResolvedValueOnce({
        recordset: [{ success: true }],
        recordsets: [[{ success: true }]],
        rowsAffected: [1],
        output: {},
        returnValue: 0
      });

      await payeeService.deletePayee('1');
      
      expect(testDb.executeProc).toHaveBeenCalledWith('PAYEE_DELETE', {
        id: '1',
        DeletedBy: 'system',
        DeletedDate: expect.any(Date)
      });
    });

    it('should throw error if payee has payments', async () => {
      // Mock the call to check for payments
      (testDb.executeProc as jest.Mock).mockResolvedValueOnce({
        recordset: [{ hasPayments: true }],
        recordsets: [[{ hasPayments: true }]],
        rowsAffected: [1],
        output: {},
        returnValue: 0
      });

      await expect(payeeService.deletePayee('1')).rejects.toThrow(
        new HttpError(400, 'Cannot delete payee with existing payments')
      );
    });

    it('should throw error if payee not found', async () => {
      // Mock the first call to check for payments
      (testDb.executeProc as jest.Mock).mockResolvedValueOnce({
        recordset: [{ hasPayments: false }],
        recordsets: [[{ hasPayments: false }]],
        rowsAffected: [1],
        output: {},
        returnValue: 0
      });

      // Mock the second call to delete the payee
      (testDb.executeProc as jest.Mock).mockResolvedValueOnce({
        recordset: [],
        recordsets: [[]],
        rowsAffected: [0],
        output: {},
        returnValue: 0
      });

      await expect(payeeService.deletePayee('999')).rejects.toThrow(
        new HttpError(404, 'Payee not found')
      );
    });
  });
});
