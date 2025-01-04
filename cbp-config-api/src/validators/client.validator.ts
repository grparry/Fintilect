import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique client identifier
 *         name:
 *           type: string
 *           description: Client name
 *         type:
 *           type: string
 *           enum: [ENTERPRISE, SMB, STARTUP]
 *           description: Client type
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE, SUSPENDED]
 *           description: Client status
 *         environment:
 *           type: string
 *           enum: [PRODUCTION, STAGING, DEVELOPMENT]
 *           description: Client environment
 *       required:
 *         - id
 *         - name
 *         - type
 *         - status
 *         - environment
 *     ClientSettings:
 *       type: object
 *       properties:
 *         general:
 *           type: object
 *           properties:
 *             timezone:
 *               type: string
 *               description: Client timezone (IANA format)
 *             dateFormat:
 *               type: string
 *               enum: [MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD]
 *               description: Date format preference
 *             timeFormat:
 *               type: string
 *               enum: [12h, 24h]
 *               description: Time format preference
 *             currency:
 *               type: string
 *               description: ISO currency code
 *             language:
 *               type: string
 *               description: ISO language code
 *         security:
 *           type: object
 *           properties:
 *             passwordPolicy:
 *               type: object
 *               properties:
 *                 minLength:
 *                   type: integer
 *                   minimum: 8
 *                   maximum: 32
 *                   description: Minimum password length
 *                 requireUppercase:
 *                   type: boolean
 *                   description: Require uppercase characters
 *                 requireLowercase:
 *                   type: boolean
 *                   description: Require lowercase characters
 *                 requireNumbers:
 *                   type: boolean
 *                   description: Require numeric characters
 *                 requireSpecialChars:
 *                   type: boolean
 *                   description: Require special characters
 *                 expirationDays:
 *                   type: integer
 *                   minimum: 0
 *                   description: Password expiration in days (0 for never)
 *             loginPolicy:
 *               type: object
 *               properties:
 *                 maxAttempts:
 *                   type: integer
 *                   minimum: 1
 *                   description: Maximum login attempts before lockout
 *                 lockoutDuration:
 *                   type: integer
 *                   minimum: 1
 *                   description: Account lockout duration in minutes
 *             sessionTimeout:
 *               type: integer
 *               minimum: 1
 *               description: Session timeout in minutes
 *             mfaEnabled:
 *               type: boolean
 *               description: Multi-factor authentication enabled
 *             ipWhitelist:
 *               type: array
 *               items:
 *                 type: string
 *               description: List of allowed IP addresses
 *         notifications:
 *           type: object
 *           properties:
 *             emailEnabled:
 *               type: boolean
 *               description: Email notifications enabled
 *             smsEnabled:
 *               type: boolean
 *               description: SMS notifications enabled
 *             pushEnabled:
 *               type: boolean
 *               description: Push notifications enabled
 *             frequency:
 *               type: string
 *               enum: [realtime, daily, weekly, monthly]
 *               description: Notification frequency
 *             alertTypes:
 *               type: array
 *               items:
 *                 type: string
 *                 enum: [payment, security, system]
 *               description: Types of alerts to receive
 */

export const clientSchemas = {
  listClientsQuery: z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(20),
    status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']).optional(),
    type: z.enum(['ENTERPRISE', 'SMB', 'STARTUP']).optional()
  }),

  clientIdParam: z.object({
    id: z.string().min(1)
  }),

  updateClientSettings: z.object({
    general: z.object({
      timezone: z.string(),
      dateFormat: z.enum(['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']),
      timeFormat: z.enum(['12h', '24h']),
      currency: z.string().length(3),
      language: z.string().length(2)
    }).partial(),

    security: z.object({
      passwordPolicy: z.object({
        minLength: z.number().int().min(8).max(32),
        requireUppercase: z.boolean(),
        requireLowercase: z.boolean(),
        requireNumbers: z.boolean(),
        requireSpecialChars: z.boolean(),
        expirationDays: z.number().int().min(0)
      }).partial(),

      loginPolicy: z.object({
        maxAttempts: z.number().int().min(1),
        lockoutDuration: z.number().int().min(1)
      }).partial(),

      sessionTimeout: z.number().int().min(1),
      mfaEnabled: z.boolean(),
      ipWhitelist: z.array(z.string().ip())
    }).partial(),

    notifications: z.object({
      emailEnabled: z.boolean(),
      smsEnabled: z.boolean(),
      pushEnabled: z.boolean(),
      frequency: z.enum(['realtime', 'daily', 'weekly', 'monthly']),
      alertTypes: z.array(z.enum(['payment', 'security', 'system']))
    }).partial()
  }).partial()
};
