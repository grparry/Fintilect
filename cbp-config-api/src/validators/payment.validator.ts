import Joi from 'joi';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique payment identifier
 *         amount:
 *           type: number
 *           format: float
 *           description: Payment amount
 *         currency:
 *           type: string
 *           description: Payment currency (ISO code)
 *         status:
 *           type: string
 *           enum: [PENDING, PROCESSING, COMPLETED, FAILED]
 *           description: Payment status
 *         payeeId:
 *           type: string
 *           description: ID of the payee
 *         paymentMethod:
 *           type: string
 *           enum: [ACH, WIRE, CHECK]
 *           description: Payment method
 *         scheduledDate:
 *           type: string
 *           format: date
 *           description: Scheduled payment date
 *         processedDate:
 *           type: string
 *           format: date-time
 *           description: Actual processing date
 *         metadata:
 *           type: object
 *           description: Additional payment metadata
 *       required:
 *         - id
 *         - amount
 *         - currency
 *         - status
 *         - payeeId
 *         - paymentMethod
 *         - scheduledDate
 *     CreatePayment:
 *       type: object
 *       properties:
 *         amount:
 *           type: number
 *           format: float
 *           minimum: 0.01
 *           description: Payment amount
 *         currency:
 *           type: string
 *           description: Payment currency (ISO code)
 *         payeeId:
 *           type: string
 *           description: ID of the payee
 *         paymentMethod:
 *           type: string
 *           enum: [ACH, WIRE, CHECK]
 *           description: Payment method
 *         scheduledDate:
 *           type: string
 *           format: date
 *           description: Scheduled payment date
 *         metadata:
 *           type: object
 *           description: Additional payment metadata
 *       required:
 *         - amount
 *         - currency
 *         - payeeId
 *         - paymentMethod
 *         - scheduledDate
 *     UpdatePayment:
 *       type: object
 *       properties:
 *         amount:
 *           type: number
 *           format: float
 *           minimum: 0.01
 *           description: Payment amount
 *         status:
 *           type: string
 *           enum: [PENDING, PROCESSING, COMPLETED, FAILED]
 *           description: Payment status
 *         scheduledDate:
 *           type: string
 *           format: date
 *           description: Scheduled payment date
 *         metadata:
 *           type: object
 *           description: Additional payment metadata
 */

export const paymentSchemas = {
  listPayments: z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(20),
    status: z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED']).optional(),
    fromDate: z.string().datetime().optional(),
    toDate: z.string().datetime().optional()
  }),

  paymentId: z.object({
    id: z.string().min(1)
  }),

  createPayment: z.object({
    amount: z.number().positive(),
    currency: z.string().length(3),
    payeeId: z.string().min(1),
    paymentMethod: z.enum(['ACH', 'WIRE', 'CHECK']),
    scheduledDate: z.string().datetime(),
    metadata: z.record(z.unknown()).optional()
  }),

  updatePayment: z.object({
    amount: z.number().positive().optional(),
    status: z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED']).optional(),
    scheduledDate: z.string().datetime().optional(),
    metadata: z.record(z.unknown()).optional()
  }),

  createPaymentJoi: Joi.object({
    payeeId: Joi.string().required(),
    amount: Joi.number().positive().required(),
    scheduledDate: Joi.date().min('now').required(),
    memo: Joi.string().max(255),
    recurring: Joi.boolean().default(false),
    frequency: Joi.string().valid('once', 'weekly', 'biweekly', 'monthly').when('recurring', {
      is: true,
      then: Joi.required()
    }),
    endDate: Joi.date().min(Joi.ref('scheduledDate')).when('recurring', {
      is: true,
      then: Joi.required()
    })
  }),

  updatePaymentJoi: Joi.object({
    amount: Joi.number().positive(),
    scheduledDate: Joi.date().min('now'),
    memo: Joi.string().max(255),
    recurring: Joi.boolean(),
    frequency: Joi.string().valid('once', 'weekly', 'biweekly', 'monthly'),
    endDate: Joi.date().min(Joi.ref('scheduledDate'))
  }).min(1) // At least one field must be provided
};
