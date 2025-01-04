import { Request, Response, NextFunction } from 'express';
import { PaymentService } from '../services/payment.service';
import { HttpError } from '../middleware/error.middleware';
import { logger } from '../config/logger';

export class PaymentController {
  private service: PaymentService;

  constructor() {
    this.service = new PaymentService();
  }

  listPayments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payments = await this.service.listPayments();
      res.json(payments);
    } catch (error) {
      next(error);
    }
  };

  getPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payment = await this.service.getPayment(req.params.id);
      if (!payment) {
        throw new HttpError(404, 'Payment not found');
      }
      res.json(payment);
    } catch (error) {
      next(error);
    }
  };

  createPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payment = await this.service.createPayment(req.body);
      res.status(201).json(payment);
    } catch (error) {
      next(error);
    }
  };

  updatePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payment = await this.service.updatePayment(req.params.id, req.body);
      if (!payment) {
        throw new HttpError(404, 'Payment not found');
      }
      res.json(payment);
    } catch (error) {
      next(error);
    }
  };

  cancelPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.cancelPayment(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  getPaymentStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = await this.service.getPaymentStatus(req.params.id);
      if (!status) {
        throw new HttpError(404, 'Payment status not found');
      }
      res.json(status);
    } catch (error) {
      next(error);
    }
  };

  listClearedPayments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payments = await this.service.listClearedPayments();
      res.json(payments);
    } catch (error) {
      next(error);
    }
  };
}
