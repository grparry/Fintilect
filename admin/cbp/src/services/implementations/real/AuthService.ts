import { IAuthService } from '../../interfaces/IAuthService';
import { BaseService } from './BaseService';
import logger from '../../../utils/logger';
import { 
    AuthenticationResponse, 
    LoginCredentials,
    SessionInfo,
    TokenResponse,
    UserSession
} from '../../../types/auth.types';

export class AuthService extends BaseService implements IAuthService {
    constructor(basePath: string = '/api/v1/auth') {
        super(basePath);
    }
    async login(credentials: LoginCredentials): Promise<AuthenticationResponse> {
        try {
            return await this.post<AuthenticationResponse>('/login', credentials);
        } catch (error) {
            logger.error(`Login failed for user ${credentials.username}: ${error}`);
            throw error;
        }
    }
    async logout(): Promise<void> {
        try {
            await this.post<void>('/logout');
        } catch (error) {
            logger.error(`Logout failed: ${error}`);
            throw error;
        }
    }
    async refreshToken(): Promise<TokenResponse> {
        try {
            return await this.post<TokenResponse>('/refresh');
        } catch (error) {
            logger.error(`Token refresh failed: ${error}`);
            throw error;
        }
    }
    async getCurrentSession(): Promise<SessionInfo | null> {
        try {
            return await this.get<SessionInfo>('/session');
        } catch (error) {
            logger.error(`Failed to get current session: ${error}`);
            return null;
        }
    }
    async isAuthenticated(): Promise<boolean> {
        try {
            const session = await this.getCurrentSession();
            return session !== null;
        } catch {
            return false;
        }
    }
    async getActiveSessions(): Promise<UserSession[]> {
        try {
            return await this.get<UserSession[]>('/sessions');
        } catch (error) {
            logger.error(`Failed to get active sessions: ${error}`);
            throw error;
        }
    }
    async terminateSession(sessionId: string): Promise<void> {
        try {
            await this.delete<void>(`/sessions/${sessionId}`);
        } catch (error) {
            logger.error(`Failed to terminate session ${sessionId}: ${error}`);
            throw error;
        }
    }
    async terminateOtherSessions(): Promise<void> {
        try {
            await this.delete<void>('/sessions/others');
        } catch (error) {
            logger.error(`Failed to terminate other sessions: ${error}`);
            throw error;
        }
    }
}