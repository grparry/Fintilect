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

const UTILITY_TYPES = ['ELECTRICITY', 'GAS', 'WATER', 'INTERNET', 'PHONE', 'CABLE', 'OTHER'] as const;
const UTILITY_STATUSES = ['ACTIVE', 'INACTIVE', 'PENDING', 'SUSPENDED'] as const;
const BILLING_CYCLES = ['MONTHLY', 'QUARTERLY', 'ANNUAL'] as const;
const PAYMENT_METHODS = ['ACH', 'WIRE', 'CHECK'] as const;

export const utilitySchemas = {
  healthCheck: Joi.object({
    service: Joi.string().optional()
  }),

  versionQuery: Joi.object({
    format: Joi.string().valid('short', 'full').optional()
  }),

  metricsQuery: Joi.object({
    period: Joi.string().valid('1h', '24h', '7d', '30d').optional().default('24h')
  }),

  logsQuery: Joi.object({
    level: Joi.string().valid('debug', 'info', 'warn', 'error').optional().default('info'),
    from: Joi.string().isoDate(),
    to: Joi.string().isoDate(),
    service: Joi.string().optional(),
    page: Joi.number().integer().min(1).optional().default(1),
    limit: Joi.number().integer().min(1).max(100).optional().default(20)
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

  deliveryDateQueryZod: Joi.object({
    orderDate: Joi.string().isoDate(),
    postalCode: Joi.string().pattern(/^\d{5}(-\d{4})?$/),
    serviceLevel: Joi.string().valid('STANDARD', 'EXPRESS', 'PRIORITY')
  }),

  listUtilities: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
    type: Joi.string().valid(...UTILITY_TYPES),
    status: Joi.string().valid(...UTILITY_STATUSES),
    search: Joi.string().max(100)
  }),

  getUtility: Joi.object({
    id: Joi.string().required()
  }),

  createUtility: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    type: Joi.string().valid(...UTILITY_TYPES).required(),
    provider: Joi.string().min(2).max(100).required(),
    accountNumber: Joi.string().max(50).required(),
    billingCycle: Joi.string().valid(...BILLING_CYCLES).required(),
    paymentMethod: Joi.string().valid(...PAYMENT_METHODS).required(),
    autopay: Joi.boolean().default(false),
    dueDay: Joi.number().integer().min(1).max(31).required(),
    payeeId: Joi.string().required(),
    serviceAddress: Joi.object({
      street1: Joi.string().required(),
      street2: Joi.string(),
      city: Joi.string().required(),
      state: Joi.string().length(2).required(),
      zipCode: Joi.string().pattern(/^\d{5}(-\d{4})?$/).required(),
      country: Joi.string().length(2).required()
    }).required(),
    billingAddress: Joi.object({
      street1: Joi.string().required(),
      street2: Joi.string(),
      city: Joi.string().required(),
      state: Joi.string().length(2).required(),
      zipCode: Joi.string().pattern(/^\d{5}(-\d{4})?$/).required(),
      country: Joi.string().length(2).required()
    }),
    metadata: Joi.object({
      department: Joi.string(),
      costCenter: Joi.string(),
      notes: Joi.string().max(1000)
    })
  }),

  updateUtility: Joi.object({
    name: Joi.string().min(2).max(100),
    provider: Joi.string().min(2).max(100),
    accountNumber: Joi.string().max(50),
    billingCycle: Joi.string().valid(...BILLING_CYCLES),
    paymentMethod: Joi.string().valid(...PAYMENT_METHODS),
    autopay: Joi.boolean(),
    dueDay: Joi.number().integer().min(1).max(31),
    status: Joi.string().valid(...UTILITY_STATUSES),
    serviceAddress: Joi.object({
      street1: Joi.string(),
      street2: Joi.string(),
      city: Joi.string(),
      state: Joi.string().length(2),
      zipCode: Joi.string().pattern(/^\d{5}(-\d{4})?$/),
      country: Joi.string().length(2)
    }),
    billingAddress: Joi.object({
      street1: Joi.string(),
      street2: Joi.string(),
      city: Joi.string(),
      state: Joi.string().length(2),
      zipCode: Joi.string().pattern(/^\d{5}(-\d{4})?$/),
      country: Joi.string().length(2)
    }),
    metadata: Joi.object({
      department: Joi.string(),
      costCenter: Joi.string(),
      notes: Joi.string().max(1000)
    })
  }).min(1),

  addBill: Joi.object({
    utilityId: Joi.string().required(),
    billDate: Joi.date().iso().required(),
    dueDate: Joi.date().iso().required(),
    amount: Joi.number().positive().required(),
    period: Joi.object({
      startDate: Joi.date().iso().required(),
      endDate: Joi.date().iso().required()
    }).required(),
    billNumber: Joi.string().max(50),
    metadata: Joi.object({
      usage: Joi.number().positive(),
      rate: Joi.number().positive(),
      notes: Joi.string().max(1000)
    })
  }),

  updateBill: Joi.object({
    utilityId: Joi.string().required(),
    billId: Joi.string().required(),
    billDate: Joi.date().iso(),
    dueDate: Joi.date().iso(),
    amount: Joi.number().positive(),
    period: Joi.object({
      startDate: Joi.date().iso(),
      endDate: Joi.date().iso()
    }),
    billNumber: Joi.string().max(50),
    metadata: Joi.object({
      usage: Joi.number().positive(),
      rate: Joi.number().positive(),
      notes: Joi.string().max(1000)
    })
  }).min(1),

  deleteBill: Joi.object({
    utilityId: Joi.string().required(),
    billId: Joi.string().required()
  }),

  getBillHistory: Joi.object({
    utilityId: Joi.string().required(),
    fromDate: Joi.date().iso(),
    toDate: Joi.date().iso(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20)
  }),

  savedEmailsQuery: Joi.object({
    type: Joi.string().optional(),
    status: Joi.string().optional()
  })
};
