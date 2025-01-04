import { Request, Response, NextFunction } from 'express';
import { UtilityService } from '../services/utility.service';
import { HttpError } from '../middleware/error.middleware';
import { logger } from '../config/logger';

export class UtilityController {
  private service: UtilityService;

  constructor() {
    this.service = new UtilityService();
  }

  getDeliveryDates = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startDate, endDate, paymentType } = req.query;
      const dates = await this.service.getDeliveryDates({
        startDate: startDate as string,
        endDate: endDate as string,
        paymentType: paymentType as string
      });
      res.json(dates);
    } catch (error) {
      next(error);
    }
  };

  getNsfFees = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accountType, region } = req.query;
      const fees = await this.service.getNsfFees({
        accountType: accountType as string,
        region: region as string
      });
      res.json(fees);
    } catch (error) {
      next(error);
    }
  };

  listSavedEmails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type, status } = req.query;
      const emails = await this.service.listSavedEmails({
        type: type as string,
        status: status as string
      });
      res.json(emails);
    } catch (error) {
      next(error);
    }
  };
}
