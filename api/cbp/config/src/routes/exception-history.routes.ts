/**
 * @swagger
 * tags:
 *   name: Exception History
 *   description: FIS Exception history tracking endpoints
 */

/**
 * @swagger
 * /exception-history:
 *   get:
 *     summary: Search exception history with filters
 *     tags: [Exception History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: exceptionId
 *         schema:
 *           type: integer
 *         description: Filter by exception ID
 *       - in: query
 *         name: type
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             enum: [STATUS_CHANGE, RESOLUTION, REPROCESS, REFUND, NOTE_ADDED]
 *         description: Filter by history entry types
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
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user who made the change
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of exception history entries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ExceptionHistory'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /exception-history/{id}:
 *   get:
 *     summary: Get exception history entry by ID
 *     tags: [Exception History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: History entry ID
 *     responses:
 *       200:
 *         description: Exception history entry details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExceptionHistory'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /exception-history/exceptions/{exceptionId}/history:
 *   post:
 *     summary: Create exception history entry
 *     tags: [Exception History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: exceptionId
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
 *               type:
 *                 type: string
 *                 enum: [STATUS_CHANGE, RESOLUTION, REPROCESS, REFUND, NOTE_ADDED]
 *               details:
 *                 type: object
 *                 properties:
 *                   before:
 *                     type: object
 *                     optional: true
 *                   after:
 *                     type: object
 *                     optional: true
 *                   metadata:
 *                     type: object
 *                     optional: true
 *     responses:
 *       201:
 *         description: Exception history entry created
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

import { Router } from 'express';
import { db } from '@cbp-config-api/config/db';
import { ExceptionHistoryController } from '@cbp-config-api/controllers/exception-history.controller';
import { validateRequest } from '@cbp-config-api/middleware/validate-request';
import { auth } from '@cbp-config-api/middleware/auth';
import { ExceptionPermissions } from '@cbp-config-api/types/permissions';
import { ExceptionHistoryType } from '@cbp-config-api/types/exception-history';

const router = Router();
const historyController = new ExceptionHistoryController(db);

router.get('/',
  auth.checkPermission(ExceptionPermissions.VIEW_EXCEPTIONS),
  validateRequest({
    query: {
      type: 'object',
      properties: {
        exceptionId: { type: 'number', minimum: 1, optional: true },
        type: { 
          oneOf: [
            { type: 'string', enum: Object.values(ExceptionHistoryType) },
            { type: 'array', items: { type: 'string', enum: Object.values(ExceptionHistoryType) } }
          ],
          optional: true 
        },
        startDate: { type: 'string', format: 'date-time', optional: true },
        endDate: { type: 'string', format: 'date-time', optional: true },
        userId: { type: 'string', optional: true },
        page: { type: 'number', minimum: 1, optional: true },
        pageSize: { type: 'number', minimum: 1, maximum: 100, optional: true }
      }
    }
  }),
  historyController.search.bind(historyController)
);

router.get('/:id',
  auth.checkPermission(ExceptionPermissions.VIEW_EXCEPTIONS),
  validateRequest({
    params: {
      type: 'object',
      properties: {
        id: { type: 'number', minimum: 1 }
      },
      required: ['id']
    }
  }),
  historyController.getById.bind(historyController)
);

export default router;
