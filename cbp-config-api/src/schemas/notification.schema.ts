import { z } from 'zod';
import { NotificationType, NotificationTemplate } from '../types/notification';

export const NotificationRecipientSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  name: z.string().optional()
}).refine(data => data.email || data.phone, {
  message: 'At least one of email or phone must be provided'
});

export const NotificationTemplateDataSchema = z.object({
  exceptionId: z.number().optional(),
  correctionType: z.string().optional(),
  notes: z.string().optional(),
  userId: z.string().optional(),
  timestamp: z.date().optional()
});

export const NotificationRequestSchema = z.object({
  type: z.nativeEnum(NotificationType),
  template: z.nativeEnum(NotificationTemplate),
  recipients: z.array(NotificationRecipientSchema).min(1),
  data: NotificationTemplateDataSchema,
  userId: z.string().optional() // Will be set by the controller from authenticated session
});

export const NotificationHistorySearchRequestSchema = z.object({
  startDate: z.string().datetime().optional().transform(val => val ? new Date(val) : undefined),
  endDate: z.string().datetime().optional().transform(val => val ? new Date(val) : undefined),
  type: z.nativeEnum(NotificationType).optional(),
  template: z.nativeEnum(NotificationTemplate).optional(),
  userId: z.string().optional(),
  status: z.enum(['SENT', 'FAILED']).optional(),
  page: z.string().optional().transform(val => val ? parseInt(val, 10) : undefined),
  pageSize: z.string().optional().transform(val => val ? parseInt(val, 10) : undefined)
});
