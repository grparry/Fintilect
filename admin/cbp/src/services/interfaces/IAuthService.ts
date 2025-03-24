import { IBaseService } from './IBaseService';
import { 
    AuthenticationResponse, 
    LoginCredentials,
    SessionInfo,
    TokenResponse,
    UserSession
} from '../../types/auth.types';

/**
 * Interface for authentication service operations
 * Handles user authentication, session management, and token operations
 */
export interface IAuthService extends IBaseService {
    /**
     * Authenticate user with credentials
     * @param credentials User login credentials
     * @returns Authentication response with tokens and user info
     */
    login(credentials: LoginCredentials): Promise<AuthenticationResponse>;
    /**
     * Refresh the current authentication token
     * @returns New token response
     */
    refreshToken(): Promise<TokenResponse>;
    /**
     * Get current session information
     * @returns Current session info or null if no active session
     */
    getCurrentSession(): Promise<SessionInfo | null>;
    /**
     * Validate current authentication status
     * @returns True if user is authenticated
     */
    isAuthenticated(): Promise<boolean>;
    /**
     * Get all active sessions for current user
     * @returns List of active user sessions
     */
    getActiveSessions(): Promise<UserSession[]>;
    /**
     * Terminate a specific session
     * @param sessionId ID of session to terminate
     * @returns Promise resolving when session is terminated
     */
    terminateSession(sessionId: string): Promise<void>;
    /**
     * Terminate all sessions except current
     * @returns Promise resolving when all other sessions are terminated
     */
    terminateOtherSessions(): Promise<void>;
}