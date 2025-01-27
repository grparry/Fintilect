import { Request, Response, NextFunction } from 'express';
import { UtilityService } from '@/services/utility.service';
import { Database } from '@/config/db';
import { HttpError } from '@/utils/errors';
import { logger } from '@/config/logger';

export class UtilityController {
  private utilityService: UtilityService;

  constructor(db: Database) {
    this.utilityService = new UtilityService(db);
  }

  getDeliveryDates = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startDate, endDate, paymentType } = req.query;
      const dates = await this.utilityService.getDeliveryDates({
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
      const fees = await this.utilityService.getNsfFees({
        accountType: accountType as string,
        region: region as string
      });
      res.json(fees);
    } catch (error) {
      next(error);
    }
  };

  healthCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const health = await this.utilityService.healthCheck();
      res.json(health);
    } catch (error) {
      next(error);
    }
  };

  getMetrics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startDate, endDate } = req.query;
      const metrics = await this.utilityService.getMetrics({
        startDate: startDate as string,
        endDate: endDate as string
      });
      res.json(metrics);
    } catch (error) {
      next(error);
    }
  };

  getVersion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const version = await this.utilityService.getVersion();
      res.json(version);
    } catch (error) {
      next(error);
    }
  };

  getLogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { level, startDate, endDate } = req.query;
      const logs = await this.utilityService.getLogs({
        level: level as string,
        startDate: startDate as string,
        endDate: endDate as string
      });
      res.json(logs);
    } catch (error) {
      next(error);
    }
  };

  listSavedEmails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type, status } = req.query;
      const emails = await this.utilityService.listSavedEmails({
        type: type as string,
        status: status as string
      });
      res.json(emails);
    } catch (error) {
      next(error);
    }
  };

  async listUtilities(req: Request, res: Response, next: NextFunction) {
    try {
      const utilities = await this.utilityService.listUtilities();
      res.json(utilities);
    } catch (error) {
      next(error);
    }
  }

  async getUtility(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const utility = await this.utilityService.getUtility(id);
      res.json(utility);
    } catch (error) {
      next(error);
    }
  }

  async createUtility(req: Request, res: Response, next: NextFunction) {
    try {
      const utility = await this.utilityService.createUtility(req.body);
      res.status(201).json(utility);
    } catch (error) {
      next(error);
    }
  }

  async updateUtility(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const utility = await this.utilityService.updateUtility(id, req.body);
      res.json(utility);
    } catch (error) {
      next(error);
    }
  }

  async deleteUtility(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.utilityService.deleteUtility(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}
