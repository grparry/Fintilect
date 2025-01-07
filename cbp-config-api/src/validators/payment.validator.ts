import { z } from 'zod';

const PAYMENT_METHODS = ['ACH', 'WIRE', 'CHECK'] as const;
const PAYMENT_STATUSES = ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED'] as const;
const PAYMENT_FREQUENCIES = ['ONE_TIME', 'WEEKLY', 'BI_WEEKLY', 'MONTHLY', 'QUARTERLY', 'ANNUALLY'] as const;

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
  paymentId: z.object({
    params: z.object({
      id: z.string()
    })
  }),

  listPayments: z.object({
    query: z.object({
      page: z.number().optional(),
      limit: z.number().optional(),
      status: z.enum(PAYMENT_STATUSES).optional(),
      paymentMethod: z.enum(PAYMENT_METHODS).optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional()
    })
  }),

  getPayment: z.object({
    params: z.object({
      id: z.string()
    })
  }),

  createPayment: z.object({
    body: z.object({
      amount: z.number().positive(),
      currency: z.string().length(3),
      payeeId: z.string(),
      paymentMethod: z.enum(PAYMENT_METHODS),
      frequency: z.enum(PAYMENT_FREQUENCIES).optional(),
      scheduledDate: z.string().optional(),
      description: z.string().optional()
    })
  }),

  updatePayment: z.object({
    params: z.object({
      id: z.string()
    }),
    body: z.object({
      amount: z.number().positive().optional(),
      currency: z.string().length(3).optional(),
      paymentMethod: z.enum(PAYMENT_METHODS).optional(),
      frequency: z.enum(PAYMENT_FREQUENCIES).optional(),
      scheduledDate: z.string().optional(),
      description: z.string().optional()
    })
  }),

  updatePaymentStatus: z.object({
    params: z.object({
      id: z.string()
    }),
    body: z.object({
      status: z.enum(PAYMENT_STATUSES)
    })
  }),

  cancelPayment: z.object({
    params: z.object({
      id: z.string()
    }),
    body: z.object({
      reason: z.string().max(500)
    })
  }),

  retryPayment: z.object({
    params: z.object({
      id: z.string()
    })
  }),

  bulkPayments: z.object({
    body: z.object({
      payments: z.array(z.object({
        amount: z.number().positive(),
        currency: z.string().length(3),
        payeeId: z.string(),
        paymentMethod: z.enum(PAYMENT_METHODS),
        scheduledDate: z.string().optional(),
        description: z.string().optional()
      })).min(1).max(100)
    })
  })
};
