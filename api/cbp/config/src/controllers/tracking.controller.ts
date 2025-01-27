import { Request, Response, NextFunction } from 'express';
import { TrackingService } from '@cbp-config-api/services/tracking.service';
import { HttpError } from '@cbp-config-api/utils/errors';
import { logger } from '@cbp-config-api/config/logger';

interface BaseQueryParams {
  page: number;
  limit: number;
  startDate?: string;
  endDate?: string;
  type?: string;
}

interface ChangeHistoryParams extends BaseQueryParams {
  entityType?: string;
}

interface PaymentQueryParams extends BaseQueryParams {
  status?: string;
}

interface QueryStringParams {
  page?: string;
  limit?: string;
  startDate?: string;
  endDate?: string;
  type?: string;
  entityType?: string;
  status?: string;
}

export class TrackingController {
  private service: TrackingService;

  constructor() {
    this.service = new TrackingService();
  }

  createEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const event = await this.service.trackEvent(req.body);
      res.status(201).json(event);
    } catch (error) {
      next(error);
    }
  };

  queryEvents = async (req: Request<{}, {}, {}, QueryStringParams>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page = '1', limit = '20', startDate: from, endDate: to, type } = req.query;
      const params: BaseQueryParams = {
        page: Number(page),
        limit: Number(limit),
        startDate: from,
        endDate: to,
        type
      };
      const events = await this.service.getEvents(params);
      res.json(events);
    } catch (error) {
      next(error);
    }
  };

  getChanges = async (req: Request<{}, {}, {}, QueryStringParams>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page = '1', limit = '20', startDate, endDate, entityType } = req.query;
      const params: ChangeHistoryParams = {
        page: Number(page),
        limit: Number(limit),
        startDate,
        endDate,
        entityType
      };
      const changes = await this.service.listChangeHistory(params);
      res.json(changes);
    } catch (error) {
      next(error);
    }
  };

  getPaymentTracking = async (req: Request<{}, {}, {}, QueryStringParams>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page = '1', limit = '20', startDate, endDate, status } = req.query;
      const params: PaymentQueryParams = {
        page: Number(page),
        limit: Number(limit),
        startDate,
        endDate,
        status
      };
      const tracking = await this.service.getPaymentTracking(params);
      res.json(tracking);
    } catch (error) {
      next(error);
    }
  };

  trackEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const event = await this.service.trackEvent(req.body);
      res.json(event);
    } catch (error) {
      next(error);
    }
  };

  getEvents = async (req: Request<{}, {}, {}, QueryStringParams>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page = '1', limit = '20', startDate, endDate, type } = req.query;
      const params: BaseQueryParams = {
        page: Number(page),
        limit: Number(limit),
        startDate,
        endDate,
        type
      };
      const events = await this.service.getEvents(params);
      res.json(events);
    } catch (error) {
      next(error);
    }
  };

  listOnUsPayments = async (req: Request<{}, {}, {}, QueryStringParams>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page = '1', limit = '20', startDate, endDate } = req.query;
      const params: BaseQueryParams = {
        page: Number(page),
        limit: Number(limit),
        startDate,
        endDate
      };
      const payments = await this.service.listOnUsPayments(params);
      res.json(payments);
    } catch (error) {
      next(error);
    }
  };

  listCourtesyPayments = async (req: Request<{}, {}, {}, QueryStringParams>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page = '1', limit = '20', startDate, endDate, status } = req.query;
      const params: PaymentQueryParams = {
        page: Number(page),
        limit: Number(limit),
        startDate,
        endDate,
        status
      };
      const payments = await this.service.listCourtesyPayments(params);
      res.json(payments);
    } catch (error) {
      next(error);
    }
  };

  listChangeHistory = async (req: Request<{}, {}, {}, QueryStringParams>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page = '1', limit = '20', startDate, endDate, entityType } = req.query;
      const params: ChangeHistoryParams = {
        page: Number(page),
        limit: Number(limit),
        startDate,
        endDate,
        entityType
      };
      const changes = await this.service.listChangeHistory(params);
      res.json(changes);
    } catch (error) {
      next(error);
    }
  };
}
