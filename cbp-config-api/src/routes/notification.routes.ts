import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';
import { Database } from '../config/db';
import { authenticateUser } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { NotificationRequestSchema, NotificationHistorySearchRequestSchema } from '../schemas/notification.schema';

export function createNotificationRouter(db: Database): Router {
  const router = Router();
  const controller = new NotificationController(db);

  router.post(
    '/send',
    authenticateUser,
    validateRequest({ body: NotificationRequestSchema }),
    controller.send.bind(controller)
  );

  router.get(
    '/history',
    authenticateUser,
    validateRequest({ query: NotificationHistorySearchRequestSchema }),
    controller.searchHistory.bind(controller)
  );

  return router;
}
