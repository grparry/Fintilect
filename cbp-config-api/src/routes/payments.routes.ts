import { Router } from 'express';
import { validateRequest } from '../middleware';
import { PaymentController } from '../controllers/payment.controller';
import { paymentSchemas } from '../validators/payment.validator';

const router = Router();
const controller = new PaymentController();

/**
 * @openapi
 * /payments:
 *   get:
 *     summary: List payments
 *     description: Retrieve a paginated list of payments with optional filters
 *     tags: [Payments]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Items per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, PROCESSING, COMPLETED, FAILED]
 *         description: Filter by payment status
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter payments from this date
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter payments until this date
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
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.get('/', 
  validateRequest(paymentSchemas.listPayments),
  controller.listPayments
);

/**
 * @openapi
 * /payments/{id}:
 *   get:
 *     summary: Get payment details
 *     description: Retrieve detailed information about a specific payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/:id', 
  validateRequest(paymentSchemas.paymentId),
  controller.getPayment
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
 *     responses:
 *       201:
 *         description: Payment created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post('/', 
  validateRequest(paymentSchemas.createPayment),
  controller.createPayment
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
 *         description: Payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePayment'
 *     responses:
 *       200:
 *         description: Payment updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.put('/:id',
  validateRequest(paymentSchemas.updatePayment),
  controller.updatePayment
);

// Cancel payment
router.delete('/:id', controller.cancelPayment);

// Get payment status
router.get('/status/:id', controller.getPaymentStatus);

// List cleared payments
router.get('/clear', controller.listClearedPayments);

export { router as paymentsRouter };
