import { Request, Response, NextFunction } from 'express';
import { PayeeService } from '@/services/payee.service';
import type { PayeeQueryResult } from '@/services/payee.service';
import { HttpError } from '@/utils/errors';
import { validatePayeeData } from '@/utils/validation';
import { CreatePayeeRequest, UpdatePayeeRequest } from '@/types/payee';

export class PayeeController {
  constructor(private payeeService: PayeeService) {}

  async listPayees(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;

      if (page < 1) {
        throw new HttpError(400, 'Invalid page number');
      }
      if (pageSize < 1) {
        throw new HttpError(400, 'Invalid page size');
      }

      const payees = await this.payeeService.listPayees(page, pageSize);
      if (!payees?.recordset) {
        throw new HttpError(500, 'Failed to fetch payees');
      }

      res.json({
        data: payees.recordset,
        pagination: {
          page,
          pageSize,
          total: payees.recordset[0]?.TotalCount || 0,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getPayeeById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const payee = await this.payeeService.getPayee(id);
      if (!payee) {
        throw new HttpError(404, 'Payee not found');
      }
      res.json(payee);
    } catch (error) {
      next(error);
    }
  }

  async createPayee(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payeeData = req.body as CreatePayeeRequest;
      const validationErrors = validatePayeeData(payeeData);
      if (validationErrors.length > 0) {
        throw new HttpError(400, 'Invalid payee data', validationErrors);
      }

      const payee = await this.payeeService.createPayee({
        Name: payeeData.name,
        Email: payeeData.email,
        Phone: payeeData.phone,
        BankAccounts: payeeData.bankAccounts
      });

      if (!payee) {
        throw new HttpError(500, 'Failed to create payee');
      }

      res.status(201).json(payee);
    } catch (error) {
      next(error);
    }
  }

  async updatePayee(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body as UpdatePayeeRequest;

      // Check for empty update data
      if (!updateData || Object.keys(updateData).length === 0) {
        throw new HttpError(400, 'Invalid update data');
      }

      const validationErrors = validatePayeeData(updateData);
      if (validationErrors.length > 0) {
        throw new HttpError(400, 'Invalid update data', validationErrors);
      }

      const payee = await this.payeeService.updatePayee(id, {
        Name: updateData.name,
        Email: updateData.email,
        Phone: updateData.phone,
        Status: updateData.status,
        BankAccounts: updateData.bankAccounts
      });

      if (!payee) {
        throw new HttpError(404, 'Payee not found');
      }

      res.json(payee);
    } catch (error) {
      next(error);
    }
  }

  async deletePayee(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.payeeService.deletePayee(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        next(error);
      } else {
        next(new HttpError(500, 'Failed to delete payee'));
      }
    }
  }
}
