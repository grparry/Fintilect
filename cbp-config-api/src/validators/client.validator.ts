import Joi from 'joi';

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

const CLIENT_TYPES = ['ENTERPRISE', 'SMB', 'STARTUP'] as const;
const CLIENT_STATUSES = ['ACTIVE', 'INACTIVE', 'SUSPENDED'] as const;
const CLIENT_ENVIRONMENTS = ['PRODUCTION', 'STAGING', 'DEVELOPMENT'] as const;
const DATE_FORMATS = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'] as const;
const TIME_FORMATS = ['12h', '24h'] as const;

export const clientSchemas = {
  listClientsQuery: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
    status: Joi.string().valid(...CLIENT_STATUSES),
    type: Joi.string().valid(...CLIENT_TYPES)
  }),

  clientIdParam: Joi.object({
    id: Joi.string().required().min(1)
  }),

  updateClientSettings: Joi.object({
    general: Joi.object({
      timezone: Joi.string(),
      dateFormat: Joi.string().valid(...DATE_FORMATS),
      timeFormat: Joi.string().valid(...TIME_FORMATS),
      currency: Joi.string().length(3),
      language: Joi.string().length(2)
    }).unknown(true),

    security: Joi.object({
      passwordPolicy: Joi.object({
        minLength: Joi.number().integer().min(8).max(32),
        requireUppercase: Joi.boolean(),
        requireLowercase: Joi.boolean(),
        requireNumbers: Joi.boolean(),
        requireSpecialChars: Joi.boolean(),
        expirationDays: Joi.number().integer().min(0)
      }).unknown(true),

      loginPolicy: Joi.object({
        maxAttempts: Joi.number().integer().min(1),
        lockoutDuration: Joi.number().integer().min(1)
      }).unknown(true),

      sessionTimeout: Joi.number().integer().min(1),
      mfaEnabled: Joi.boolean(),
      ipWhitelist: Joi.array().items(Joi.string().ip())
    }).unknown(true),

    notifications: Joi.object({
      emailEnabled: Joi.boolean(),
      smsEnabled: Joi.boolean(),
      pushEnabled: Joi.boolean(),
      frequency: Joi.string().valid('realtime', 'daily', 'weekly', 'monthly'),
      alertTypes: Joi.array().items(Joi.string().valid('payment', 'security', 'system'))
    }).unknown(true)
  }).unknown(true)
};
