import { Router } from 'express';
import { TrackingController } from '../controllers/tracking.controller';
import { db } from '../config/db';
import { validateRequest } from '../middleware/validation.middleware';
import { z } from 'zod';
import { authMiddleware } from '../middleware/auth.middleware';
import { cacheMiddleware } from '../middleware/cache.middleware';

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
