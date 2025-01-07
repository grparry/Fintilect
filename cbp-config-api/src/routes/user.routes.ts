import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { Database } from '../config/db';
import { authMiddleware } from '../middleware/auth.middleware';

export function createUserRouter(db: Database): Router {
  const router = Router();
  const controller = new UserController(db);

  // Auth routes
  router.post('/login', controller.login.bind(controller));
  router.post('/register', controller.register.bind(controller));

  // Protected routes
  router.get('/profile', authMiddleware, controller.getProfile.bind(controller));
  router.get('/profile/:id', authMiddleware, controller.getProfileById.bind(controller));
  router.put('/profile', authMiddleware, controller.updateProfile.bind(controller));
  router.put('/change-password', authMiddleware, controller.changePassword.bind(controller));

  // Payee options routes
  router.get('/payee-options/:payeeId', authMiddleware, controller.getPayeeOptions.bind(controller));
  router.put('/payee-options/:payeeId', authMiddleware, controller.updatePayeeOptions.bind(controller));

  // Host info route
  router.get('/host-info', authMiddleware, controller.getHostInfo.bind(controller));

  return router;
}
