import { Database } from '@cbp-config-api/../config/db';
import { NotificationService } from '@cbp-config-api/notification.service';
import {
  NotificationType,
  NotificationTemplate,
  NotificationRequest,
  NotificationHistory
} from '@cbp-config-api/../types/notification';
import type { ServiceResponse } from '@cbp-config-api/../types/common';
import sql from 'mssql';

describe('NotificationService', () => {
  let service: NotificationService;
  let mockDb: jest.Mocked<Database>;
  const mockDate = new Date('2025-01-08T20:54:39-07:00');

  const createMockRecordSet = <T>(records: T[]): sql.IRecordSet<T> => {
    const base = Object.create(records);
    base.toTable = jest.fn();
    base.columns = {};
    return base as unknown as sql.IRecordSet<T>;
  };

  const createMockResult = <T>(records: T[]): sql.IProcedureResult<T> => {
    const recordset = createMockRecordSet(records);
    const result = {
      recordset,
      recordsets: [recordset] as unknown as T extends any[] ? { [P in keyof T]: sql.IRecordSet<T[P]> } : sql.IRecordSet<T>[],
      rowsAffected: [records.length],
      output: {},
      returnValue: 0
    };
    return result as sql.IProcedureResult<T>;
  };

  beforeEach(() => {
    mockDb = {
      executeProc: jest.fn(),
      executeProcWithTransaction: jest.fn(),
      executeStoredProcedure: jest.fn(),
      executeQuery: jest.fn(),
      beginTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      connect: jest.fn(),
      disconnect: jest.fn(),
      close: jest.fn()
    };
    service = new NotificationService(mockDb);
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  describe('sendNotification', () => {
    const mockRequest: NotificationRequest = {
      type: NotificationType.EMAIL,
      template: NotificationTemplate.EXCEPTION_UPDATED,
      recipients: [{ email: 'test@example.com', name: 'Test User' }],
      data: {
        exceptionId: 1,
        correctionType: 'MANUAL',
        notes: 'Test notes',
        userId: 'USER123',
        timestamp: new Date(mockDate)
      },
      userId: 'USER123'
    };

    it('should send email notification successfully', async () => {
      mockDb.executeProc.mockResolvedValueOnce(createMockResult([{ Id: 123 }]));

      const result = await service.sendNotification(mockRequest);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.id).toBe(123);
      expect(result.data?.type).toBe(NotificationType.EMAIL);
      expect(result.data?.template).toBe(NotificationTemplate.EXCEPTION_UPDATED);
      expect(result.data?.status).toBe('SENT');
      expect(mockDb.executeProc).toHaveBeenCalledWith('CreateNotificationHistory', {
        Type: NotificationType.EMAIL,
        Template: NotificationTemplate.EXCEPTION_UPDATED,
        Recipients: JSON.stringify(mockRequest.recipients),
        Data: JSON.stringify(mockRequest.data),
        UserId: mockRequest.userId,
        Status: 'SENT'
      });
    });

    it('should handle notification history creation failure', async () => {
      mockDb.executeProc.mockResolvedValueOnce(createMockResult([]));

      const result = await service.sendNotification(mockRequest);

      expect(result.success).toBe(false);
      expect(result.error).toEqual({
        code: 'NOTIFICATION_ERROR',
        message: 'Failed to create notification history record'
      });
    });

    it('should handle unsupported notification type', async () => {
      const invalidRequest = {
        ...mockRequest,
        type: 'INVALID' as NotificationType
      };

      const result = await service.sendNotification(invalidRequest);

      expect(result.success).toBe(false);
      expect(result.error).toEqual({
        code: 'NOTIFICATION_ERROR',
        message: 'Unsupported notification type: INVALID'
      });
    });
  });

  describe('searchNotificationHistory', () => {
    const mockHistoryRecord: NotificationHistory = {
      id: 1,
      type: NotificationType.EMAIL,
      template: NotificationTemplate.EXCEPTION_UPDATED,
      recipients: [{ email: 'test@example.com' }],
      data: { exceptionId: 1 },
      userId: 'USER123',
      status: 'SENT',
      createdAt: mockDate
    };

    it('should search notification history successfully', async () => {
      const mockDbResponse = {
        ...mockHistoryRecord,
        recipients: JSON.stringify(mockHistoryRecord.recipients),
        data: JSON.stringify(mockHistoryRecord.data),
        TotalCount: 1
      };

      mockDb.executeProc.mockResolvedValueOnce(createMockResult([mockDbResponse]));

      const result = await service.searchNotificationHistory({
        startDate: mockDate,
        endDate: mockDate,
        type: NotificationType.EMAIL,
        page: 1,
        pageSize: 10
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.length).toBe(1);
      expect(result.data?.[0]).toEqual(mockHistoryRecord);
      expect(result.totalCount).toBe(1);
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(10);
    });

    it('should handle search failure', async () => {
      mockDb.executeProc.mockRejectedValueOnce(new Error('Database error'));

      const result = await service.searchNotificationHistory({});

      expect(result.success).toBe(false);
      expect(result.error).toEqual({
        code: 'NOTIFICATION_ERROR',
        message: 'Database error'
      });
    });

    it('should use default pagination values', async () => {
      mockDb.executeProc.mockResolvedValueOnce(createMockResult([]));

      await service.searchNotificationHistory({});

      expect(mockDb.executeProc).toHaveBeenCalledWith('SearchNotificationHistory', {
        StartDate: null,
        EndDate: null,
        Type: null,
        Template: null,
        UserId: null,
        Status: null,
        Page: 1,
        PageSize: 10
      });
    });
  });
});
