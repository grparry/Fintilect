import { Request, Response, NextFunction } from 'express';
import { Database } from '@/config/db';
import { ExceptionService } from '@/services/exception.service';
import { 
  ExceptionSearchRequest,
  ExceptionUpdateRequest,
  ExceptionRefundRequest,
  ExceptionNotificationRequest,
  ExceptionError,
  ExceptionErrorCodes 
} from '@/types/fis-exception';

export class ExceptionController {
  private service: ExceptionService;

  constructor(db: Database) {
    this.service = new ExceptionService(db);
  }

  searchExceptions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const searchRequest: ExceptionSearchRequest = {
        page: parseInt(req.query.page as string) || 1,
        pageSize: parseInt(req.query.pageSize as string) || 10,
        startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
        endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined,
        type: req.query.type as string,
        status: req.query.status as string
      };

      const result = await this.service.searchExceptions(searchRequest);
      if (result.success) {
        res.json(result.data);
      } else {
        throw new ExceptionError(ExceptionErrorCodes.SEARCH_FAILED, 500, 'Failed to search exceptions');
      }
    } catch (error) {
      next(error);
    }
  };

  getException = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const result = await this.service.getException(id);
      if (result.success) {
        res.json(result.data);
      } else {
        throw new ExceptionError(ExceptionErrorCodes.NOT_FOUND, 404, `Exception ${id} not found`);
      }
    } catch (error) {
      next(error);
    }
  };

  updateException = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const updateRequest: ExceptionUpdateRequest = {
        id: parseInt(req.params.id, 10),
        status: req.body.status,
        resolution: req.body.resolution,
        notes: req.body.notes
      };

      const result = await this.service.updateException(updateRequest);
      if (result.success) {
        res.json({ success: true });
      } else {
        throw new ExceptionError(ExceptionErrorCodes.UPDATE_FAILED, 500, 'Failed to update exception');
      }
    } catch (error) {
      next(error);
    }
  };

  resolveException = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const { resolution, notes } = req.body;
      const result = await this.service.resolveException(id, resolution, notes);
      if (result.success) {
        res.json({ success: true });
      } else {
        throw new ExceptionError(ExceptionErrorCodes.UPDATE_FAILED, 500, 'Failed to resolve exception');
      }
    } catch (error) {
      next(error);
    }
  };

  reprocessException = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const { notes } = req.body;
      const result = await this.service.reprocessException(id, notes);
      if (result.success) {
        res.json({ success: true });
      } else {
        throw new ExceptionError(ExceptionErrorCodes.REPROCESS_FAILED, 500, 'Failed to reprocess exception');
      }
    } catch (error) {
      next(error);
    }
  };

  refundException = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const { amount, reason, notes } = req.body;
      const result = await this.service.refundException(id, amount, reason, notes);
      if (result.success) {
        res.json({ success: true });
      } else {
        throw new ExceptionError(ExceptionErrorCodes.REFUND_FAILED, 500, 'Failed to process refund');
      }
    } catch (error) {
      next(error);
    }
  };

  checkRefundAdjustment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const refundRequest: ExceptionRefundRequest = {
        exceptionId: parseInt(req.params.id, 10),
        amount: parseFloat(req.body.amount)
      };

      const result = await this.service.checkRefundAdjustment(refundRequest);
      if (result.success) {
        res.json(result.data);
      } else {
        throw new ExceptionError(ExceptionErrorCodes.REFUND_VALIDATION_FAILED, 500, 'Failed to validate refund');
      }
    } catch (error) {
      next(error);
    }
  };

  sendNotification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const notificationRequest: ExceptionNotificationRequest = {
        exceptionId: parseInt(req.params.id, 10),
        notificationType: req.body.notificationType,
        recipients: req.body.recipients
      };

      const result = await this.service.sendNotification(notificationRequest);
      if (result.success) {
        res.json({ success: true });
      } else {
        throw new ExceptionError(ExceptionErrorCodes.NOTIFICATION_FAILED, 500, 'Failed to send notification');
      }
    } catch (error) {
      next(error);
    }
  };
}
