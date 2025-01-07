import { Request, Response, NextFunction } from 'express';
import { PayeeService } from '../services/payee.service';
import { HttpError } from '../utils/errors';

export class PayeeController {
  constructor(private payeeService: PayeeService) {}

  async listPayees(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const pageSize = Number(req.query.pageSize) || 10;

      if (isNaN(page) || page < 1) {
        throw new HttpError(400, 'Invalid page number');
      }

      if (isNaN(pageSize) || pageSize < 1 || pageSize > 100) {
        throw new HttpError(400, 'Invalid page size');
      }

      const result = await this.payeeService.listPayees(page, pageSize);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getPayee(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const payee = await this.payeeService.getPayee(id);
      if (!payee) {
        throw new HttpError(404, 'Payee not found');
      }
      res.json({ data: payee });
    } catch (error) {
      next(error);
    }
  }

  async createPayee(req: Request, res: Response, next: NextFunction) {
    try {
      const payeeData = req.body;
      const result = await this.payeeService.createPayee(payeeData);
      res.status(201).json({ data: result });
    } catch (error) {
      next(error);
    }
  }

  async updatePayee(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const result = await this.payeeService.updatePayee(id, updates);
      res.json({ data: result });
    } catch (error) {
      next(error);
    }
  }

  async deletePayee(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.payeeService.deletePayee(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async listUserPayees(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const payees = await this.payeeService.listUserPayees(userId);
      res.json({ data: payees });
    } catch (error) {
      next(error);
    }
  };
}
