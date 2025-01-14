import { IAuthService } from '../../interfaces/IAuthService';
import { 
    LoginCredentials, 
    AuthenticationResponse,
    TokenResponse,
    SessionInfo,
    UserSession
} from '../../../types/auth.types';
import { User } from '../../../types/client.types';
import { BaseMockService } from './BaseMockService';
import { mockUsers } from './data/users/mockUserData';
import logger from '../../../utils/logger';

export class MockAuthService extends BaseMockService implements IAuthService {
    private currentSession: SessionInfo | null = null;
    private activeSessions: UserSession[] = [];
    private users = [...mockUsers];
    private currentUser: User | null = null;

    constructor(basePath: string = '/api/v1/auth') {
        super(basePath);
    }

    async login(credentials: LoginCredentials): Promise<AuthenticationResponse> {
        try {
            await this.delay();
            
            const user = this.users.find(u => u.username === credentials.username);
            if (!user) {
                return this.createError('Invalid credentials', 401);
            }

            const tokens = await this.generateTokens();
            this.currentUser = {
                ...user,
                clientId: 'default-client',
                department: 'default-department'
            };
            
            this.currentSession = {
                id: 'mock-session-' + Date.now(),
                user: this.currentUser,
                startedAt: Date.now(),
                expiresAt: Date.now() + 3600000,
                lastActivity: Date.now()
            };

            const response: AuthenticationResponse = {
                sessionId: 'mock-session-id',
                expiresAt: Date.now() + 3600000, // 1 hour from now
                user: {
                    ...this.currentUser,
                    clientId: 'default-client'  // Ensure clientId is always set
                },
                tokens
            };

            return this.createResponse(response);
        } catch (error) {
            logger.error(`Mock login failed for user ${credentials.username}: ${error}`);
            throw this.createError('Login failed', 401);
        }
    }

    async logout(): Promise<void> {
        try {
            await this.delay();
            
            if (!this.currentUser) {
                return this.createError('No active session', 401);
            }

            this.currentUser = null;
            this.currentSession = null;

            return this.createResponse<void>(undefined);
        } catch (error) {
            logger.error(`Mock logout failed: ${error}`);
            throw this.createError('Logout failed', 500);
        }
    }

    async refreshToken(): Promise<TokenResponse> {
        try {
            await this.delay();
            
            if (!this.currentSession) {
                return this.createError('No active session', 401);
            }

            const tokens = await this.generateTokens();
            return this.createResponse(tokens);
        } catch (error) {
            logger.error(`Mock token refresh failed: ${error}`);
            throw this.createError('Token refresh failed', 500);
        }
    }

    async getCurrentSession(): Promise<SessionInfo | null> {
        try {
            await this.delay();
            return this.createResponse(this.currentSession);
        } catch (error) {
            logger.error(`Mock get current session failed: ${error}`);
            return null;
        }
    }

    async isAuthenticated(): Promise<boolean> {
        try {
            await this.delay();
            return this.createResponse(!!this.currentSession);
        } catch (error) {
            logger.error(`Mock isAuthenticated check failed: ${error}`);
            return false;
        }
    }

    async getActiveSessions(): Promise<UserSession[]> {
        try {
            await this.delay();
            return this.createResponse(this.activeSessions);
        } catch (error) {
            logger.error(`Mock getActiveSessions failed: ${error}`);
            return [];
        }
    }

    async getAllSessions(): Promise<UserSession[]> {
        try {
            await this.delay();
            return this.createResponse(this.activeSessions);
        } catch (error) {
            logger.error(`Mock get all sessions failed: ${error}`);
            throw this.createError('Failed to get sessions', 500);
        }
    }

    async terminateSession(sessionId: string): Promise<void> {
        try {
            await this.delay();
            
            const sessionIndex = this.activeSessions.findIndex(s => s.id === sessionId);
            if (sessionIndex === -1) {
                return this.createError('Session not found', 404);
            }

            this.activeSessions.splice(sessionIndex, 1);
            return this.createResponse<void>(undefined);
        } catch (error) {
            logger.error(`Mock terminate session failed: ${error}`);
            throw this.createError('Failed to terminate session', 500);
        }
    }

    async terminateOtherSessions(): Promise<void> {
        try {
            await this.delay();
            if (!this.currentSession) {
                return this.createError('No active session', 401);
            }
            
            // Keep only the current session
            this.activeSessions = this.activeSessions.filter(
                session => session.id === this.currentSession?.id
            );
            
            return this.createResponse<void>(undefined);
        } catch (error) {
            logger.error(`Mock terminateOtherSessions failed: ${error}`);
            throw this.createError('Failed to terminate other sessions', 500);
        }
    }

    private generateTokens(): Promise<TokenResponse> {
        return Promise.resolve({
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
            tokenType: 'Bearer',
            expiresAt: Date.now() + 3600000 // 1 hour from now
        });
    }
}
