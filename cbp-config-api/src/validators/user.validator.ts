import Joi from 'joi';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique user identifier
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         firstName:
 *           type: string
 *           description: User's first name
 *         lastName:
 *           type: string
 *           description: User's last name
 *         role:
 *           type: string
 *           enum: [ADMIN, USER, VIEWER]
 *           description: User's role
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE, PENDING]
 *           description: Account status
 *         lastLogin:
 *           type: string
 *           format: date-time
 *           description: Last login timestamp
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Account creation timestamp
 *       required:
 *         - id
 *         - email
 *         - firstName
 *         - lastName
 *         - role
 *         - status
 *     UpdateUser:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: User's first name
 *         lastName:
 *           type: string
 *           description: User's last name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *     UserPreferences:
 *       type: object
 *       properties:
 *         theme:
 *           type: string
 *           enum: [light, dark, system]
 *           description: UI theme preference
 *         notifications:
 *           type: object
 *           properties:
 *             email:
 *               type: boolean
 *               description: Email notifications enabled
 *             push:
 *               type: boolean
 *               description: Push notifications enabled
 *             types:
 *               type: array
 *               items:
 *                 type: string
 *                 enum: [PAYMENT, SYSTEM, SECURITY]
 *         timezone:
 *           type: string
 *           description: Preferred timezone
 *         language:
 *           type: string
 *           description: Preferred language code
 *         dateFormat:
 *           type: string
 *           description: Preferred date format
 *       required:
 *         - theme
 *         - notifications
 *         - timezone
 *         - language
 *     UpdateUserPreferences:
 *       type: object
 *       properties:
 *         theme:
 *           type: string
 *           enum: [light, dark, system]
 *         notifications:
 *           type: object
 *           properties:
 *             email:
 *               type: boolean
 *             push:
 *               type: boolean
 *             types:
 *               type: array
 *               items:
 *                 type: string
 *                 enum: [PAYMENT, SYSTEM, SECURITY]
 *         timezone:
 *           type: string
 *         language:
 *           type: string
 *         dateFormat:
 *           type: string
 */

export const userSchemas = {
  updatePayeeOptions: Joi.object({
    defaultPaymentMethod: Joi.string().valid('ACH', 'CHECK').required(),
    defaultDeliveryMethod: Joi.string().valid('MAIL', 'EMAIL', 'PICKUP').required(),
    defaultPaymentFrequency: Joi.string().valid('ONCE', 'WEEKLY', 'BIWEEKLY', 'MONTHLY'),
    defaultMemo: Joi.string().max(255),
    notificationPreferences: Joi.object({
      email: Joi.boolean(),
      sms: Joi.boolean(),
      push: Joi.boolean()
    }),
    paymentLimits: Joi.object({
      singlePayment: Joi.number().positive(),
      dailyLimit: Joi.number().positive(),
      monthlyLimit: Joi.number().positive()
    }),
    autoScheduleEnabled: Joi.boolean(),
    reminderDays: Joi.number().min(0).max(30)
  }),

  updateUser: z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    email: z.string().email().optional()
  }).refine(data => Object.keys(data).length > 0, {
    message: "At least one field must be provided"
  }),

  updatePreferences: z.object({
    theme: z.enum(['light', 'dark', 'system']).optional(),
    notifications: z.object({
      email: z.boolean().optional(),
      push: z.boolean().optional(),
      types: z.array(z.enum(['PAYMENT', 'SYSTEM', 'SECURITY'])).optional()
    }).optional(),
    timezone: z.string().optional(),
    language: z.string().length(2).optional(),
    dateFormat: z.string().optional()
  }).refine(data => Object.keys(data).length > 0, {
    message: "At least one preference must be provided"
  })
};
