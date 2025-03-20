# Security Service API Alignment

## Service Organization

Security functionality is split across three main services:

1. Authentication Service (`IAuthService`)
   - User authentication
   - Session management
   - Token operations

2. Security Service (`ISecurityService`)
   - Security settings
   - Security monitoring
   - Access control

3. Audit Service (`IAuditService`)
   - Event logging
   - Audit trail
   - Log retrieval

## C# Implementation (Source of Truth)

No direct security controllers found in admin-cu-api. Security functionality may be:
1. Handled by middleware/filters
2. Implemented in a different service
3. Not yet implemented in C#

## TypeScript Implementation Requirements

### Authentication Service Requirements

```typescript
interface IAuthService {
    /**
     * Authenticate user with credentials
     * @param credentials User login credentials
     * @returns Authentication response with tokens and user info
     */
    login(credentials: LoginCredentials): Promise<AuthenticationResponse>;

    /**
     * End current user session
     * @returns Promise resolving when logout is complete
     */
    logout(): Promise<void>;

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
}
```

### Security Service Requirements

```typescript
interface ISecurityService {
    /**
     * Get security settings
     * @returns Current security settings
     */
    getSecuritySettings(): Promise<SecuritySettings>;

    /**
     * Update security settings
     * @param settings Updated security settings
     * @returns Updated settings
     */
    updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<SecuritySettings>;

    /**
     * Get security policies
     * @returns List of security policies
     */
    getSecurityPolicies(): Promise<SecurityPolicy[]>;

    /**
     * Update security policy
     * @param policyId Policy identifier
     * @param policy Updated policy
     * @returns Updated policy
     */
    updateSecurityPolicy(policyId: string, policy: Partial<SecurityPolicy>): Promise<SecurityPolicy>;

    /**
     * Perform security risk assessment
     * @param context Context for risk assessment
     * @returns Risk assessment results
     */
    performRiskAssessment(context: Record<string, unknown>): Promise<RiskAssessment>;

    /**
     * Get recent access attempts
     * @param userId Optional user ID to filter by
     * @returns List of recent access attempts
     */
    getRecentAccessAttempts(userId?: string): Promise<AccessAttempt[]>;

    /**
     * Get security metrics
     * @param timeframe Timeframe for metrics
     * @returns Security metrics
     */
    getSecurityMetrics(timeframe: 'day' | 'week' | 'month'): Promise<Record<string, number>>;
}
```

### Audit Service Requirements

```typescript
interface IAuditService {
    /**
     * Log an audit event
     * @param event Event details to log
     */
    logEvent(event: AuditEvent): Promise<void>;

    /**
     * Get audit events for a specific resource
     * @param resourceId Resource identifier
     * @returns List of audit events
     */
    getEvents(resourceId: string): Promise<AuditEvent[]>;

    /**
     * Search audit logs with filtering and pagination
     * @param filters Search filters
     * @returns Paginated list of audit events
     */
    searchLogs(filters: AuditLogFilters): Promise<PaginatedResponse<AuditEvent>>;

    /**
     * Get audit event details
     * @param eventId Event identifier
     * @returns Audit event details
     */
    getEventDetails(eventId: string): Promise<AuditEvent>;

    /**
     * Export audit logs based on filters
     * @param filters Export filters
     * @returns URL to download exported logs
     */
    exportLogs(filters: AuditLogFilters): Promise<string>;
}
```

## Implementation Notes

1. Service Organization
   - Keep authentication, security, and audit services separate
   - Each service has distinct responsibilities
   - Maintain clear boundaries between services

2. Authentication
   - Token-based authentication
   - Session management
   - Token refresh flow

3. Security
   - Policy-based access control
   - Risk assessment
   - Security metrics and monitoring

4. Audit
   - Comprehensive event logging
   - Structured audit data
   - Export capabilities

5. C# Implementation Needed
   - Endpoints for authentication flows
   - Security policy management
   - Audit logging and retrieval
   - Consider using ASP.NET Core Identity
