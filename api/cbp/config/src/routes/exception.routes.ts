/**
 * @swagger
 * tags:
 *   name: Exceptions
 *   description: FIS Exception management endpoints
 */

/**
 * @swagger
 * /exceptions/search:
 *   get:
 *     summary: Search exceptions with pagination and filters
 *     tags: [Exceptions]
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
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start date for filtering
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End date for filtering
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Exception type filter
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Exception status filter
 *     responses:
 *       200:
 *         description: List of exceptions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Exception'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /exceptions/{id}:
 *   get:
 *     summary: Get exception by ID
 *     tags: [Exceptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Exception ID
 *     responses:
 *       200:
 *         description: Exception details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exception'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /exceptions/{id}/resolve:
 *   post:
 *     summary: Resolve an exception
 *     tags: [Exceptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Exception ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resolution:
 *                 type: string
 *                 description: Resolution details
 *               notes:
 *                 type: string
 *                 description: Additional notes
 *             required:
 *               - resolution
 *     responses:
 *       200:
 *         description: Exception resolved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exception'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /exceptions/{id}/reprocess:
 *   post:
 *     summary: Reprocess an exception
 *     tags: [Exceptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Exception ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: string
 *                 description: Additional notes
 *     responses:
 *       200:
 *         description: Exception reprocessed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exception'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /exceptions/{id}/refund:
 *   post:
 *     summary: Refund an exception
 *     tags: [Exceptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Exception ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Amount to refund
 *               reason:
 *                 type: string
 *                 description: Reason for refund
 *               notes:
 *                 type: string
 *                 description: Additional notes
 *             required:
 *               - amount
 *               - reason
 *     responses:
 *       200:
 *         description: Exception refunded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exception'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

import { Router } from 'express';
import { ExceptionController } from '@cbp-config-api/controllers/exception.controller';
import { db } from '@cbp-config-api/config/db';
import { validateRequest } from '@cbp-config-api/middleware/validation.middleware';
import { authorize } from '@cbp-config-api/middleware/auth.middleware';
import { z } from 'zod';

const router = Router();
const exceptionController = new ExceptionController(db);

router.get('/search', 
  authorize(['exceptions.search']),
  validateRequest(z.object({
    page: z.number().optional(),
    pageSize: z.number().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    type: z.string().optional(),
    status: z.string().optional()
  })),
  exceptionController.searchExceptions.bind(exceptionController)
);

router.get('/:id',
  authorize(['exceptions.view']),
  validateRequest(z.object({
    id: z.number()
  })),
  exceptionController.getException.bind(exceptionController)
);

router.post('/:id/resolve',
  authorize(['exceptions.resolve']),
  validateRequest(z.object({
    resolution: z.string(),
    notes: z.string().optional()
  })),
  exceptionController.resolveException.bind(exceptionController)
);

router.post('/:id/reprocess',
  authorize(['exceptions.reprocess']),
  validateRequest(z.object({
    notes: z.string().optional()
  })),
  exceptionController.reprocessException.bind(exceptionController)
);

router.post('/:id/refund',
  authorize(['exceptions.refund']),
  validateRequest(z.object({
    amount: z.number(),
    reason: z.string(),
    notes: z.string().optional()
  })),
  exceptionController.refundException.bind(exceptionController)
);

export default router;
