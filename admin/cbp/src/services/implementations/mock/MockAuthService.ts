import { IAuthService } from '../../interfaces/IAuthService';
import {
  LoginCredentials,
  TokenResponse,
  AuthenticationResponse,
  SessionInfo,
  UserSession
} from '../../../types/auth.types';
import { mockUsers } from './data/users/mockUserData';
import { AuthError } from '../../../utils/errors';
import { ServiceFactory } from '../../factory/ServiceFactory';

export class MockAuthService implements IAuthService {
  private currentSession: SessionInfo | null = null;
  private activeSessions: UserSession[] = [];
  private mockTokens: TokenResponse = {
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
    expiresIn: 3600
  };
  readonly basePath: string;
  constructor(basePath: string) {
    this.basePath = basePath;
  }
  async login(credentials: LoginCredentials): Promise<AuthenticationResponse> {
    const user = mockUsers.find(u => u.externalId === credentials.username);
    if (!user) {
      throw new AuthError('Invalid credentials', 'AUTH_001');
    }
    
    // Get user's permissions through the permission service
    const permissions = await this.getUserPermissions(user.id);
    
    const session: UserSession = {
      id: '1',
      userId: user.id.toString(),
      clientId: user.customerId.toString(),
      lastActivity: new Date().toISOString(),
      deviceInfo: {
        browser: 'Chrome',
        os: 'macOS',
        ip: '127.0.0.1'
      }
    };
    this.activeSessions.push(session);
    this.currentSession = {
      user,
      permissions,
      expiresAt: new Date(Date.now() + 3600000).toISOString()
    };
    return {
      user,
      tokens: this.mockTokens,
      permissions
    };
  }
  async logout(): Promise<void> {
    this.currentSession = null;
    this.activeSessions = [];
  }
  async refreshToken(): Promise<TokenResponse> {
    if (!this.currentSession) {
      throw new AuthError('No active session', 'AUTH_002');
    }
    return {
      ...this.mockTokens,
      expiresIn: 3600
    };
  }
  async getCurrentSession(): Promise<SessionInfo | null> {
    return this.currentSession;
  }
  async isAuthenticated(): Promise<boolean> {
    return this.currentSession !== null;
  }
  async getActiveSessions(): Promise<UserSession[]> {
    return this.activeSessions;
  }
  async terminateSession(sessionId: string): Promise<void> {
    const sessionIndex = this.activeSessions.findIndex(s => s.id === sessionId);
    if (sessionIndex === -1) {
      throw new AuthError('Session not found', 'AUTH_003');
    }
    this.activeSessions.splice(sessionIndex, 1);
    if (this.currentSession && this.activeSessions.length === 0) {
      this.currentSession = null;
    }
  }
  async terminateOtherSessions(): Promise<void> {
    if (!this.currentSession) {
      throw new AuthError('No active session', 'AUTH_004');
    }
    const currentSessionId = this.activeSessions.find(s => 
      s.userId === this.currentSession?.user.id.toString()
    )?.id;
    if (currentSessionId) {
      this.activeSessions = this.activeSessions.filter(s => s.id === currentSessionId);
    } else {
      this.activeSessions = [];
    }
  }
  private async getUserPermissions(userId: number): Promise<string[]> {
    // Get the permission service
    const permissionService = ServiceFactory.getInstance().getPermissionService();
    
    // Get user's permissions
    const userPermissions = await permissionService.getUserPermissions(userId);
    
    // Convert roles to permissions (in a real implementation, this would map to actual permissions)
    return userPermissions.roles.map((role) => `role:${role.name.toLowerCase()}`);
  }
}