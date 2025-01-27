import { Request, Response, NextFunction } from 'express';
import { HttpError } from '@cbp-config-api/utils/errors';
import { logger } from '@cbp-config-api/config/logger';
import { Database } from '@cbp-config-api/config/db';
import { JwtUser } from '@cbp-config-api/types/user';

declare module 'express' {
  interface Request {
    user?: JwtUser;
  }
}

export class HostController {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async getHostInfo(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new HttpError(401, 'User not authenticated');
      }

      const result = await this.db.executeProc('GetHostInfo', {
        userId: req.user.id
      });

      if (!result.recordset.length) {
        throw new HttpError(404, 'Host information not found');
      }

      res.json({
        data: result.recordset[0]
      });
    } catch (error) {
      next(error);
    }
  }

  async updateHostInfo(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new HttpError(401, 'User not authenticated');
      }

      const result = await this.db.executeProc('UpdateHostInfo', {
        userId: req.user.id,
        ...req.body
      });

      if (!result.recordset.length) {
        throw new HttpError(404, 'Host information not found');
      }

      res.json({
        data: result.recordset[0]
      });
    } catch (error) {
      next(error);
    }
  }

  async getHostSettings(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new HttpError(401, 'User not authenticated');
      }

      const result = await this.db.executeProc('GetHostSettings', {
        userId: req.user.id
      });

      if (!result.recordset.length) {
        throw new HttpError(404, 'Host settings not found');
      }

      res.json({
        data: result.recordset[0]
      });
    } catch (error) {
      next(error);
    }
  }

  async updateHostSettings(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new HttpError(401, 'User not authenticated');
      }

      const result = await this.db.executeProc('UpdateHostSettings', {
        userId: req.user.id,
        ...req.body
      });

      if (!result.recordset.length) {
        throw new HttpError(404, 'Host settings not found');
      }

      res.json({
        data: result.recordset[0]
      });
    } catch (error) {
      next(error);
    }
  }
}
