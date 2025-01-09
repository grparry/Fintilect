import { Router } from 'express';
import { Database } from '../config/db';
import { ExceptionHistoryController } from '../controllers/exception-history.controller';
import { validateRequest } from '../middleware/validate-request';
import { auth } from '../middleware/auth';
import { ExceptionPermissions } from '../types/permissions';
import { ExceptionHistoryType } from '../types/exception-history';

export function createExceptionHistoryRoutes(db: Database): Router {
  const router = Router();
  const controller = new ExceptionHistoryController(db);

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
    controller.search.bind(controller)
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
    controller.getById.bind(controller)
  );

  router.post('/exceptions/:exceptionId/history',
    auth.checkPermission(ExceptionPermissions.UPDATE_EXCEPTIONS),
    validateRequest({
      params: {
        type: 'object',
        properties: {
          exceptionId: { type: 'number', minimum: 1 }
        },
        required: ['exceptionId']
      },
      body: {
        type: 'object',
        properties: {
          type: { type: 'string', enum: Object.values(ExceptionHistoryType) },
          details: {
            type: 'object',
            properties: {
              before: { type: 'object', optional: true },
              after: { type: 'object', optional: true },
              metadata: { type: 'object', optional: true }
            }
          }
        },
        required: ['type', 'details']
      }
    }),
    controller.create.bind(controller)
  );

  return router;
}
