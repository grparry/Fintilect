import { Router } from 'express';
import { NotificationController } from '@/controllers/notification.controller';
import { Database } from '@/config/db';
import { authMiddleware } from '@/middleware/auth.middleware';
import { validateRequest } from '@/middleware/validation.middleware';
import { NotificationRequestSchema, NotificationHistorySearchRequestSchema } from '@/schemas/notification.schema';

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification management endpoints
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get user notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [READ, UNREAD, ALL]
 *         description: Filter notifications by status
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [ALERT, INFO, WARNING]
 *         description: Filter notifications by type
 *     responses:
 *       200:
 *         description: List of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   type:
 *                     type: string
 *                     enum: [ALERT, INFO, WARNING]
 *                   message:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum: [READ, UNREAD]
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /notifications/{id}/read:
 *   post:
 *     summary: Mark notification as read
 *     tags: [Notifications]
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
 *         description: Notification marked as read
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /notifications/read-all:
 *   post:
 *     summary: Mark all notifications as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

export function createNotificationRouter(db: Database): Router {
  const router = Router();
  const controller = new NotificationController(db);

  router.post(
    '/send',
    authMiddleware,
    validateRequest(NotificationRequestSchema),
    controller.send.bind(controller)
  );

  router.get(
    '/history',
    authMiddleware,
    validateRequest(NotificationHistorySearchRequestSchema),
    controller.searchHistory.bind(controller)
  );

  return router;
}

export default createNotificationRouter;
