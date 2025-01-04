import { Request, Response, NextFunction } from 'express';
import { PayeeService } from '../services/payee.service';
import { HttpError } from '../middleware/error.middleware';
import { logger } from '../config/logger';

export class PayeeController {
  private service: PayeeService;

  constructor() {
    this.service = new PayeeService();
  }

  listPayees = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payees = await this.service.listPayees();
      res.json(payees);
    } catch (error) {
      next(error);
    }
  };

  getPayee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payee = await this.service.getPayee(req.params.id);
      if (!payee) {
        throw new HttpError(404, 'Payee not found');
      }
      res.json(payee);
    } catch (error) {
      next(error);
    }
  };

  createPayee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payee = await this.service.createPayee(req.body);
      res.status(201).json(payee);
    } catch (error) {
      next(error);
    }
  };

  updatePayee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payee = await this.service.updatePayee(req.params.id, req.body);
      if (!payee) {
        throw new HttpError(404, 'Payee not found');
      }
      res.json(payee);
    } catch (error) {
      next(error);
    }
  };

  removePayee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.removePayee(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  listUserPayees = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payees = await this.service.listUserPayees(req.params.userId);
      res.json(payees);
    } catch (error) {
      next(error);
    }
  };
}
