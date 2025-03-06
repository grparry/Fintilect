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
    constructor(basePath: string) {
        super(basePath);
    }
    async login(credentials: LoginCredentials): Promise<AuthenticationResponse> {
        try {
            const url = `${this.basePath}/Authentication/tenant/login`;
            logger.info(`AuthService: Attempting login to ${url} - username: ${credentials.username}, tenantId: ${credentials.tenantId}`);
            const requestBody = {
                username: credentials.username,
                password: credentials.password,
                tenantId: credentials.tenantId
            };
            logger.info('AuthService: Login request details', JSON.stringify({
                url,
                headers: { 'Content-Type': 'application/json' },
                body: requestBody
            }));
            const response = await this.post<AuthenticationResponse>('/Authentication/tenant/login', requestBody);
            logger.info(`AuthService: Login successful - ${JSON.stringify(response)}`);
            logger.info('AuthService: User roles:', JSON.stringify({
                roles: response.roles,
                username: response.user.username
            }));
            return response;
        } catch (error) {
            logger.error(`AuthService: Login failed - username: ${credentials.username}, tenantId: ${credentials.tenantId}, url: ${this.basePath}/Authentication/tenant/login, error: ${error}`);
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