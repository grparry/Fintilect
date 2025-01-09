import { api } from '../../../utils/api';
import { notificationTemplateService } from '../../notification-template.service';
import { NotificationTemplate, NotificationType, NotificationCategory } from '../../../types/bill-pay.types';

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
          },
        ],
        total: 1,
      };

      mockApi.get.mockResolvedValue({
        success: true,
        data: mockTemplates,
      });

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

      mockApi.get.mockResolvedValue({
        success: true,
        data: mockTemplate,
      });

      const result = await notificationTemplateService.getTemplate('1');
      expect(result).toEqual(mockTemplate);
      expect(mockApi.get).toHaveBeenCalledWith('/api/v1/notification-templates/1');
    });

    it('should create template', async () => {
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

      mockApi.post.mockResolvedValue({
        success: true,
        data: mockTemplate,
      });

      const result = await notificationTemplateService.createTemplate({
        name: 'Payment Confirmation',
        subject: 'Payment Confirmation',
        content: 'Your payment has been processed',
        type: NotificationType.PAYMENT_COMPLETED,
        category: NotificationCategory.PAYMENT,
        active: true,
      });

      expect(result).toEqual(mockTemplate);
      expect(mockApi.post).toHaveBeenCalledWith(
        '/api/v1/notification-templates',
        expect.any(Object)
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

      mockApi.put.mockResolvedValue({
        success: true,
        data: mockTemplate,
      });

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
      mockApi.delete.mockResolvedValue({
        success: true,
        data: undefined,
      });

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

      mockApi.post.mockResolvedValue({
        success: true,
        data: mockTemplate,
      });

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
      const mockPreview = {
        subject: 'Payment Confirmation for John',
        content: 'Your payment of $100 has been processed',
      };

      mockApi.post.mockResolvedValue({
        success: true,
        data: mockPreview,
      });

      const result = await notificationTemplateService.previewTemplate('1', {
        name: 'John',
        amount: '100',
      });

      expect(result).toEqual(mockPreview);
      expect(mockApi.post).toHaveBeenCalledWith(
        '/api/v1/notification-templates/1/preview',
        { variables: { name: 'John', amount: '100' } }
      );
    });

    it('should get available variables', async () => {
      const mockVariables = [
        { name: 'name', description: 'Recipient name' },
        { name: 'amount', description: 'Payment amount' },
      ];

      mockApi.get.mockResolvedValue({
        success: true,
        data: mockVariables,
      });

      const result = await notificationTemplateService.getAvailableVariables();
      expect(result).toEqual(mockVariables);
      expect(mockApi.get).toHaveBeenCalledWith('/api/v1/notification-templates/variables');
    });

    it('should validate template', async () => {
      const mockValidation = {
        isValid: true,
        errors: {},
      };

      mockApi.post.mockResolvedValue({
        success: true,
        data: mockValidation,
      });

      const result = await notificationTemplateService.validateTemplate({
        name: 'Payment Confirmation',
        subject: 'Payment Confirmation',
        content: 'Your payment has been processed',
        type: NotificationType.PAYMENT_COMPLETED,
        category: NotificationCategory.PAYMENT,
        active: true,
      });

      expect(result).toEqual(mockValidation);
      expect(mockApi.post).toHaveBeenCalledWith(
        '/api/v1/notification-templates/validate',
        expect.any(Object)
      );
    });

    it('should export templates', async () => {
      const mockBlob = new Blob(['test'], { type: 'text/csv' });

      mockApi.get.mockResolvedValue({
        success: true,
        data: mockBlob,
      });

      const result = await notificationTemplateService.exportTemplates({
        type: NotificationType.PAYMENT_COMPLETED,
      });

      expect(result).toEqual(mockBlob);
      expect(mockApi.get).toHaveBeenCalledWith(
        '/api/v1/notification-templates/export?type=PAYMENT_COMPLETED',
        { isBlob: true }
      );
    });

    it('should import templates', async () => {
      const mockImportResult = {
        imported: [
          {
            id: 1,
            name: 'Imported Template',
            subject: 'Test Subject',
            content: 'Test Body',
            type: NotificationType.PAYMENT_COMPLETED,
            category: NotificationCategory.PAYMENT,
            active: true,
            lastModified: '2024-01-09T00:00:00Z',
            createdAt: '2024-01-09T00:00:00Z',
            updatedAt: '2024-01-09T00:00:00Z',
          },
        ],
        errors: [],
      };

      mockApi.post.mockResolvedValue({
        success: true,
        data: mockImportResult,
      });

      const file = new File(['test'], 'templates.csv', { type: 'text/csv' });
      const result = await notificationTemplateService.importTemplates(file);

      expect(result).toEqual(mockImportResult);
      expect(mockApi.post).toHaveBeenCalledWith(
        '/api/v1/notification-templates/import',
        expect.any(FormData)
      );
    });

    it('should send test notification', async () => {
      const mockResponse = {
        success: true,
        message: 'Test notification sent successfully',
      };

      mockApi.post.mockResolvedValue({
        success: true,
        data: mockResponse,
      });

      const result = await notificationTemplateService.sendTestNotification(
        '1',
        'test@example.com'
      );

      expect(result).toEqual(mockResponse);
      expect(mockApi.post).toHaveBeenCalledWith(
        '/api/v1/notification-templates/1/test',
        { recipient: 'test@example.com' }
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors when getting templates', async () => {
      mockApi.get.mockResolvedValue({
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: 'Failed to fetch templates',
          details: { reason: 'Network error' }
        },
      });

      await expect(notificationTemplateService.getTemplates()).rejects.toThrow(
        'Failed to fetch templates'
      );
    });

    it('should handle validation errors when creating template', async () => {
      mockApi.post.mockResolvedValue({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid template data',
          details: { field: 'type', error: 'Invalid type' }
        },
      });

      await expect(
        notificationTemplateService.createTemplate({
          name: 'Test',
          subject: 'Test',
          content: 'Test',
          type: NotificationType.PAYMENT_COMPLETED,
          category: NotificationCategory.PAYMENT,
          active: true,
        })
      ).rejects.toThrow('Invalid template data');
    });

    it('should handle file format errors when importing templates', async () => {
      mockApi.post.mockResolvedValue({
        success: false,
        error: {
          code: 'IMPORT_ERROR',
          message: 'Invalid file format',
          details: { reason: 'Unsupported file type' }
        },
      });

      const file = new File(['test'], 'templates.csv', { type: 'text/csv' });
      await expect(notificationTemplateService.importTemplates(file)).rejects.toThrow(
        'Invalid file format'
      );
    });
  });
});
