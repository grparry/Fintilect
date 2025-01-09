import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';
import { Database } from '../config/db';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { NotificationRequestSchema, NotificationHistorySearchRequestSchema } from '../schemas/notification.schema';

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
