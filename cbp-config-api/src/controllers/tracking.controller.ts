import { Request, Response, NextFunction } from 'express';
import { TrackingService } from '../services/tracking.service';
import { HttpError } from '../middleware/error.middleware';
import { logger } from '../config/logger';

export class TrackingController {
  private service: TrackingService;

  constructor() {
    this.service = new TrackingService();
  }

  listChangeHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 20, startDate, endDate, entityType } = req.query;
      const changes = await this.service.listChangeHistory({
        page: Number(page),
        limit: Number(limit),
        startDate: startDate as string,
        endDate: endDate as string,
        entityType: entityType as string
      });
      res.json(changes);
    } catch (error) {
      next(error);
    }
  };

  listOnUsPayments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 20, startDate, endDate, status } = req.query;
      const payments = await this.service.listOnUsPayments({
        page: Number(page),
        limit: Number(limit),
        startDate: startDate as string,
        endDate: endDate as string,
        status: status as string
      });
      res.json(payments);
    } catch (error) {
      next(error);
    }
  };

  listCourtesyPayments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 20, startDate, endDate, status } = req.query;
      const payments = await this.service.listCourtesyPayments({
        page: Number(page),
        limit: Number(limit),
        startDate: startDate as string,
        endDate: endDate as string,
        status: status as string
      });
      res.json(payments);
    } catch (error) {
      next(error);
    }
  };
}
