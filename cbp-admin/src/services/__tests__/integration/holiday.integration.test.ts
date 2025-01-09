import { api, type ApiSuccessResponse } from '../../../utils/api';
import { holidayService } from '../../holiday.service';
import type { Holiday, HolidayInput } from '../../../types/bill-pay.types';

// Mock the API client
jest.mock('../../../utils/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn()
  }
}));

describe('HolidayService Integration Tests', () => {
  const mockHoliday: Holiday = {
    id: 1,
    name: 'New Year\'s Day',
    date: '2025-01-01',
    type: 'Federal',
    status: 'Active',
    createdAt: '2025-01-09T15:51:55-07:00',
    updatedAt: '2025-01-09T15:51:55-07:00'
  };

  const mockHolidayInput: HolidayInput = {
    name: 'New Year\'s Day',
    date: '2025-01-01',
    type: 'Federal',
    status: 'Active'
  };

  const mockHolidayList = {
    holidays: [mockHoliday],
    total: 1
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getHolidays', () => {
    it('should fetch holidays with filters', async () => {
      const filters = { year: 2025, month: 1, status: 'active' as const };
      const mockResponse: ApiSuccessResponse<typeof mockHolidayList> = { success: true, data: mockHolidayList };
      (api.get as jest.Mock).mockResolvedValueOnce(mockResponse);
      
      const result = await holidayService.getHolidays(filters);
      
      expect(api.get).toHaveBeenCalledWith('/system/holidays', { params: filters });
      expect(result).toEqual(mockHolidayList);
    });
  });

  describe('getHoliday', () => {
    it('should fetch a single holiday', async () => {
      const mockResponse: ApiSuccessResponse<Holiday> = { success: true, data: mockHoliday };
      (api.get as jest.Mock).mockResolvedValueOnce(mockResponse);
      
      const result = await holidayService.getHoliday(1);
      
      expect(api.get).toHaveBeenCalledWith('/system/holidays/1');
      expect(result).toEqual(mockHoliday);
    });
  });

  describe('createHoliday', () => {
    it('should create a new holiday', async () => {
      const mockResponse: ApiSuccessResponse<Holiday> = { success: true, data: mockHoliday };
      (api.post as jest.Mock).mockResolvedValueOnce(mockResponse);
      
      const result = await holidayService.createHoliday(mockHolidayInput);
      
      expect(api.post).toHaveBeenCalledWith('/system/holidays', mockHolidayInput);
      expect(result).toEqual(mockHoliday);
    });
  });

  describe('updateHoliday', () => {
    it('should update an existing holiday', async () => {
      const updateData = { status: 'Inactive' as const };
      const mockResponse: ApiSuccessResponse<Holiday> = { 
        success: true, 
        data: { ...mockHoliday, ...updateData } 
      };
      (api.patch as jest.Mock).mockResolvedValueOnce(mockResponse);
      
      const result = await holidayService.updateHoliday(1, updateData);
      
      expect(api.patch).toHaveBeenCalledWith('/system/holidays/1', updateData);
      expect(result).toEqual({ ...mockHoliday, ...updateData });
    });
  });

  describe('deleteHoliday', () => {
    it('should delete a holiday', async () => {
      await holidayService.deleteHoliday(1);
      
      expect(api.delete).toHaveBeenCalledWith('/system/holidays/1');
    });
  });

  describe('bulkCreateHolidays', () => {
    it('should create multiple holidays', async () => {
      const mockResponse: ApiSuccessResponse<Holiday[]> = { success: true, data: [mockHoliday] };
      (api.post as jest.Mock).mockResolvedValueOnce(mockResponse);
      
      const result = await holidayService.bulkCreateHolidays([mockHolidayInput]);
      
      expect(api.post).toHaveBeenCalledWith('/system/holidays/bulk', { holidays: [mockHolidayInput] });
      expect(result).toEqual([mockHoliday]);
    });
  });

  describe('bulkUpdateHolidays', () => {
    it('should update multiple holidays', async () => {
      const updates = [{ id: 1, data: { status: 'Inactive' as const } }];
      const mockResponse: ApiSuccessResponse<Holiday[]> = { 
        success: true, 
        data: [{ ...mockHoliday, status: 'Inactive' }] 
      };
      (api.patch as jest.Mock).mockResolvedValueOnce(mockResponse);
      
      const result = await holidayService.bulkUpdateHolidays(updates);
      
      expect(api.patch).toHaveBeenCalledWith('/system/holidays/bulk', { updates });
      expect(result).toEqual([{ ...mockHoliday, status: 'Inactive' }]);
    });
  });

  describe('bulkDeleteHolidays', () => {
    it('should delete multiple holidays', async () => {
      const ids = [1, 2, 3];
      await holidayService.bulkDeleteHolidays(ids);
      
      expect(api.delete).toHaveBeenCalledWith('/system/holidays/bulk', {
        headers: { 'Content-Type': 'application/json' },
        params: { ids: '1,2,3' }
      });
    });
  });

  describe('importHolidays', () => {
    it('should import holidays from a file', async () => {
      const file = new File(['test data'], 'holidays.csv', { type: 'text/csv' });
      const formData = new FormData();
      formData.append('file', file);
      const mockResponse: ApiSuccessResponse<Holiday[]> = { success: true, data: [mockHoliday] };
      (api.post as jest.Mock).mockResolvedValueOnce(mockResponse);
      
      const result = await holidayService.importHolidays(file);
      
      expect(api.post).toHaveBeenCalledWith('/system/holidays/import', expect.any(FormData), {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      expect(result).toEqual([mockHoliday]);
    });
  });

  describe('exportHolidays', () => {
    it('should export holidays as a blob', async () => {
      const mockBlob = new Blob(['test data'], { type: 'text/csv' });
      const mockResponse: ApiSuccessResponse<Blob> = { success: true, data: mockBlob };
      (api.get as jest.Mock).mockResolvedValueOnce(mockResponse);
      
      const result = await holidayService.exportHolidays();
      
      expect(api.get).toHaveBeenCalledWith('/system/holidays/export', { responseType: 'blob' });
      expect(result).toEqual(mockBlob);
    });
  });
});
