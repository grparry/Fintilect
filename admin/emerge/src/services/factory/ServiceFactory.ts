import { IBaseService } from '../interfaces/IBaseService';
import { IAuthService } from '../interfaces/IAuthService';
import { IMemberService } from '../interfaces/IMemberService';
import { ISettingsService } from '../interfaces/ISettingsService';
import { IMoneyDesktopService } from '../interfaces/IMoneyDesktopService';

import { AuthService } from '../implementations/real/AuthService';
import { MemberService } from '../implementations/real/MemberService';
import { SettingsService } from '../implementations/real/SettingsService';
import { MoneyDesktopService } from '../implementations/real/MoneyDesktopService';

import { MockAuthService } from '../implementations/mock/MockAuthService';
import { MockMemberService } from '../implementations/mock/MockMemberService';
import { MockSettingsService } from '../implementations/mock/MockSettingsService';
import { MockMoneyDesktopService } from '../implementations/mock/MockMoneyDesktopService';

import { getConfig, shouldUseMockService } from '../../config/api.config';

/**
 * Service factory for managing service instantiation
 */
export class ServiceFactory {
  private static instance: ServiceFactory;
  private services: Map<string, IAuthService | IMemberService | ISettingsService | IMoneyDesktopService> = new Map();

  private constructor() {
    this.initializeServices();
  }

  static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  private initializeServices(): void {
    if (shouldUseMockService('auth')) {
      this.services.set('auth', new MockAuthService('/api/v1/auth'));
    } else {
      this.services.set('auth', new AuthService('/api/v1/auth'));
    }
    if (shouldUseMockService('member')) {
      this.services.set('member', new MockMemberService('/api/v1/members'));
    } else {
      this.services.set('member', new MemberService('/api/v1/members'));
    }
    if (shouldUseMockService('moneyDesktop')) {
      this.services.set('moneyDesktop', new MockMoneyDesktopService('/api/money-desktop'));
    } else {
      this.services.set('moneyDesktop', new MoneyDesktopService('/api/money-desktop'));
    }
    if (shouldUseMockService('settings')) {
      this.services.set('settings', new MockSettingsService('/api/v1/settings'));
    } else {
      this.services.set('settings', new SettingsService('/api/v1/settings'));
    }
  }
  getAuthService(): IAuthService {
    const service = this.services.get('auth');
    if (!service) {
      throw new Error('AuthService not initialized');
    }
    return service as IAuthService;
  }
  getMemberService(): IMemberService {
    const service = this.services.get('member');
    if (!service) {
      throw new Error('MemberService not initialized');
    }
    return service as IMemberService;
  }
  getMoneyDesktopService(): IMoneyDesktopService {
    const service = this.services.get('moneyDesktop');
    if (!service) {
      throw new Error('MoneyDesktopService not initialized');
    }
    return service as IMoneyDesktopService;
  }
  getSettingsService(): ISettingsService {
    const service = this.services.get('settings');
    if (!service) {
      throw new Error('SettingsService not initialized');
    }
    return service as ISettingsService;
  }
}

// Export service instances
export const authService = ServiceFactory.getInstance().getAuthService();
export const memberService = ServiceFactory.getInstance().getMemberService();
export const settingsService = ServiceFactory.getInstance().getSettingsService();
export const moneyDesktopService = ServiceFactory.getInstance().getMoneyDesktopService();