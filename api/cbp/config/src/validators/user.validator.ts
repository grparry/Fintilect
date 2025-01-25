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

const USER_ROLES = ['ADMIN', 'USER', 'VIEWER'] as const;
const THEME_OPTIONS = ['light', 'dark', 'system'] as const;
const NOTIFICATION_TYPES = ['payment', 'security', 'system', 'maintenance'] as const;

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

  updateUser: Joi.object({
    firstName: Joi.string().min(2).max(50),
    lastName: Joi.string().min(2).max(50),
    email: Joi.string().email(),
    role: Joi.string().valid(...USER_ROLES)
  }).min(1),

  updatePreferences: Joi.object({
    theme: Joi.string().valid(...THEME_OPTIONS),
    notifications: Joi.object({
      email: Joi.boolean(),
      push: Joi.boolean(),
      types: Joi.array().items(Joi.string().valid(...NOTIFICATION_TYPES))
    }),
    timezone: Joi.string(),
    language: Joi.string().length(2),
    dateFormat: Joi.string().valid('MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'),
    timeFormat: Joi.string().valid('12h', '24h'),
    currency: Joi.string().length(3)
  }).min(1),

  changePassword: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string()
      .min(8)
      .max(128)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .required()
      .messages({
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      }),
    confirmPassword: Joi.string()
      .valid(Joi.ref('newPassword'))
      .required()
      .messages({
        'any.only': 'Passwords do not match'
      })
  }),

  resetPassword: Joi.object({
    token: Joi.string().required(),
    newPassword: Joi.string()
      .min(8)
      .max(128)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .required()
      .messages({
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      }),
    confirmPassword: Joi.string()
      .valid(Joi.ref('newPassword'))
      .required()
      .messages({
        'any.only': 'Passwords do not match'
      })
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    rememberMe: Joi.boolean()
  }),

  forgotPassword: Joi.object({
    email: Joi.string().email().required()
  })
};
