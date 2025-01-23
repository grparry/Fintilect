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
        await this.delay();
        
        const user = this.users.find(u => 
            u.username === credentials.username && 
            u.password === credentials.password
        );

        if (!user) {
            this.createError('Invalid username or password');
        }

        // Don't include password in the tokens or session
        const { password, ...userWithoutPassword } = user;

        const tokens = await this.generateTokens();
        this.currentUser = {
            ...userWithoutPassword,
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

        return this.createResponse({
            sessionId: 'mock-session-id',
            expiresAt: Date.now() + 3600000, // 1 hour from now
            user: this.currentUser,
            tokens
        });
    }

    async logout(): Promise<void> {
        try {
            await this.delay();
            
            if (!this.currentUser) {
                this.createError('No active session');
                return null as never;
            }

            this.currentUser = null;
            this.currentSession = null;
            return this.createResponse<void>(undefined);
        } catch (error) {
            logger.error(`Mock logout failed: ${(error as Error).message}`);
            this.createError('Logout failed');
            return null as never;
        }
    }

    async refreshToken(): Promise<TokenResponse> {
        try {
            await this.delay();
            
            if (!this.currentSession) {
                this.createError('No active session');
                return null as never;
            }

            const tokens = await this.generateTokens();
            return this.createResponse(tokens);
        } catch (error) {
            logger.error(`Mock token refresh failed: ${(error as Error).message}`);
            this.createError('Token refresh failed');
            return null as never;
        }
    }

    async getCurrentSession(): Promise<SessionInfo | null> {
        try {
            return this.createResponse(this.currentSession);
        } catch (error) {
            logger.error(`Mock get current session failed: ${(error as Error).message}`);
            this.createError('Failed to get current session');
            return null as never;
        }
    }

    async isAuthenticated(): Promise<boolean> {
        try {
            return this.createResponse(!!this.currentSession);
        } catch (error) {
            logger.error(`Mock isAuthenticated check failed: ${(error as Error).message}`);
            this.createError('Failed to check authentication');
            return null as never;
        }
    }

    async getActiveSessions(): Promise<UserSession[]> {
        try {
            return this.createResponse(this.activeSessions);
        } catch (error) {
            logger.error(`Mock getActiveSessions failed: ${(error as Error).message}`);
            this.createError('Failed to get active sessions');
            return null as never;
        }
    }

    async getAllSessions(): Promise<UserSession[]> {
        try {
            return this.createResponse(this.activeSessions);
        } catch (error) {
            logger.error(`Mock get all sessions failed: ${(error as Error).message}`);
            this.createError('Failed to get all sessions');
            return null as never;
        }
    }

    async terminateSession(sessionId: string): Promise<void> {
        try {
            await this.delay();
            
            const sessionIndex = this.activeSessions.findIndex(s => s.id === sessionId);
            if (sessionIndex === -1) {
                this.createError('Session not found');
                return null as never;
            }

            this.activeSessions.splice(sessionIndex, 1);
            return this.createResponse<void>(undefined);
        } catch (error) {
            logger.error(`Mock terminate session failed: ${(error as Error).message}`);
            this.createError('Failed to terminate session');
            return null as never;
        }
    }

    async terminateOtherSessions(): Promise<void> {
        try {
            await this.delay();
            if (!this.currentSession) {
                this.createError('No active session');
                return null as never;
            }
            
            // Keep only the current session
            this.activeSessions = this.activeSessions.filter(
                s => s.id === this.currentSession?.id
            );

            return this.createResponse<void>(undefined);
        } catch (error) {
            logger.error(`Mock terminateOtherSessions failed: ${(error as Error).message}`);
            this.createError('Failed to terminate other sessions');
            return null as never;
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
