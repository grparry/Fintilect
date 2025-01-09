import { Database } from '../../database';
import { ExceptionHistoryService } from '../exception-history.service';
import { ExceptionError, ExceptionErrorCodes } from '../../types/fis-exception';
import { ExceptionHistoryType } from '../../types/exception-history';
import { IResult, IRecordSet } from 'mssql';

jest.mock('../../database');
jest.mock('../../utils/logger');

describe('ExceptionHistoryService', () => {
  let service: ExceptionHistoryService;
  let mockDb: jest.Mocked<Database>;

  const createMockRecordSet = <T extends Record<string, any>>(records: T[]): IRecordSet<T> => {
    const arr = [...records];
    return Object.assign(arr, {
      toTable: jest.fn(),
      columns: {},
    }) as unknown as IRecordSet<T>;
  };

  beforeEach(() => {
    mockDb = {
      executeProc: jest.fn(),
      executeProcWithTransaction: jest.fn(),
      executeStoredProcedure: jest.fn(),
      executeQuery: jest.fn(),
      close: jest.fn(),
      connect: jest.fn(),
      disconnect: jest.fn(),
      getConnection: jest.fn(),
      transaction: jest.fn(),
      request: jest.fn(),
      beginTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn()
    } as unknown as jest.Mocked<Database>;
    service = new ExceptionHistoryService(mockDb);
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
      const mockResult: IResult<any> = {
        recordset: createMockRecordSet([mockHistoryRecord]),
        recordsets: [createMockRecordSet([mockHistoryRecord])],
        rowsAffected: [1],
        output: {}
      };

      mockDb.executeProc.mockResolvedValue(mockResult);

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
      expect(mockDb.executeProc).toHaveBeenCalledWith(
        'PROC_FIS_EXCEPTION_HISTORY_CREATE',
        {
          ExceptionId: 100,
          Type: ExceptionHistoryType.UPDATED,
          UserId: 'USER123',
          Details: JSON.stringify({
            before: { status: 'PENDING' },
            after: { status: 'COMPLETED' }
          })
        }
      );
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
      const mockResult: IResult<any> = {
        recordset: createMockRecordSet(mockHistoryRecords),
        recordsets: [createMockRecordSet(mockHistoryRecords)],
        rowsAffected: [2],
        output: {}
      };

      mockDb.executeProc.mockResolvedValue(mockResult);

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
      expect(mockDb.executeProc).toHaveBeenCalledWith(
        'PROC_FIS_EXCEPTION_HISTORY_SEARCH',
        {
          ExceptionId: 100,
          Types: JSON.stringify([ExceptionHistoryType.CREATED, ExceptionHistoryType.UPDATED]),
          StartDate: mockDate,
          EndDate: mockDate,
          UserId: 'USER123',
          PageNumber: 1,
          PageSize: 10
        }
      );
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
      const mockResult: IResult<any> = {
        recordset: createMockRecordSet([mockHistoryRecord]),
        recordsets: [createMockRecordSet([mockHistoryRecord])],
        rowsAffected: [1],
        output: {}
      };

      mockDb.executeProc.mockResolvedValue(mockResult);

      const result = await service.getHistoryById(1);

      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        ...mockHistoryRecord,
        timestamp: new Date(mockHistoryRecord.timestamp)
      });
      expect(mockDb.executeProc).toHaveBeenCalledWith(
        'PROC_FIS_EXCEPTION_HISTORY_GET',
        {
          Id: 1
        }
      );
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
      const mockResult: IResult<any> = {
        recordset: createMockRecordSet([]),
        recordsets: [createMockRecordSet([])],
        rowsAffected: [0],
        output: {}
      };

      mockDb.executeProc.mockResolvedValue(mockResult);

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
