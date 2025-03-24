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
  private users: Map<number, any> = new Map(mockUsers.map(user => [user.id, user]));
  private userRoles: Map<number, string[]> = new Map([
    [1, ['Admin', 'Manager', 'User']],
    [2, ['Manager', 'User']],
    [3, ['User']]
  ]);

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  async login(credentials: LoginCredentials): Promise<AuthenticationResponse> {
    const user = Array.from(this.users.values()).find(u => u.username === credentials.username);
    if (!user) {
      throw new AuthError('Invalid credentials', 'AUTH_001');
    }
    
    const roles = this.userRoles.get(user.id) || [];
    const session: UserSession = {
      id: '1',
      userId: user.id.toString(),
      clientId: user.clientId.toString(),
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
      permissions: roles,
      expiresAt: new Date(Date.now() + 3600000).toISOString()
    };
    return {
      user,
      token: this.mockTokens.accessToken,
      roles,
      expiresIn: this.mockTokens.expiresIn
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
    if (!this.currentSession) return null;
    return {
      ...this.currentSession,
      permissions: this.userRoles.get(this.currentSession.user.id) || []
    };
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
}