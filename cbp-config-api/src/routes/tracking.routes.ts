import { Router } from 'express';
import { TrackingController } from '../controllers/tracking.controller';
import { validateRequest } from '../middleware';
import { trackingSchemas } from '../validators/tracking.validator';
import { cacheMiddleware } from '../middleware/cache.middleware';

const router = Router();
const controller = new TrackingController();

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
  validateRequest(trackingSchemas.trackEvent),
  controller.trackEvent
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
  validateRequest(trackingSchemas.getEvents),
  controller.getEvents
);

// List change history with pagination
router.get('/changes',
  validateRequest(trackingSchemas.queryParams),
  controller.listChangeHistory
);

// List on-us payments with pagination
router.get('/onus',
  validateRequest(trackingSchemas.queryParams),
  cacheMiddleware(5 * 60), // Cache for 5 minutes
  controller.listOnUsPayments
);

// List courtesy payments with pagination
router.get('/courtesy',
  validateRequest(trackingSchemas.queryParams),
  cacheMiddleware(5 * 60), // Cache for 5 minutes
  controller.listCourtesyPayments
);

export { router as trackingRouter };
