import { Router } from 'express';
import { ExceptionController } from '../controllers/exception.controller';
import { Database } from '../config/db';
import { validateRequest } from '../middleware/validation.middleware';
import { auth } from '../middleware/auth.middleware';
import { z } from 'zod';

export function createExceptionRoutes(db: Database): Router {
  const router = Router();
  const controller = new ExceptionController(db);

  router.get('/search', 
    auth.checkPermission('exceptions.search'),
    validateRequest({
      query: z.object({
        page: z.number().optional(),
        pageSize: z.number().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        type: z.string().optional(),
        status: z.string().optional()
      })
    }),
    controller.searchExceptions
  );

  router.get('/:id',
    auth.checkPermission('exceptions.view'),
    validateRequest({
      params: z.object({
        id: z.number()
      })
    }),
    controller.getException
  );

  router.put('/:id',
    auth.checkPermission('exceptions.update'),
    validateRequest({
      params: z.object({
        id: z.number()
      }),
      body: z.object({
        status: z.string(),
        resolution: z.string().optional(),
        notes: z.string().optional()
      })
    }),
    controller.updateException
  );

  router.post('/:id/refund',
    auth.checkPermission('exceptions.refund'),
    validateRequest({
      params: z.object({
        id: z.number()
      }),
      body: z.object({
        amount: z.number()
      })
    }),
    controller.checkRefundAdjustment
  );

  router.post('/:id/notify',
    auth.checkPermission('exceptions.notify'),
    validateRequest({
      params: z.object({
        id: z.number()
      }),
      body: z.object({
        notificationType: z.string(),
        recipients: z.array(z.string())
      })
    }),
    controller.sendNotification
  );

  return router;
}

export default createExceptionRoutes;
