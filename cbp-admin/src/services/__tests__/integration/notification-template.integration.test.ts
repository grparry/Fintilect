import { api } from '../../../utils/api';
import { notificationTemplateService } from '../../notification-template.service';
import { 
  NotificationType, 
  NotificationCategory,
  NotificationTemplate,
  NotificationTemplateInput,
  NotificationPreview,
  NotificationVariable,
  PaymentStatus
} from '../../../types/bill-pay.types';
import type { ApiSuccessResponse, ApiErrorResponse } from '../../../types/api.types';

jest.mock('../../../utils/api');

const mockApi = api as jest.Mocked<typeof api>;

describe('Notification Template Service Integration', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('Template Management', () => {
    it('should get templates with filters', async () => {
      const mockTemplates = {
        templates: [
          {
            id: 1,
            name: 'Payment Confirmation',
            subject: 'Payment Confirmation',
            content: 'Your payment has been processed',
            type: NotificationType.PAYMENT_COMPLETED,
            category: NotificationCategory.PAYMENT,
            active: true,
            lastModified: '2024-01-09T00:00:00Z',
            createdAt: '2024-01-09T00:00:00Z',
            updatedAt: '2024-01-09T00:00:00Z',
          } as NotificationTemplate,
        ],
        total: 1,
      };

      const mockResponse: ApiSuccessResponse<typeof mockTemplates> = {
        success: true,
        data: mockTemplates,
        message: 'Templates retrieved successfully'
      };

      mockApi.get.mockResolvedValue(mockResponse);

      const result = await notificationTemplateService.getTemplates({
        type: NotificationType.PAYMENT_COMPLETED,
        active: true,
      });

      expect(result).toEqual(mockTemplates);
      expect(mockApi.get).toHaveBeenCalledWith(
        '/api/v1/notification-templates?type=PAYMENT_COMPLETED&active=true'
      );
    });

    it('should get template by id', async () => {
      const mockTemplate: NotificationTemplate = {
        id: 1,
        name: 'Payment Confirmation',
        subject: 'Payment Confirmation',
        content: 'Your payment has been processed',
        type: NotificationType.PAYMENT_COMPLETED,
        category: NotificationCategory.PAYMENT,
        active: true,
        lastModified: '2024-01-09T00:00:00Z',
        createdAt: '2024-01-09T00:00:00Z',
        updatedAt: '2024-01-09T00:00:00Z',
      };

      const mockResponse: ApiSuccessResponse<NotificationTemplate> = {
        success: true,
        data: mockTemplate,
        message: 'Template retrieved successfully'
      };

      mockApi.get.mockResolvedValue(mockResponse);

      const result = await notificationTemplateService.getTemplate('1');
      expect(result).toEqual(mockTemplate);
      expect(mockApi.get).toHaveBeenCalledWith('/api/v1/notification-templates/1');
    });

    it('should create template', async () => {
      const templateInput: NotificationTemplateInput = {
        name: 'Payment Confirmation',
        subject: 'Payment Confirmation',
        content: 'Your payment has been processed',
        type: NotificationType.PAYMENT_COMPLETED,
        category: NotificationCategory.PAYMENT,
        active: true,
      };

      const mockTemplate: NotificationTemplate = {
        ...templateInput,
        id: 1,
        lastModified: '2024-01-09T00:00:00Z',
        createdAt: '2024-01-09T00:00:00Z',
        updatedAt: '2024-01-09T00:00:00Z',
      };

      const mockResponse: ApiSuccessResponse<NotificationTemplate> = {
        success: true,
        data: mockTemplate,
        message: 'Template created successfully'
      };

      mockApi.post.mockResolvedValue(mockResponse);

      const result = await notificationTemplateService.createTemplate(templateInput);

      expect(result).toEqual(mockTemplate);
      expect(mockApi.post).toHaveBeenCalledWith(
        '/api/v1/notification-templates',
        templateInput
      );
    });

    it('should update template', async () => {
      const mockTemplate: NotificationTemplate = {
        id: 1,
        name: 'Payment Confirmation Updated',
        subject: 'Payment Confirmation',
        content: 'Your payment has been processed',
        type: NotificationType.PAYMENT_COMPLETED,
        category: NotificationCategory.PAYMENT,
        active: true,
        lastModified: '2024-01-09T00:00:00Z',
        createdAt: '2024-01-09T00:00:00Z',
        updatedAt: '2024-01-09T00:00:00Z',
      };

      const mockResponse: ApiSuccessResponse<NotificationTemplate> = {
        success: true,
        data: mockTemplate,
        message: 'Template updated successfully'
      };

      mockApi.put.mockResolvedValue(mockResponse);

      const result = await notificationTemplateService.updateTemplate('1', {
        name: 'Payment Confirmation Updated',
      });

      expect(result).toEqual(mockTemplate);
      expect(mockApi.put).toHaveBeenCalledWith(
        '/api/v1/notification-templates/1',
        { name: 'Payment Confirmation Updated' }
      );
    });

    it('should delete template', async () => {
      const mockResponse: ApiSuccessResponse<void> = {
        success: true,
        data: undefined,
        message: 'Template deleted successfully'
      };

      mockApi.delete.mockResolvedValue(mockResponse);

      await notificationTemplateService.deleteTemplate('1');
      expect(mockApi.delete).toHaveBeenCalledWith('/api/v1/notification-templates/1');
    });

    it('should clone template', async () => {
      const mockTemplate: NotificationTemplate = {
        id: 2,
        name: 'Payment Confirmation Copy',
        subject: 'Payment Confirmation',
        content: 'Your payment has been processed',
        type: NotificationType.PAYMENT_COMPLETED,
        category: NotificationCategory.PAYMENT,
        active: true,
        lastModified: '2024-01-09T00:00:00Z',
        createdAt: '2024-01-09T00:00:00Z',
        updatedAt: '2024-01-09T00:00:00Z',
      };

      const mockResponse: ApiSuccessResponse<NotificationTemplate> = {
        success: true,
        data: mockTemplate,
        message: 'Template cloned successfully'
      };

      mockApi.post.mockResolvedValue(mockResponse);

      const result = await notificationTemplateService.cloneTemplate(
        '1',
        'Payment Confirmation Copy'
      );

      expect(result).toEqual(mockTemplate);
      expect(mockApi.post).toHaveBeenCalledWith(
        '/api/v1/notification-templates/1/clone',
        { name: 'Payment Confirmation Copy' }
      );
    });
  });

  describe('Template Operations', () => {
    it('should preview template', async () => {
      const previewResponse: NotificationPreview = {
        subject: 'Test Subject',
        content: 'Test Content',
        sampleData: {
          paymentId: '123',
          amount: '100',
          status: String(PaymentStatus.COMPLETED)
        }
      };

      const mockResponse: ApiSuccessResponse<NotificationPreview> = {
        success: true,
        data: previewResponse,
        message: 'Template preview generated successfully'
      };

      mockApi.post.mockResolvedValue(mockResponse);

      const result = await notificationTemplateService.previewTemplate('1', {
        customerName: 'John',
        amount: '100',
      });

      expect(result).toEqual(previewResponse);
      expect(mockApi.post).toHaveBeenCalledWith(
        '/api/v1/notification-templates/1/preview',
        { variables: { customerName: 'John', amount: '100' } }
      );
    });

    it('should get available variables', async () => {
      const mockVariables: NotificationVariable[] = [
        {
          name: 'customerName',
          description: 'Name of the customer',
          example: 'John Doe',
        },
        {
          name: 'amount',
          description: 'Payment amount',
          example: '$100.00',
        },
      ];

      const mockResponse: ApiSuccessResponse<NotificationVariable[]> = {
        success: true,
        data: mockVariables,
        message: 'Variables retrieved successfully'
      };

      mockApi.get.mockResolvedValue(mockResponse);

      const result = await notificationTemplateService.getAvailableVariables();
      expect(result).toEqual(mockVariables);
      expect(mockApi.get).toHaveBeenCalledWith('/api/v1/notification-templates/variables');
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors when getting templates', async () => {
      const errorResponse: ApiErrorResponse = {
        success: false,
        status: 404,
        error: {
          code: 'NOT_FOUND',
          message: 'Template not found',
          timestamp: new Date().toISOString()
        },
      };

      mockApi.get.mockRejectedValue(errorResponse);

      await expect(notificationTemplateService.getTemplates()).rejects.toThrow(
        'Template not found'
      );
    });
  });
});
