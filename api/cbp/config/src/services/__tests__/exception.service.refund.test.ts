import { Database } from '../../config/db';
import { ExceptionService } from '../exception.service';
import { 
  ExceptionRefundRequest,
  ExceptionError, 
  ExceptionErrorCodes 
} from '../../types/fis-exception';
import { IRecordSet, IResult, IProcedureResult } from 'mssql';

jest.mock('../../config/db');
jest.mock('../../utils/logger');

describe('ExceptionService - Refund Processing', () => {
  let service: ExceptionService;
  let mockDb: jest.Mocked<Database>;

  const createMockRecordSet = <T>(records: T[]): IRecordSet<T> => {
    return {
      toTable: () => ({ rows: records }),
      columns: {},
      ...records
    } as unknown as IRecordSet<T>;
  };

  type SqlRecord<T> = T extends any[] ? T[0] : T;

  const createMockResult = <T>(records: T[]): IProcedureResult<SqlRecord<T>> => {
    const recordset = createMockRecordSet(records);
    return {
      recordset,
      recordsets: [recordset],
      output: {},
      rowsAffected: [records.length],
      returnValue: 0
    } as unknown as IProcedureResult<SqlRecord<T>>;
  };

  beforeEach(() => {
    mockDb = {
      executeProc: jest.fn(),
      close: jest.fn()
    } as unknown as jest.Mocked<Database>;
    service = new ExceptionService(mockDb);
  });

  describe('checkRefundAdjustment', () => {
    const mockDate = new Date('2025-01-08T20:28:07-07:00');
    const mockException = {
      id: 1,
      payeeName: 'Test Payee',
      serviceRequestDate: mockDate.toISOString(),
      transactionAmount: '100.00',
      customerPayeeId: 'TEST123',
      customerPayeeAccountNumber: 'ACC123',
      confirmationNumber: 'CONF123'
    };

    it('should check refund adjustment successfully', async () => {
      // Mock getException response
      const mockExceptionResult = createMockResult([mockException]);

      // Mock refund check response
      const mockRefundResult = createMockResult([{
        Success: true,
        Amount: 100.00,
        AdjustmentDate: mockDate.toISOString(),
        Status: 'PENDING',
        Reason: 'Test refund'
      }]);

      mockDb.executeProc
        .mockResolvedValueOnce(mockExceptionResult)
        .mockResolvedValueOnce(mockRefundResult);

      const refundRequest: ExceptionRefundRequest = {
        exceptionId: 1,
        amount: 100.00
      };

      const result = await service.checkRefundAdjustment(refundRequest);

      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        success: true,
        adjustment: {
          amount: 100.00,
          date: new Date(mockDate),
          status: 'PENDING',
          reason: 'Test refund'
        }
      });
      expect(mockDb.executeProc).toHaveBeenCalledWith(
        'PROC_FIS_REFUND_CHECK',
        refundRequest
      );
    });

    it('should return unsuccessful response when refund check fails', async () => {
      // Mock getException response
      const mockExceptionResult = createMockResult([mockException]);

      // Mock failed refund check response
      const mockRefundResult = createMockResult([{
        Success: false
      }]);

      mockDb.executeProc
        .mockResolvedValueOnce(mockExceptionResult)
        .mockResolvedValueOnce(mockRefundResult);

      const refundRequest: ExceptionRefundRequest = {
        exceptionId: 1,
        amount: 100.00
      };

      const result = await service.checkRefundAdjustment(refundRequest);

      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        success: false
      });
    });

    it('should throw error for missing payment ID', async () => {
      await expect(
        service.checkRefundAdjustment({
          exceptionId: 1,
          amount: 100.00
        })
      ).rejects.toThrow(
        new ExceptionError(
          ExceptionErrorCodes.INVALID_REQUEST,
          400,
          'Payment ID is required'
        )
      );
    });

    it('should throw error for missing exception ID', async () => {
      await expect(
        service.checkRefundAdjustment({
          exceptionId: 0,
          amount: 100.00
        })
      ).rejects.toThrow(
        new ExceptionError(
          ExceptionErrorCodes.INVALID_REQUEST,
          400,
          'Exception ID is required'
        )
      );
    });

    it('should throw error for non-existent exception', async () => {
      // Mock empty getException response
      const mockExceptionResult = createMockResult([]);

      mockDb.executeProc.mockResolvedValueOnce(mockExceptionResult);

      await expect(
        service.checkRefundAdjustment({
          exceptionId: 999,
          amount: 100.00
        })
      ).rejects.toThrow(
        new ExceptionError(
          ExceptionErrorCodes.NOT_FOUND,
          404,
          'Exception with id 999 not found'
        )
      );
    });

    it('should throw error for database error', async () => {
      // Mock getException response
      const mockExceptionResult = createMockResult([mockException]);

      // Mock database error response
      const mockRefundResult = createMockResult([]);

      mockDb.executeProc
        .mockResolvedValueOnce(mockExceptionResult)
        .mockResolvedValueOnce(mockRefundResult);

      await expect(
        service.checkRefundAdjustment({
          exceptionId: 1,
          amount: 100.00
        })
      ).rejects.toThrow(
        new ExceptionError(
          ExceptionErrorCodes.DATABASE_ERROR,
          500,
          'Invalid response from database'
        )
      );
    });
  });
});
