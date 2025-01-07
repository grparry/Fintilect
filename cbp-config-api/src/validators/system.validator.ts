import Joi from 'joi';

/**
 * @openapi
 * components:
 *   schemas:
 *     CalendarDate:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *           description: Calendar date
 *         isBusinessDay:
 *           type: boolean
 *           description: Whether this is a business day
 *         isHoliday:
 *           type: boolean
 *           description: Whether this is a holiday
 *         holidayName:
 *           type: string
 *           description: Name of the holiday if applicable
 *       required:
 *         - date
 *         - isBusinessDay
 *         - isHoliday
 *     Holiday:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *           description: Holiday date
 *         name:
 *           type: string
 *           description: Holiday name
 *         type:
 *           type: string
 *           enum: [BANK, FEDERAL]
 *           description: Type of holiday
 *         description:
 *           type: string
 *           description: Holiday description
 *       required:
 *         - date
 *         - name
 *         - type
 *     SystemStatus:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [HEALTHY, DEGRADED, DOWN]
 *           description: Overall system status
 *         version:
 *           type: string
 *           description: System version
 *         uptime:
 *           type: number
 *           description: System uptime in seconds
 *         lastUpdate:
 *           type: string
 *           format: date-time
 *           description: Last system update time
 *         metrics:
 *           type: object
 *           properties:
 *             cpu:
 *               type: number
 *               description: CPU usage percentage
 *             memory:
 *               type: number
 *               description: Memory usage percentage
 *             activeConnections:
 *               type: integer
 *               description: Number of active connections
 *       required:
 *         - status
 *         - version
 *         - uptime
 *         - lastUpdate
 *     ErrorSummary:
 *       type: object
 *       properties:
 *         period:
 *           type: object
 *           properties:
 *             from:
 *               type: string
 *               format: date-time
 *             to:
 *               type: string
 *               format: date-time
 *         totalErrors:
 *           type: integer
 *         bySeverity:
 *           type: object
 *           properties:
 *             info:
 *               type: integer
 *             warn:
 *               type: integer
 *             error:
 *               type: integer
 *             critical:
 *               type: integer
 *         topErrors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               count:
 *                 type: integer
 *               severity:
 *                 type: string
 *                 enum: [INFO, WARN, ERROR, CRITICAL]
 *               lastOccurrence:
 *                 type: string
 *                 format: date-time
 */

const HOLIDAY_TYPES = ['BANK', 'FEDERAL', 'ALL'] as const;
const ERROR_SEVERITIES = ['INFO', 'WARN', 'ERROR', 'CRITICAL'] as const;

export const systemSchemas = {
  calendarQuery: Joi.object({
    year: Joi.number().integer().min(2000).max(2100).required(),
    month: Joi.number().integer().min(1).max(12)
  }),

  holidayQuery: Joi.object({
    year: Joi.number().integer().min(2000).max(2100).required(),
    type: Joi.string().valid(...HOLIDAY_TYPES).default('ALL')
  }),

  statusQuery: Joi.object({
    service: Joi.string().optional(),
    detail: Joi.boolean().optional()
  }),

  errorQuery: Joi.object({
    from: Joi.date().iso().required(),
    to: Joi.date().iso().required(),
    severity: Joi.string().valid(...ERROR_SEVERITIES).default('ERROR')
  }),

  getHolidays: Joi.object({
    year: Joi.number().integer().min(2000).max(2100).required(),
    month: Joi.number().integer().min(1).max(12),
    type: Joi.string().valid(...HOLIDAY_TYPES).default('ALL')
  }),

  addHoliday: Joi.object({
    name: Joi.string().required().max(100),
    date: Joi.date().iso().required(),
    type: Joi.string().valid(...HOLIDAY_TYPES).required(),
    description: Joi.string().max(500)
  }),

  updateHoliday: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().max(100),
    date: Joi.date().iso(),
    type: Joi.string().valid(...HOLIDAY_TYPES),
    description: Joi.string().max(500)
  }).min(1),

  deleteHoliday: Joi.object({
    id: Joi.string().required()
  }),

  getSystemErrors: Joi.object({
    from: Joi.date().iso().required(),
    to: Joi.date().iso().required(),
    severity: Joi.string().valid(...ERROR_SEVERITIES).default('ERROR'),
    service: Joi.string(),
    component: Joi.string(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20)
  }),

  getErrorSummary: Joi.object({
    from: Joi.date().iso().required(),
    to: Joi.date().iso().required(),
    severity: Joi.string().valid(...ERROR_SEVERITIES).default('ERROR')
  }),

  getSystemMetrics: Joi.object({
    from: Joi.date().iso().required(),
    to: Joi.date().iso().required(),
    metrics: Joi.array().items(Joi.string().valid(
      'cpu_usage',
      'memory_usage',
      'disk_usage',
      'network_io',
      'api_latency',
      'error_rate',
      'request_rate'
    )).min(1).required()
  }),

  getSystemHealth: Joi.object({
    components: Joi.array().items(Joi.string().valid(
      'database',
      'cache',
      'queue',
      'storage',
      'api'
    )).default(['database', 'api'])
  })
};
