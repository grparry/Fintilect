import { Request, Response, NextFunction } from 'express';
import { SystemService } from '@cbp-config-api/services/system.service';
import { Database } from '@cbp-config-api/config/db';
import { HttpError } from '@cbp-config-api/utils/errors';
import { logger } from '@cbp-config-api/config/logger';

export class SystemController {
  private service: SystemService;

  constructor(db: Database) {
    this.service = new SystemService(db);
  }

  async getCalendarDates(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dates = await this.service.getCalendarDates();
      res.json(dates);
    } catch (error) {
      next(error);
    }
  };

  async getHolidays(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const year = parseInt(req.query.year as string);
      if (isNaN(year)) {
        throw new HttpError(400, 'Year must be a number');
      }
      const holidays = await this.service.getHolidays(year);
      res.json(holidays);
    } catch (error) {
      next(error);
    }
  };

  async getSystemStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const status = await this.service.getSystemStatus();
      res.json(status);
    } catch (error) {
      next(error);
    }
  };

  async getErrorSummary(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { startDate, endDate } = req.query;
      if (!startDate || !endDate) {
        throw new HttpError(400, 'Start date and end date are required');
      }
      const errors = await this.service.getErrorSummary({
        startDate: startDate as string,
        endDate: endDate as string
      });
      res.json(errors);
    } catch (error) {
      next(error);
    }
  };

  async getGeneratorStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const status = await this.service.getGeneratorStatus();
      res.json(status);
    } catch (error) {
      next(error);
    }
  };

  async getErrorRecap(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const timeframe = req.query.timeframe as string || '24h';
      const errors = await this.service.getErrorRecap(timeframe);
      res.json(errors);
    } catch (error) {
      next(error);
    }
  };
}
