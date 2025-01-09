import { Request, Response, NextFunction } from 'express';
import { Database } from '../config/db';
import { NotificationService } from '../services/notification.service';
import { NotificationRequest, NotificationHistorySearchRequest } from '../types/notification';
import { HttpError } from '../utils/errors';

export class NotificationController {
  private service: NotificationService;

  constructor(db: Database) {
    this.service = new NotificationService(db);
  }

  async send(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const notificationRequest: NotificationRequest = req.body;
      if (!req.user?.id) {
        throw new HttpError(401, 'User ID is required');
      }

      notificationRequest.userId = req.user.id;
      const result = await this.service.sendNotification(notificationRequest);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async searchHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const searchRequest: NotificationHistorySearchRequest = {
        startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
        endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined,
        type: req.query.type as any,
        template: req.query.template as any,
        userId: req.query.userId as string,
        status: req.query.status as any,
        page: req.query.page ? parseInt(req.query.page as string, 10) : undefined,
        pageSize: req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : undefined
      };

      const result = await this.service.searchNotificationHistory(searchRequest);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
