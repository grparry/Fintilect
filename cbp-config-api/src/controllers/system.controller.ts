import { Request, Response, NextFunction } from 'express';
import { SystemService } from '../services/system.service';
import { HttpError } from '../middleware/error.middleware';
import { logger } from '../config/logger';

export class SystemController {
  private service: SystemService;

  constructor() {
    this.service = new SystemService();
  }

  getCalendarDates = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dates = await this.service.getCalendarDates();
      res.json(dates);
    } catch (error) {
      next(error);
    }
  };

  getHolidays = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const year = req.query.year ? parseInt(req.query.year as string) : new Date().getFullYear();
      const holidays = await this.service.getHolidays(year);
      res.json(holidays);
    } catch (error) {
      next(error);
    }
  };

  getGeneratorStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = await this.service.getGeneratorStatus();
      res.json(status);
    } catch (error) {
      next(error);
    }
  };

  getErrorRecap = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const timeframe = req.query.timeframe as string || '24h';
      const errors = await this.service.getErrorRecap(timeframe);
      res.json(errors);
    } catch (error) {
      next(error);
    }
  };
}
