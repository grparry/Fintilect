import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { HttpError } from '../middleware/error.middleware';
import { logger } from '../config/logger';

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  getPayeeOptions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const options = await this.service.getPayeeOptions(req.params.id);
      if (!options) {
        throw new HttpError(404, 'User payee options not found');
      }
      res.json(options);
    } catch (error) {
      next(error);
    }
  };

  updatePayeeOptions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const options = await this.service.updatePayeeOptions(req.params.id, req.body);
      if (!options) {
        throw new HttpError(404, 'User payee options not found');
      }
      res.json(options);
    } catch (error) {
      next(error);
    }
  };

  getHostInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hostInfo = await this.service.getHostInfo(req.params.id);
      if (!hostInfo) {
        throw new HttpError(404, 'User host info not found');
      }
      res.json(hostInfo);
    } catch (error) {
      next(error);
    }
  };
}
