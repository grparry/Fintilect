import { Router } from 'express';
import { PaymentController } from '@cbp-config-api/controllers/payment.controller';
import { PaymentService } from '@cbp-config-api/services/payment.service';
import { db } from '@cbp-config-api/config/db';
import { validateRequest } from '@cbp-config-api/middleware/validation.middleware';
import { paymentSchemas as paymentValidators } from '@cbp-config-api/validators/payment.validator';
import { cacheMiddleware } from '@cbp-config-api/middleware/cache.middleware';
import { z } from 'zod';

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management and processing endpoints
 */

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: List all payments with pagination
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of payments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Payment'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payeeId:
 *                 type: string
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *               effectiveDate:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *               reference:
 *                 type: string
 *             required:
 *               - payeeId
 *               - amount
 *               - currency
 *     responses:
 *       201:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: Update payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *               effectiveDate:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *               reference:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /payments/cleared:
 *   get:
 *     summary: Get cleared payments
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cleared payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

const router = Router();
const paymentService = new PaymentService(db);
const controller = new PaymentController(paymentService);

const paymentSchemas = {
  listPayments: z.object({
    query: z.object({
      page: z.coerce.number().optional(),
      pageSize: z.coerce.number().optional()
    })
  }),
  paymentId: z.object({
    params: z.object({
      id: z.string()
    })
  }),
  createPayment: z.object({
    body: z.object({
      payeeId: z.string(),
      amount: z.coerce.number(),
      currency: z.string(),
      effectiveDate: z.coerce.date().optional(),
      description: z.string().optional(),
      reference: z.string().optional()
    })
  }),
  updatePayment: z.object({
    params: z.object({
      id: z.string()
    }),
    body: z.object({
      amount: z.coerce.number().optional(),
      currency: z.string().optional(),
      effectiveDate: z.coerce.date().optional(),
      description: z.string().optional(),
      reference: z.string().optional()
    })
  }),
  rejectPayment: z.object({
    params: z.object({
      id: z.string()
    }),
    body: z.object({
      reason: z.string()
    })
  }),
  clearedPayments: z.object({
    query: z.object({
      startDate: z.coerce.date(),
      endDate: z.coerce.date()
    })
  })
};

/**
 * @openapi
 * /payments:
 *   get:
 *     summary: List payments
 *     description: Retrieve a paginated list of payments
 *     tags: [Payments]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 */
router.get(
  '/',
  validateRequest(paymentSchemas.listPayments),
  controller.listPayments.bind(controller)
);

/**
 * @openapi
 * /payments/{id}:
 *   get:
 *     summary: Get payment by ID
 *     description: Retrieve a payment by its ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get(
  '/:id',
  validateRequest(paymentSchemas.paymentId),
  controller.getPayment.bind(controller)
);

/**
 * @openapi
 * /payments:
 *   post:
 *     summary: Create payment
 *     description: Create a new payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePayment'
 */
router.post(
  '/',
  validateRequest(paymentSchemas.createPayment),
  controller.createPayment.bind(controller)
);

/**
 * @openapi
 * /payments/{id}:
 *   put:
 *     summary: Update payment
 *     description: Update an existing payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.put(
  '/:id',
  validateRequest(paymentSchemas.updatePayment),
  controller.updatePayment.bind(controller)
);

/**
 * @openapi
 * /payments/{id}:
 *   delete:
 *     summary: Delete payment
 *     description: Delete an existing payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.delete(
  '/:id',
  validateRequest(paymentSchemas.paymentId),
  controller.deletePayment.bind(controller)
);

/**
 * @openapi
 * /payments/{id}/status:
 *   get:
 *     summary: Get payment status
 *     description: Get the status of a payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get(
  '/:id/status',
  validateRequest(paymentSchemas.paymentId),
  controller.getPaymentStatus.bind(controller)
);

/**
 * @openapi
 * /payments/cleared:
 *   get:
 *     summary: Get cleared payments
 *     description: Get payments that have been cleared within a date range
 *     tags: [Payments]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 */
router.get(
  '/cleared',
  validateRequest(paymentSchemas.clearedPayments),
  controller.getClearedPayments.bind(controller)
);

/**
 * @openapi
 * /payments/{id}/approve:
 *   post:
 *     summary: Approve payment
 *     description: Approve a payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.post(
  '/:id/approve',
  validateRequest(paymentSchemas.paymentId),
  controller.approvePayment.bind(controller)
);

/**
 * @openapi
 * /payments/{id}/reject:
 *   post:
 *     summary: Reject payment
 *     description: Reject a payment with a reason
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.post(
  '/:id/reject',
  validateRequest(paymentSchemas.rejectPayment),
  controller.rejectPayment.bind(controller)
);

export default router;
