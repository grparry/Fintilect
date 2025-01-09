import { api } from '../../../utils/api';
import { payeeConversionService } from '../../payee-conversion.service';
import { PayeeConversionStatus } from '../../../types/bill-pay.types';

jest.mock('../../../utils/api');

const mockApi = api as jest.Mocked<typeof api>;

describe('Payee Conversion Service Integration', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('File Management', () => {
    it('should get files with filters', async () => {
      const mockFiles = {
        files: [
          {
            id: 'file-1',
            name: 'test.csv',
            status: PayeeConversionStatus.PENDING,
            createdAt: '2025-01-09T12:00:00Z',
            totalRecords: 100,
            processedRecords: 0
          }
        ],
        total: 1
      };

      mockApi.get.mockResolvedValue({
        success: true,
        data: mockFiles
      });

      const result = await payeeConversionService.getFiles({
        status: PayeeConversionStatus.PENDING
      });

      expect(result).toEqual(mockFiles);
      expect(mockApi.get).toHaveBeenCalledWith(
        '/api/v1/payee-conversion?status=PENDING'
      );
    });

    it('should get file by id', async () => {
      const mockFile = {
        id: 'file-1',
        name: 'test.csv',
        status: PayeeConversionStatus.PENDING,
        createdAt: '2025-01-09T12:00:00Z',
        totalRecords: 100,
        processedRecords: 0
      };

      mockApi.get.mockResolvedValue({
        success: true,
        data: mockFile
      });

      const result = await payeeConversionService.getFileById('file-1');
      expect(result).toEqual(mockFile);
      expect(mockApi.get).toHaveBeenCalledWith('/api/v1/payee-conversion/file-1');
    });

    it('should upload file', async () => {
      const mockFile = {
        id: 'file-1',
        name: 'test.csv',
        status: PayeeConversionStatus.PENDING,
        createdAt: '2025-01-09T12:00:00Z',
        totalRecords: 0,
        processedRecords: 0
      };

      mockApi.post.mockResolvedValue({
        success: true,
        data: mockFile
      });

      const file = new File(['test'], 'test.csv', { type: 'text/csv' });
      const result = await payeeConversionService.uploadFile(file, 'template-1');

      expect(result).toEqual(mockFile);
      expect(mockApi.post).toHaveBeenCalledWith(
        '/api/v1/payee-conversion/upload',
        expect.any(FormData)
      );
    });
  });

  describe('File Processing', () => {
    it('should validate file', async () => {
      const mockValidation = {
        valid: true,
        errors: [],
        warnings: []
      };

      mockApi.post.mockResolvedValue({
        success: true,
        data: mockValidation
      });

      const result = await payeeConversionService.validateFile('file-1');
      expect(result).toEqual(mockValidation);
      expect(mockApi.post).toHaveBeenCalledWith('/api/v1/payee-conversion/file-1/validate', {});
    });

    it('should process file', async () => {
      mockApi.post.mockResolvedValue({
        success: true,
        data: undefined
      });

      await payeeConversionService.processFile('file-1');
      expect(mockApi.post).toHaveBeenCalledWith('/api/v1/payee-conversion/file-1/process', {});
    });

    it('should get file progress', async () => {
      const mockProgress = {
        status: PayeeConversionStatus.PROCESSING,
        totalRecords: 100,
        processedRecords: 50,
        errors: 0
      };

      mockApi.get.mockResolvedValue({
        success: true,
        data: mockProgress
      });

      const result = await payeeConversionService.getFileProgress('file-1');
      expect(result).toEqual(mockProgress);
      expect(mockApi.get).toHaveBeenCalledWith('/api/v1/payee-conversion/file-1/progress');
    });
  });

  describe('Records and Templates', () => {
    it('should get file records with pagination', async () => {
      const mockRecords = {
        records: [
          {
            id: 'record-1',
            data: { name: 'Test Payee', accountNumber: '123456' },
            status: PayeeConversionStatus.PENDING,
            errors: []
          }
        ],
        total: 1
      };

      mockApi.get.mockResolvedValue({
        success: true,
        data: mockRecords
      });

      const result = await payeeConversionService.getFileRecords('file-1', 1, 10);
      expect(result).toEqual(mockRecords);
      expect(mockApi.get).toHaveBeenCalledWith(
        '/api/v1/payee-conversion/file-1/records?page=1&limit=10'
      );
    });

    it('should get templates', async () => {
      const mockTemplates = [
        {
          id: 'template-1',
          name: 'Default Template',
          fields: ['name', 'accountNumber']
        }
      ];

      mockApi.get.mockResolvedValue({
        success: true,
        data: mockTemplates
      });

      const result = await payeeConversionService.getTemplates();
      expect(result).toEqual(mockTemplates);
      expect(mockApi.get).toHaveBeenCalledWith('/api/v1/payee-conversion/templates');
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors when getting files', async () => {
      mockApi.get.mockResolvedValue({
        success: false,
        error: {
          code: '500',
          message: 'Internal Server Error'
        }
      });

      await expect(payeeConversionService.getFiles()).rejects.toThrow('Internal Server Error');
    });

    it('should handle API errors when uploading file', async () => {
      mockApi.post.mockResolvedValue({
        success: false,
        error: {
          code: '400',
          message: 'Invalid file format'
        }
      });

      const file = new File(['test'], 'test.csv', { type: 'text/csv' });
      await expect(payeeConversionService.uploadFile(file, 'template-1')).rejects.toThrow('Invalid file format');
    });

    it('should handle API errors when processing file', async () => {
      mockApi.post.mockResolvedValue({
        success: false,
        error: {
          code: '404',
          message: 'File not found'
        }
      });

      await expect(payeeConversionService.processFile('file-1')).rejects.toThrow('File not found');
    });
  });
});
