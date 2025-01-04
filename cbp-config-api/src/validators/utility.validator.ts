import Joi from 'joi';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     HealthCheck:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [healthy, unhealthy]
 *           description: Current health status
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Time of health check
 *         checks:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the check
 *               status:
 *                 type: string
 *                 enum: [pass, fail]
 *               responseTime:
 *                 type: number
 *                 description: Response time in milliseconds
 *       required:
 *         - status
 *         - timestamp
 *         - checks
 *     ApiMetrics:
 *       type: object
 *       properties:
 *         period:
 *           type: string
 *           enum: [1h, 24h, 7d, 30d]
 *           description: Time period of metrics
 *         requests:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               description: Total number of requests
 *             successful:
 *               type: integer
 *               description: Number of successful requests
 *             failed:
 *               type: integer
 *               description: Number of failed requests
 *         responseTime:
 *           type: object
 *           properties:
 *             avg:
 *               type: number
 *               description: Average response time in milliseconds
 *             p95:
 *               type: number
 *               description: 95th percentile response time
 *             p99:
 *               type: number
 *               description: 99th percentile response time
 *         endpoints:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               path:
 *                 type: string
 *               hits:
 *                 type: integer
 *               avgResponseTime:
 *                 type: number
 *       required:
 *         - period
 *         - requests
 *         - responseTime
 *     VersionInfo:
 *       type: object
 *       properties:
 *         version:
 *           type: string
 *           description: API version number
 *         buildNumber:
 *           type: string
 *           description: Build number
 *         buildDate:
 *           type: string
 *           format: date-time
 *           description: Build date and time
 *         environment:
 *           type: string
 *           enum: [development, staging, production]
 *           description: Current environment
 *         dependencies:
 *           type: object
 *           additionalProperties:
 *             type: string
 *           description: Dependency versions
 *       required:
 *         - version
 *         - buildNumber
 *         - buildDate
 *         - environment
 *     LogEntries:
 *       type: object
 *       properties:
 *         entries:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *               level:
 *                 type: string
 *                 enum: [debug, info, warn, error]
 *               message:
 *                 type: string
 *               service:
 *                 type: string
 *               metadata:
 *                 type: object
 *                 additionalProperties: true
 *         pagination:
 *           $ref: '#/components/schemas/Pagination'
 *       required:
 *         - entries
 *         - pagination
 */

export const utilitySchemas = {
  metricsQuery: z.object({
    period: z.enum(['1h', '24h', '7d', '30d'])
      .optional()
      .default('24h')
  }),

  logsQuery: z.object({
    level: z.enum(['debug', 'info', 'warn', 'error'])
      .optional()
      .default('info'),
    from: z.string().datetime(),
    to: z.string().datetime(),
    service: z.string().optional(),
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(20)
  }),

  deliveryDateQuery: Joi.object({
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso().min(Joi.ref('startDate')),
    paymentType: Joi.string().valid('ACH', 'WIRE', 'CHECK')
  }),

  nsfFeeQuery: Joi.object({
    accountType: Joi.string().valid('CHECKING', 'SAVINGS', 'MONEY_MARKET'),
    region: Joi.string().max(50)
  }),

  emailQuery: Joi.object({
    type: Joi.string().valid('PAYMENT', 'NOTIFICATION', 'ALERT', 'REMINDER'),
    status: Joi.string().valid('ACTIVE', 'INACTIVE', 'DRAFT')
  }),

  deliveryDateQueryZod: z.object({
    orderDate: z.string().datetime(),
    postalCode: z.string().regex(/^\d{5}(-\d{4})?$/),
    serviceLevel: z.enum(['STANDARD', 'EXPRESS', 'PRIORITY'])
  })
};
