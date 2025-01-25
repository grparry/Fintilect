import { Database } from '../../config/db';
import { ExceptionService } from '../exception.service';
import { ExceptionHistoryService } from '../exception-history.service';
import { 
  ExceptionSearchRequest,
  ExceptionUpdateRequest,
  ExceptionRefundRequest,
  ExceptionNotificationRequest,
  ExceptionError, 
  ExceptionErrorCodes 
} from '../../types/fis-exception';
import { ExceptionHistoryType } from '../../types/exception-history';
import { IRecordSet, IResult, IProcedureResult } from 'mssql';

jest.mock('../../config/db');
jest.mock('../exception-history.service');
jest.mock('../../utils/logger');

describe('ExceptionService', () => {
  let service: ExceptionService;
  let mockDb: jest.Mocked<Database>;
  let mockHistoryService: jest.Mocked<ExceptionHistoryService>;

  beforeEach(() => {
    mockDb = {
      executeProc: jest.fn(),
      close: jest.fn()
    } as unknown as jest.Mocked<Database>;

    mockHistoryService = {
      createHistory: jest.fn(),
      searchHistory: jest.fn(),
      getHistoryById: jest.fn(),
    } as unknown as jest.Mocked<ExceptionHistoryService>;

    // @ts-ignore - Mock the history service constructor
    ExceptionHistoryService.mockImplementation(() => mockHistoryService);

    service = new ExceptionService(mockDb);
  });

  type SqlRecord<T> = T extends any[] ? T[0] : T;

  function createMockRecordSet<T>(records: T[]): IRecordSet<T> {
    return {
      toTable: () => ({ rows: records }),
      columns: {},
      ...records
    } as unknown as IRecordSet<T>;
  };

  function createMockResult<T>(records: T[]): IProcedureResult<SqlRecord<T>> {
    const recordset = createMockRecordSet(records);
    return {
      recordset,
      recordsets: [recordset],
      output: {},
      rowsAffected: [records.length],
      returnValue: 0
    } as unknown as IProcedureResult<SqlRecord<T>>;
  };

  type ExceptionSearchResponse = {
    id: number;
    payeeName: string;
    serviceRequestDate: string;
    transactionAmount: string;
    customerPayeeId: string;
    customerPayeeAccountNumber: string;
    confirmationNumber: string;
  };

  describe('searchExceptions', () => {
    it('should return paginated exceptions', async () => {
      const mockDate = new Date('2025-01-08T20:28:07-07:00');
      const mockException: ExceptionSearchResponse = {
        id: 1,
        payeeName: 'Test Payee',
        serviceRequestDate: mockDate.toISOString(),
        transactionAmount: '100.00',
        customerPayeeId: 'TEST123',
        customerPayeeAccountNumber: 'ACC123',
        confirmationNumber: 'CONF123'
      };

      const searchRequest: ExceptionSearchRequest = {
        page: 1,
        pageSize: 10
      };

      const mockResponse = {
        items: [mockException],
        total: 1,
        page: 1,
        pageSize: 10
      };
      
      mockDb.executeProc.mockResolvedValue(createMockResult([mockResponse]));

      const result = await service.searchExceptions(searchRequest);

      expect(result.success).toBe(true);
      expect(result.data?.items).toEqual([mockException]);
      expect(result.data?.total).toBe(1);
      expect(result.data?.page).toBe(1);
      expect(result.data?.pageSize).toBe(10);
      expect(mockDb.executeProc).toHaveBeenCalledWith(
        'PROC_FIS_EXCEPTION_SEARCH',
        {
          StartDate: undefined,
          EndDate: undefined,
          SponsorIds: null,
          CorrectionMade: undefined,
          PageNumber: 1,
          PageSize: 10
        }
      );
    });

    it('should throw error for invalid page number', async () => {
      await expect(
        service.searchExceptions({
          page: 0,
          pageSize: 10
        })
      ).rejects.toThrow(ExceptionError);
    });

    it('should throw error for invalid page size', async () => {
      await expect(
        service.searchExceptions({
          page: 1,
          pageSize: 0
        })
      ).rejects.toThrow(ExceptionError);
    });
  });

  describe('getException', () => {
    it('should return single exception', async () => {
      const mockDate = new Date('2025-01-08T20:28:07-07:00');
      const mockRecord = {
        id: 1,
        payeeName: 'Test Payee',
        serviceRequestDate: mockDate.toISOString(),
        transactionAmount: '100.00',
        customerPayeeId: 'TEST123',
        customerPayeeAccountNumber: 'ACC123',
        confirmationNumber: 'CONF123'
      };

      const mockResult: IProcedureResult<any> = createMockResult([mockRecord]);

      mockDb.executeProc.mockResolvedValueOnce(mockResult);

      const result = await service.getException(1);

      expect(result.success).toBe(true);
      expect(result.data!).toEqual({
        ...mockRecord,
        id: mockRecord.id,
        serviceRequestDate: new Date(mockRecord.serviceRequestDate)
      });
      expect(mockDb.executeProc).toHaveBeenCalledWith(
        'PROC_FIS_EXCEPTION_GET',
        { Id: 1 }
      );
    });

    it('should throw not found error for non-existent exception', async () => {
      const mockResult: IProcedureResult<any> = createMockResult([]);

      mockDb.executeProc.mockResolvedValueOnce(mockResult);

      await expect(service.getException(999)).rejects.toThrow(
        new ExceptionError(
          ExceptionErrorCodes.NOT_FOUND,
          404,
          'Exception with id 999 not found'
        )
      );
    });
  });

  describe('updateException', () => {
    const mockDate = new Date('2025-01-08T20:28:07-07:00');
    const mockException = {
      id: 1,
      serviceRequestDate: mockDate,
      correctionMade: false,
      correctionType: null,
      notes: null
    };

    it('should update exception and create history record', async () => {
      const updateRequest: ExceptionUpdateRequest = {
        id: 1,
        status: 'RESOLVED',
        resolution: 'MANUAL',
        notes: 'Test notes'
      };

      const beforeState = {
        success: true,
        data: {
          id: 1,
          serviceRequestDate: mockDate,
          correctionMade: false,
          correctionType: null,
          notes: null,
          createdAt: undefined,
          updatedAt: undefined
        }
      };

      const afterState = {
        success: true,
        data: {
          ...beforeState.data,
          ...updateRequest,
          serviceRequestDate: mockDate
        }
      };

      mockDb.executeProc
        .mockResolvedValueOnce(createMockResult([{ Success: true }]))
        .mockResolvedValueOnce(createMockResult([beforeState.data]))
        .mockResolvedValueOnce(createMockResult([afterState.data]));

      const result = await service.updateException(updateRequest);

      expect(result.success).toBe(true);
      expect(mockHistoryService.createHistory).toHaveBeenCalledWith({
        exceptionId: updateRequest.id,
        type: ExceptionHistoryType.UPDATED,
        details: {
          before: beforeState,
          after: afterState,
          changes: {
            status: updateRequest.status,
            resolution: updateRequest.resolution,
            notes: updateRequest.notes
          }
        }
      });
    });

    it('should throw error when update fails', async () => {
      const updateRequest: ExceptionUpdateRequest = {
        id: 1,
        status: 'RESOLVED',
        resolution: 'MANUAL',
        notes: 'Test notes'
      };

      mockDb.executeProc.mockResolvedValue(createMockResult([{ Success: false }]));

      await expect(service.updateException(updateRequest)).rejects.toThrow(
        new ExceptionError(
          ExceptionErrorCodes.DATABASE_ERROR,
          400,
          'Failed to update exception'
        )
      );
    });
  });

  describe('checkRefundAdjustment', () => {
    const mockDate = new Date('2025-01-08T20:28:07-07:00');
    const mockException = {
      id: 1,
      serviceRequestDate: mockDate
    };

    it('should check refund adjustment and create history record', async () => {
      const refundRequest: ExceptionRefundRequest = {
        exceptionId: 1,
        amount: 100.00
      };

      const mockRefundResult = {
        Success: true,
        Amount: 100.50,
        AdjustmentDate: mockDate,
        Status: 'COMPLETED',
        Reason: 'Approved'
      };

      mockDb.executeProc
        .mockResolvedValueOnce(createMockResult([mockException]))
        .mockResolvedValueOnce(createMockResult([mockRefundResult]));

      const result = await service.checkRefundAdjustment(refundRequest);

      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        success: true,
        amount: mockRefundResult.Amount,
        adjustmentDate: mockRefundResult.AdjustmentDate,
        status: mockRefundResult.Status,
        reason: mockRefundResult.Reason
      });

      expect(mockHistoryService.createHistory).toHaveBeenCalledWith({
        exceptionId: refundRequest.exceptionId,
        type: ExceptionHistoryType.REFUND_CHECKED,
        details: {
          paymentId: null,
          result: {
            success: mockRefundResult.Success,
            amount: mockRefundResult.Amount,
            adjustmentDate: mockRefundResult.AdjustmentDate,
            status: mockRefundResult.Status,
            reason: mockRefundResult.Reason
          }
        }
      });
    });
  });

  describe('sendNotification', () => {
    it('should send notification and create history record', async () => {
      const notificationRequest: ExceptionNotificationRequest = {
        exceptionId: 1,
        notificationType: 'EMAIL',
        recipients: ['test@example.com']
      };

      mockDb.executeProc.mockResolvedValue(createMockResult([{ Success: true }]));

      const result = await service.sendNotification(notificationRequest);

      expect(result.success).toBe(true);
      expect(mockHistoryService.createHistory).toHaveBeenCalledWith({
        exceptionId: notificationRequest.exceptionId,
        type: ExceptionHistoryType.NOTIFICATION_SENT,
        details: {
          notificationType: notificationRequest.notificationType,
          recipients: notificationRequest.recipients
        }
      });
    });

    it('should handle notification failure', async () => {
      const notificationRequest: ExceptionNotificationRequest = {
        exceptionId: 1,
        notificationType: 'EMAIL',
        recipients: ['test@example.com']
      };

      mockDb.executeProc.mockResolvedValue(createMockResult([{ Success: false }]));

      await expect(service.sendNotification(notificationRequest)).rejects.toThrow(
        new ExceptionError(
          ExceptionErrorCodes.DATABASE_ERROR,
          400,
          'Failed to send notification'
        )
      );

      expect(mockHistoryService.createHistory).not.toHaveBeenCalled();
    });
  });
});
