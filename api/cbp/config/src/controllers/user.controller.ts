import { Request, Response, NextFunction } from 'express';
import { HttpError } from '@cbp-config-api/utils/errors';
import { logger } from '@cbp-config-api/config/logger';
import { Database } from '@cbp-config-api/config/db';
import bcrypt from 'bcrypt';
import { generateToken } from '@cbp-config-api/utils/auth';
import { UserService } from '@cbp-config-api/services/user.service';

export class UserController {
  private db: Database;
  private userService: UserService;

  constructor(db: Database) {
    this.db = db;
    this.userService = new UserService(db);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const result = await this.db.executeProc('GetUserByEmail', {
        email
      });

      if (!result.recordset.length) {
        throw new HttpError(401, 'Invalid credentials');
      }

      const user = result.recordset[0];
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new HttpError(401, 'Invalid credentials');
      }

      const token = generateToken({
        id: user.id,
        email: user.email,
        roles: user.roles
      });

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          roles: user.roles
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;

      // Check if user already exists
      const existingUser = await this.db.executeProc('GetUserByEmail', {
        email
      });

      if (existingUser.recordset.length) {
        throw new HttpError(409, 'User already exists');
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const result = await this.db.executeProc('CreateUser', {
        email,
        password: hashedPassword,
        name,
        roles: ['user']
      });

      const user = result.recordset[0];

      // Generate token
      const token = generateToken({
        id: user.id,
        email: user.email,
        roles: user.roles
      });

      res.status(201).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          roles: user.roles
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new HttpError(401, 'User not authenticated');
      }

      const result = await this.db.executeProc('GetUserById', {
        userId: req.user.id
      });

      if (!result.recordset.length) {
        throw new HttpError(404, 'User not found');
      }

      const user = result.recordset[0];

      res.json({
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          roles: user.roles
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfileById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new HttpError(401, 'User not authenticated');
      }

      const result = await this.db.executeProc('GetUserById', {
        userId: req.params.id
      });

      if (!result.recordset.length) {
        throw new HttpError(404, 'User not found');
      }

      const user = result.recordset[0];

      res.json({
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          roles: user.roles
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new HttpError(401, 'User not authenticated');
      }

      const result = await this.db.executeProc('UpdateUser', {
        userId: req.user.id,
        ...req.body
      });

      if (!result.recordset.length) {
        throw new HttpError(404, 'User not found');
      }

      const user = result.recordset[0];

      res.json({
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          roles: user.roles
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new HttpError(401, 'User not authenticated');
      }

      const { currentPassword, newPassword } = req.body;

      // Get user with current password
      const result = await this.db.executeProc('GetUserById', {
        userId: req.user.id
      });

      if (!result.recordset.length) {
        throw new HttpError(404, 'User not found');
      }

      const user = result.recordset[0];

      // Verify current password
      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
      if (!isValidPassword) {
        throw new HttpError(401, 'Current password is incorrect');
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update password
      await this.db.executeProc('UpdateUserPassword', {
        userId: req.user.id,
        password: hashedPassword
      });

      res.json({
        message: 'Password updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  async getPayeeOptions(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new HttpError(401, 'User not authenticated');
      }

      const payeeId = parseInt(req.params.payeeId);
      if (isNaN(payeeId)) {
        throw new HttpError(400, 'Invalid payee ID');
      }

      const options = await this.userService.getPayeeOptions(req.user.id, payeeId);
      res.json(options);
    } catch (error) {
      next(error);
    }
  }

  async updatePayeeOptions(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new HttpError(401, 'User not authenticated');
      }

      const payeeId = parseInt(req.params.payeeId);
      if (isNaN(payeeId)) {
        throw new HttpError(400, 'Invalid payee ID');
      }

      // Validate payment limits hierarchy
      const { paymentLimits } = req.body;
      if (paymentLimits) {
        if (paymentLimits.daily > paymentLimits.weekly) {
          throw new HttpError(400, 'Daily limit cannot exceed weekly limit');
        }
        if (paymentLimits.weekly > paymentLimits.monthly) {
          throw new HttpError(400, 'Weekly limit cannot exceed monthly limit');
        }
      }

      await this.userService.updatePayeeOptions(req.user.id, payeeId, req.body);
      const updatedOptions = await this.userService.getPayeeOptions(req.user.id, payeeId);
      res.json(updatedOptions);
    } catch (error) {
      next(error);
    }
  }

  async getHostInfo(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new HttpError(401, 'User not authenticated');
      }

      const hostInfo = await this.userService.getHostInfo(req.user.id);
      res.json(hostInfo);
    } catch (error) {
      next(error);
    }
  }
}
