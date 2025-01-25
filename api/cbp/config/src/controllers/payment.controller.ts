import { Request, Response, NextFunction } from 'express';
import { PaymentService } from '../services/payment.service';
import { HttpError } from '../utils/errors';

export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  async listPayments(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;
      const result = await this.paymentService.listPayments(page, pageSize);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const payment = await this.paymentService.getPayment(id);
      if (!payment) {
        throw new HttpError(404, 'Payment not found');
      }
      res.json(payment);
    } catch (error) {
      next(error);
    }
  }

  async createPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const paymentData = req.body;
      const result = await this.paymentService.createPayment(paymentData);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updatePayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const result = await this.paymentService.updatePayment(id, updates);
      if (!result) {
        throw new HttpError(404, 'Payment not found');
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async deletePayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.paymentService.deletePayment(id);
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  async getPaymentStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const status = await this.paymentService.getPaymentStatus(id);
      if (!status) {
        throw new HttpError(404, 'Payment not found');
      }
      res.json(status);
    } catch (error) {
      next(error);
    }
  }

  async getClearedPayments(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;
      const payments = await this.paymentService.getClearedPayments(
        new Date(startDate as string),
        new Date(endDate as string)
      );
      res.json(payments);
    } catch (error) {
      next(error);
    }
  }

  async approvePayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.paymentService.approvePayment(id);
      if (!result) {
        throw new HttpError(404, 'Payment not found');
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async rejectPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      const result = await this.paymentService.rejectPayment(id, reason);
      if (!result) {
        throw new HttpError(404, 'Payment not found');
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
