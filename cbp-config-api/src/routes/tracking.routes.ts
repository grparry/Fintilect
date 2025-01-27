import { Router } from 'express';
import { TrackingController } from '@/controllers/tracking.controller';
import { db } from '@/config/db';
import { validateRequest } from '@/middleware/validation.middleware';
import { z } from 'zod';
import { authMiddleware } from '@/middleware/auth.middleware';
import { cacheMiddleware } from '@/middleware/cache.middleware';

/**
 * @swagger
 * tags:
 *   name: Tracking
 *   description: Event tracking and payment monitoring endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TrackEvent:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [page_view, click, error, custom]
 *         data:
 *           type: object
 *         timestamp:
 *           type: string
 *           format: date-time
 *         userId:
 *           type: string
 *       required:
 *         - type
 *         - data
 */

/**
 * @swagger
 * /tracking/events:
 *   post:
 *     summary: Track event
 *     description: Record a user interaction or system event for analytics
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrackEvent'
 *     responses:
 *       201:
 *         description: Event recorded
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *   get:
 *     summary: Get events
 *     description: Retrieve tracked events with optional filtering
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start timestamp
 *       - in: query
 *         name: to
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End timestamp
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [page_view, click, error, custom]
 *         description: Event type filter
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *     responses:
 *       200:
 *         description: List of events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /tracking/changes:
 *   get:
 *     summary: Get change history
 *     description: Retrieve history of changes with pagination
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start timestamp
 *       - in: query
 *         name: to
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End timestamp
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [create, update, delete]
 *         description: Change type filter
 *       - in: query
 *         name: entity
 *         schema:
 *           type: string
 *         description: Filter by entity type
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *     responses:
 *       200:
 *         description: List of changes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       type:
 *                         type: string
 *                         enum: [create, update, delete]
 *                       entity:
 *                         type: string
 *                       entityId:
 *                         type: string
 *                       changes:
 *                         type: object
 *                       userId:
 *                         type: string
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /tracking/onus:
 *   get:
 *     summary: Get on-us payments
 *     description: Retrieve list of on-us payments with pagination (cached for 5 minutes)
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start timestamp
 *       - in: query
 *         name: to
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End timestamp
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, completed, failed]
 *         description: Payment status filter
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [credit, debit]
 *         description: Payment type filter
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *     responses:
 *       200:
 *         description: List of on-us payments
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
 */

/**
 * @swagger
 * /tracking/courtesy:
 *   get:
 *     summary: Get courtesy payments
 *     description: Retrieve list of courtesy payments with pagination (cached for 5 minutes)
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start timestamp
 *       - in: query
 *         name: to
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End timestamp
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, completed, failed]
 *         description: Payment status filter
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [credit, debit]
 *         description: Payment type filter
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *     responses:
 *       200:
 *         description: List of courtesy payments
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
 */

/**
 * @swagger
 * /tracking/payments:
 *   get:
 *     summary: Get payment tracking
 *     description: Retrieve payment tracking information
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start timestamp
 *       - in: query
 *         name: to
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End timestamp
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, completed, failed]
 *         description: Payment status filter
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [credit, debit]
 *         description: Payment type filter
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *     responses:
 *       200:
 *         description: Payment tracking information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PaymentTracking'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

const router = Router();
const trackingController = new TrackingController();

const trackingValidation = {
  eventCreate: z.object({
    body: z.object({
      type: z.enum(['page_view', 'click', 'error', 'custom']),
      data: z.record(z.any()),
      timestamp: z.coerce.date().optional(),
      userId: z.string().optional()
    })
  }),
  eventQuery: z.object({
    query: z.object({
      from: z.coerce.date(),
      to: z.coerce.date(),
      type: z.enum(['page_view', 'click', 'error', 'custom']).optional(),
      userId: z.string().optional()
    })
  }),
  changeQuery: z.object({
    query: z.object({
      from: z.coerce.date(),
      to: z.coerce.date(),
      type: z.enum(['create', 'update', 'delete']).optional(),
      entity: z.string().optional(),
      userId: z.string().optional()
    })
  }),
  paymentQuery: z.object({
    query: z.object({
      from: z.coerce.date(),
      to: z.coerce.date(),
      status: z.enum(['pending', 'completed', 'failed']).optional(),
      type: z.enum(['credit', 'debit']).optional(),
      userId: z.string().optional()
    })
  })
};

/**
 * @openapi
 * /tracking/events:
 *   post:
 *     summary: Track event
 *     description: Record a user interaction or system event for analytics
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrackEvent'
 *     responses:
 *       201:
 *         description: Event recorded
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post('/events',
  authMiddleware,
  validateRequest(trackingValidation.eventCreate),
  trackingController.createEvent
);

/**
 * @openapi
 * /tracking/events:
 *   get:
 *     summary: Get events
 *     description: Retrieve tracked events with optional filtering
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start timestamp
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End timestamp
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Event type filter
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *     responses:
 *       200:
 *         description: List of events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/events',
  authMiddleware,
  validateRequest(trackingValidation.eventQuery),
  trackingController.queryEvents
);

// List change history with pagination
router.get('/changes',
  authMiddleware,
  validateRequest(trackingValidation.changeQuery),
  trackingController.getChanges
);

// List on-us payments with pagination
router.get('/onus',
  authMiddleware,
  validateRequest(trackingValidation.paymentQuery),
  cacheMiddleware(5 * 60), // Cache for 5 minutes
  trackingController.listOnUsPayments
);

// List courtesy payments with pagination
router.get('/courtesy',
  authMiddleware,
  validateRequest(trackingValidation.paymentQuery),
  cacheMiddleware(5 * 60), // Cache for 5 minutes
  trackingController.listCourtesyPayments
);

// Get payment tracking
router.get('/payments',
  authMiddleware,
  validateRequest(trackingValidation.paymentQuery),
  trackingController.getPaymentTracking
);

export { router as trackingRouter };
export default router;
