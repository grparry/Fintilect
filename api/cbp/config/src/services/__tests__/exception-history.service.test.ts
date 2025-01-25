import { ExceptionHistoryService } from '../exception-history.service';
import { ExceptionHistoryType } from '../../types/exception-history';
import { TestDatabase } from '../../config/test.db';
import { ExceptionError, ExceptionErrorCodes } from '../../types/fis-exception';
import { IResult, IRecordSet, IProcedureResult } from 'mssql';

jest.mock('../../utils/logger');

describe('ExceptionHistoryService', () => {
  let service: ExceptionHistoryService;
  let testDb: TestDatabase;

  beforeEach(() => {
    testDb = new TestDatabase();
    service = new ExceptionHistoryService(testDb);
  });

  describe('createHistory', () => {
    const mockDate = new Date('2025-01-08T20:28:07-07:00');
    const mockHistoryRecord = {
      id: 1,
      exceptionId: 100,
      type: ExceptionHistoryType.UPDATED,
      userId: 'USER123',
      timestamp: mockDate.toISOString(),
      details: {
        before: { status: 'PENDING' },
        after: { status: 'COMPLETED' }
      }
    };

    it('should create history record successfully', async () => {
      testDb.setMockResponse('sp_CreateExceptionHistory', async () => ({
        recordset: [mockHistoryRecord],
        recordsets: [[mockHistoryRecord]],
        rowsAffected: [1],
        output: {},
        returnValue: 0
      }));

      const result = await service.createHistory({
        exceptionId: 100,
        type: ExceptionHistoryType.UPDATED,
        userId: 'USER123',
        details: {
          before: { status: 'PENDING' },
          after: { status: 'COMPLETED' }
        }
      });
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockHistoryRecord);
    });

    it('should throw error for missing exception ID', async () => {
      await expect(
        service.createHistory({
          exceptionId: 0,
          type: ExceptionHistoryType.UPDATED,
          userId: 'USER123',
          details: {}
        })
      ).rejects.toThrow(
        new ExceptionError(
          ExceptionErrorCodes.INVALID_REQUEST,
          400,
          'Exception ID is required'
        )
      );
    });

    it('should throw error for missing type', async () => {
      await expect(
        service.createHistory({
          exceptionId: 100,
          type: undefined as any,
          userId: 'USER123',
          details: {}
        })
      ).rejects.toThrow(
        new ExceptionError(
          ExceptionErrorCodes.INVALID_REQUEST,
          400,
          'History type is required'
        )
      );
    });

    it('should throw error for missing user ID', async () => {
      await expect(
        service.createHistory({
          exceptionId: 100,
          type: ExceptionHistoryType.UPDATED,
          userId: '',
          details: {}
        })
      ).rejects.toThrow(
        new ExceptionError(
          ExceptionErrorCodes.INVALID_REQUEST,
          400,
          'User ID is required'
        )
      );
    });

    it('should handle database errors', async () => {
      testDb.setMockResponse('sp_CreateExceptionHistory', async () => {
        throw new Error('Database error');
      });

      const result = await service.createHistory(mockHistoryRecord);
      expect(result.success).toBe(false);
    });
  });

  describe('searchHistory', () => {
    const mockDate = new Date('2025-01-08T20:28:07-07:00');
    const mockHistoryRecords = [
      {
        id: 1,
        exceptionId: 100,
        type: ExceptionHistoryType.CREATED,
        userId: 'USER123',
        timestamp: mockDate.toISOString(),
        details: {},
        TotalCount: 2
      },
      {
        id: 2,
        exceptionId: 100,
        type: ExceptionHistoryType.UPDATED,
        userId: 'USER123',
        timestamp: mockDate.toISOString(),
        details: {
          before: { status: 'PENDING' },
          after: { status: 'COMPLETED' }
        },
        TotalCount: 2
      }
    ];

    it('should search history records successfully', async () => {
      testDb.setMockResponse('sp_SearchExceptionHistory', async () => ({
        recordset: mockHistoryRecords,
        recordsets: [mockHistoryRecords],
        rowsAffected: [2],
        output: {},
        returnValue: 0
      }));

      const result = await service.searchHistory({
        exceptionId: 100,
        type: [ExceptionHistoryType.CREATED, ExceptionHistoryType.UPDATED],
        startDate: mockDate,
        endDate: mockDate,
        userId: 'USER123',
        page: 1,
        pageSize: 10
      });

      expect(result.success).toBe(true);
      expect(result.data?.data).toHaveLength(2);
      expect(result.data?.pagination).toEqual({
        total: 2,
        page: 1,
        pageSize: 10
      });
    });

    it('should throw error for invalid page number', async () => {
      await expect(
        service.searchHistory({
          page: 0,
          pageSize: 10
        })
      ).rejects.toThrow(
        new ExceptionError(
          ExceptionErrorCodes.INVALID_REQUEST,
          400,
          'Invalid page number'
        )
      );
    });

    it('should throw error for invalid page size', async () => {
      await expect(
        service.searchHistory({
          page: 1,
          pageSize: 101
        })
      ).rejects.toThrow(
        new ExceptionError(
          ExceptionErrorCodes.INVALID_REQUEST,
          400,
          'Invalid page size'
        )
      );
    });
  });

  describe('getHistoryById', () => {
    const mockDate = new Date('2025-01-08T20:28:07-07:00');
    const mockHistoryRecord = {
      id: 1,
      exceptionId: 100,
      type: ExceptionHistoryType.UPDATED,
      userId: 'USER123',
      timestamp: mockDate.toISOString(),
      details: {
        before: { status: 'PENDING' },
        after: { status: 'COMPLETED' }
      }
    };

    it('should get history record by ID successfully', async () => {
      testDb.setMockResponse('sp_GetExceptionHistory', async () => ({
        recordset: [mockHistoryRecord],
        recordsets: [[mockHistoryRecord]],
        rowsAffected: [1],
        output: {},
        returnValue: 0
      }));

      const result = await service.getHistoryById(1);

      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        ...mockHistoryRecord,
        timestamp: new Date(mockHistoryRecord.timestamp)
      });
    });

    it('should throw error for missing history ID', async () => {
      await expect(
        service.getHistoryById(0)
      ).rejects.toThrow(
        new ExceptionError(
          ExceptionErrorCodes.INVALID_REQUEST,
          400,
          'History ID is required'
        )
      );
    });

    it('should throw error for non-existent history record', async () => {
      testDb.setMockResponse('sp_GetExceptionHistory', async () => ({
        recordset: [],
        recordsets: [[]],
        rowsAffected: [0],
        output: {},
        returnValue: 0
      }));

      await expect(
        service.getHistoryById(999)
      ).rejects.toThrow(
        new ExceptionError(
          ExceptionErrorCodes.NOT_FOUND,
          404,
          'History record with id 999 not found'
        )
      );
    });
  });
});
