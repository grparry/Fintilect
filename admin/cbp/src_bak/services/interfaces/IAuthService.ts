import { IBaseService } from './IBaseService';
import { 
    AuthenticationResponse, 
    LoginCredentials,
    SessionInfo,
    TokenResponse,
    UserSession
} from '../../types/auth.types';

/**


/**
 * Interface for authentication service operations
 * Handles user authentication, session management, and token operations
 */
    /**
     * Authenticate user with credentials
     * @param credentials User login credentials
     * @returns Authentication response with tokens and user info
     */

    /**
     * End current user session
     * @returns Promise resolving when logout is complete
     */

    /**
     * Refresh the current authentication token
     * @returns New token response
     */

    /**
     * Get current session information
     * @returns Current session info or null if no active session
     */

    /**
     * Validate current authentication status
     * @returns True if user is authenticated
     */

    /**
     * Get all active sessions for current user
     * @returns List of active user sessions
     */

    /**
     * Terminate a specific session
     * @param sessionId ID of session to terminate
     * @returns Promise resolving when session is terminated
     */

    /**
     * Terminate all sessions except current
     * @returns Promise resolving when all other sessions are terminated
     */
