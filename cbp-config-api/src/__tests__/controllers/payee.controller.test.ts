import { Request, Response } from 'express';
import { PayeeController } from '@/../controllers/payee.controller';
import { PayeeService } from '@/../services/payee.service';
import { DatabaseService } from '@/../interfaces/database';
import { HttpError } from '@/../utils/errors';
import { CreatePayeeRequest, PayeeRecord, PayeeResponse, PaginatedResponse, BankAccount } from '@/../types/payee';

describe('PayeeController', () => {
  let payeeController: PayeeController;
  let mockPayeeService: jest.Mocked<PayeeService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;
  let mockDb: jest.Mocked<DatabaseService>;

  beforeEach(() => {
    mockDb = {
      query: jest.fn(),
      executeProc: jest.fn(),
      beginTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
    } as jest.Mocked<DatabaseService>;

    // Create an actual PayeeService instance with mock db
    mockPayeeService = new PayeeService(mockDb) as jest.Mocked<PayeeService>;
    
    // Mock all the methods
    mockPayeeService.listPayees = jest.fn();
    mockPayeeService.getPayee = jest.fn();
    mockPayeeService.createPayee = jest.fn();
    mockPayeeService.updatePayee = jest.fn();
    mockPayeeService.deletePayee = jest.fn();
    mockPayeeService.getActivePayments = jest.fn();

    payeeController = new PayeeController(mockPayeeService);

    mockRequest = {
      params: {},
      query: {},
      body: {}
    };

    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    mockNext = jest.fn();
  });

  describe('listPayees', () => {
    it('should list payees with pagination', async () => {
      const mockPayees = {
        recordset: [
          {
            PayeeId: '1',
            Name: 'Test Payee',
            Email: 'test@example.com',
            Phone: '1234567890',
            Status: 'ACTIVE' as const,
            BankAccounts: [],
            CreatedBy: 'system',
            CreatedDate: new Date(),
            TotalCount: 1
          }
        ],
        recordsets: [],
        rowsAffected: [1],
        output: {}
      };

      mockRequest.query = { page: '1', pageSize: '10' };
      mockPayeeService.listPayees.mockResolvedValue(mockPayees);

      await payeeController.listPayees(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockPayeeService.listPayees).toHaveBeenCalledWith(1, 10);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: mockPayees.recordset,
        pagination: {
          page: 1,
          pageSize: 10,
          total: 1
        }
      });
    });

    it('should handle invalid page number', async () => {
      mockRequest.query = { page: '-1', pageSize: '10' };

      await payeeController.listPayees(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(
        expect.any(HttpError)
      );
    });

    it('should handle invalid page size', async () => {
      mockRequest.query = { page: '1', pageSize: '0' };

      await payeeController.listPayees(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(
        expect.any(HttpError)
      );
    });

    it('should handle service errors', async () => {
      mockRequest.query = { page: '1', pageSize: '10' };
      const error = new Error('Database error');
      mockPayeeService.listPayees.mockRejectedValue(error);

      await payeeController.listPayees(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('updatePayee', () => {
    const validUpdates = {
      Name: 'Updated Payee',
      Email: 'updated@example.com',
      Phone: '123-456-7890',
      Status: 'ACTIVE' as const,
      BankAccounts: [] as BankAccount[]
    };

    it('should update existing payee', async () => {
      const mockUpdatedPayee: PayeeRecord = {
        PayeeId: '1',
        Name: validUpdates.Name,
        Email: validUpdates.Email,
        Phone: validUpdates.Phone,
        Status: validUpdates.Status,
        BankAccounts: validUpdates.BankAccounts,
        CreatedBy: 'system',
        CreatedDate: new Date(),
        ModifiedBy: 'system',
        ModifiedDate: new Date()
      };

      mockRequest.params = { id: '1' };
      mockRequest.body = validUpdates;
      mockPayeeService.updatePayee.mockResolvedValue(mockUpdatedPayee);

      await payeeController.updatePayee(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedPayee);
    });

    it('should handle payee not found', async () => {
      mockRequest.params = { id: '999' };
      mockRequest.body = validUpdates;
      mockPayeeService.updatePayee.mockRejectedValue(
        new HttpError(404, 'Payee not found')
      );

      await payeeController.updatePayee(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalledWith(
        new HttpError(404, 'Payee not found')
      );
    });

    it('should handle validation errors', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = {};

      await payeeController.updatePayee(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalledWith(
        new HttpError(400, 'Invalid update data')
      );
    });
  });

  describe('deletePayee', () => {
    it('should delete existing payee', async () => {
      mockRequest.params = { id: '1' };
      mockPayeeService.deletePayee.mockResolvedValue(undefined);

      await payeeController.deletePayee(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockPayeeService.deletePayee).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });

    it('should handle payee not found', async () => {
      mockRequest.params = { id: '999' };
      mockPayeeService.deletePayee.mockRejectedValue(
        new HttpError(404, 'Payee not found')
      );

      await payeeController.deletePayee(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalledWith(
        new HttpError(404, 'Payee not found')
      );
    });

    it('should handle active payments error', async () => {
      mockRequest.params = { id: '1' };
      mockPayeeService.deletePayee.mockRejectedValue(
        new HttpError(400, 'Cannot delete payee with active payments')
      );

      await payeeController.deletePayee(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalledWith(
        new HttpError(400, 'Cannot delete payee with active payments')
      );
    });
  });
});
