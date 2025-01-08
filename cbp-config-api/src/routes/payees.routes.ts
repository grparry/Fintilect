import { Router } from 'express';
import { validateRequest } from '../middleware/validation.middleware';
import { PayeeController } from '../controllers/payee.controller';
import { PayeeService } from '../services/payee.service';
import { z } from 'zod';
import { cacheMiddleware } from '../middleware/cache.middleware';
import { db } from '../config/db';

const router = Router();
const payeeService = new PayeeService(db);
const controller = new PayeeController(payeeService);

const payeeSchemas = {
  listPayees: z.object({
    query: z.object({
      page: z.coerce.number().optional(),
      pageSize: z.coerce.number().optional()
    })
  }),
  payeeId: z.object({
    params: z.object({
      id: z.string()
    })
  }),
  createPayee: z.object({
    body: z.object({
      name: z.string(),
      email: z.string().email(),
      phone: z.string(),
      taxId: z.string(),
      bankInfo: z.object({
        bankName: z.string(),
        accountNumber: z.string(),
        routingNumber: z.string(),
        accountType: z.string()
      }),
      address: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
        country: z.string()
      })
    })
  }),
  updatePayee: z.object({
    params: z.object({
      id: z.string()
    }),
    body: z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      taxId: z.string().optional(),
      bankInfo: z.object({
        bankName: z.string(),
        accountNumber: z.string(),
        routingNumber: z.string(),
        accountType: z.string()
      }).optional(),
      address: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
        country: z.string()
      }).optional()
    })
  }),
  rejectPayee: z.object({
    params: z.object({
      id: z.string()
    }),
    body: z.object({
      reason: z.string()
    })
  }),
  userId: z.object({
    params: z.object({
      userId: z.string()
    })
  })
};

/**
 * @openapi
 * /payees:
 *   get:
 *     summary: List payees
 *     description: Retrieve a paginated list of payees with optional filters
 *     tags: [Payees]
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
 *           enum: [ACTIVE, INACTIVE, PENDING_VERIFICATION]
 *         description: Filter by payee status
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [INDIVIDUAL, BUSINESS]
 *         description: Filter by payee type
 *     responses:
 *       200:
 *         description: List of payees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Payee'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.get(
  '/',
  validateRequest(payeeSchemas.listPayees),
  controller.listPayees.bind(controller)
);

/**
 * @openapi
 * /payees/{id}:
 *   get:
 *     summary: Get payee details
 *     description: Retrieve detailed information about a specific payee
 *     tags: [Payees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payee ID
 *     responses:
 *       200:
 *         description: Payee details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payee'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get(
  '/:id',
  validateRequest(payeeSchemas.payeeId),
  controller.getPayeeById.bind(controller)
);

/**
 * @openapi
 * /payees:
 *   post:
 *     summary: Create payee
 *     description: Create a new payee
 *     tags: [Payees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePayee'
 *     responses:
 *       201:
 *         description: Payee created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payee'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post(
  '/',
  validateRequest(payeeSchemas.createPayee),
  controller.createPayee.bind(controller)
);

/**
 * @openapi
 * /payees/{id}:
 *   put:
 *     summary: Update payee
 *     description: Update an existing payee
 *     tags: [Payees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePayee'
 *     responses:
 *       200:
 *         description: Payee updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payee'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.put(
  '/:id',
  validateRequest(payeeSchemas.updatePayee),
  controller.updatePayee.bind(controller)
);

// Remove payee
router.delete(
  '/:id',
  validateRequest(payeeSchemas.payeeId),
  controller.deletePayee.bind(controller)
);

// List user's payees
router.get(
  '/user/:userId',
  validateRequest(payeeSchemas.userId),
  controller.listPayees.bind(controller)
);

export default router;
