import { Request, Response, NextFunction } from 'express';
import { Database } from '@/config/db';
import { ExceptionHistoryService } from '@/services/exception-history.service';
import { ExceptionHistorySearchRequest, ExceptionHistoryCreateRequest, ExceptionHistoryType } from '@/types/exception-history';

export class ExceptionHistoryController {
  private service: ExceptionHistoryService;

  constructor(db: Database) {
    this.service = new ExceptionHistoryService(db);
  }

  async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const searchRequest: ExceptionHistorySearchRequest = {
        exceptionId: req.query.exceptionId ? parseInt(req.query.exceptionId as string, 10) : undefined,
        type: req.query.type ? 
          (Array.isArray(req.query.type) 
            ? (req.query.type as string[]).map(t => t as ExceptionHistoryType)
            : [req.query.type as string].map(t => t as ExceptionHistoryType)
          ) : undefined,
        startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
        endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined,
        userId: req.query.userId as string,
        page: req.query.page ? parseInt(req.query.page as string, 10) : undefined,
        pageSize: req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : undefined
      };

      const result = await this.service.searchHistory(searchRequest);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const result = await this.service.getHistoryById(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createRequest: ExceptionHistoryCreateRequest = {
        exceptionId: parseInt(req.params.exceptionId, 10),
        type: req.body.type,
        userId: req.body.userId || (req.user as { id: string })?.id,
        details: req.body.details
      };

      const result = await this.service.createHistory(createRequest);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
