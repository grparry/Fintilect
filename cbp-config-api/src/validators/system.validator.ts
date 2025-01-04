import { z } from 'zod';

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

export const systemSchemas = {
  calendarQuery: z.object({
    year: z.coerce
      .number()
      .int()
      .min(2020)
      .max(2030),
    month: z.coerce
      .number()
      .int()
      .min(1)
      .max(12)
      .optional()
  }),

  holidayQuery: z.object({
    year: z.coerce
      .number()
      .int()
      .min(2020)
      .max(2030),
    type: z.enum(['BANK', 'FEDERAL', 'ALL'])
      .optional()
      .default('ALL')
  }),

  errorQuery: z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
    severity: z.enum(['INFO', 'WARN', 'ERROR', 'CRITICAL'])
      .optional()
      .default('ERROR')
  })
};
