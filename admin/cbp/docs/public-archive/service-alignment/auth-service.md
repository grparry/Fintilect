# Authentication Service API Alignment

## Current TypeScript Implementation

### Base URL
```typescript
// From AuthService.ts
api/v1/auth
```

### Endpoints Called
```typescript
// IAuthService interface
POST   /login                 - Authenticate user with credentials
POST   /logout                - End current user session
POST   /token/refresh         - Refresh authentication token
GET    /session              - Get current session information
GET    /session/validate     - Validate current authentication status
GET    /sessions             - Get all active user sessions
DELETE /sessions/:id         - Terminate specific session
DELETE /sessions/others      - Terminate all sessions except current
```

### TypeScript Types Used
```typescript
interface LoginCredentials {
  username: string;
  password: string;
  clientId?: string;
}

interface AuthenticationResponse {
  user: User;
  tokens: TokenResponse;
  permissions?: string[];
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface SessionInfo {
  user: User;
  permissions: string[];
  expiresAt: string;
}

interface UserSession {
  id: string;
  userId: string;
  clientId: string;
  lastActivity: string;
  deviceInfo: {
    browser: string;
    os: string;
    ip: string;
  };
}
```

## C# Implementation

### Controller Location
```csharp
// No dedicated AuthController found in:
legacy/legacy-apis/cbp.admin-cu-api/ConnectBillPay.AdminCuApi/Controllers/
```

### Available Endpoints
```csharp
// No direct authentication endpoints found
// Authentication might be handled through:
// 1. Identity Server
// 2. ASP.NET Core Identity
// 3. Custom middleware
```

### C# Types
```csharp
// No corresponding C# types found
// Need to verify if these exist in other assemblies
```

## Gaps and Actions Needed

### Missing Endpoints
1. Authentication
   - Login endpoint
   - Logout endpoint
   - Token refresh endpoint
   
2. Session Management
   - Session validation
   - Session retrieval
   - Session termination
   - Multiple session handling

### Type Mismatches
1. Missing C# Models
   - Need authentication request/response types
   - Need session management types
   - Need token types

2. Potential Differences
   - Token handling might differ
   - Session storage approach might vary
   - Permission structure might be different

### Suggested Changes

1. API Implementation
   - Create dedicated AuthController
   - Implement all missing endpoints
   - Consider using ASP.NET Core Identity

2. Type Alignment
   - Create matching C# models
   - Ensure consistent token handling
   - Document type transformations

3. Security Considerations
   - Implement proper token validation
   - Add rate limiting for auth endpoints
   - Add security headers
   - Implement proper session management

## Questions for Team Discussion

1. Authentication Framework
   - Which auth framework is currently used?
   - Should we use Identity Server?
   - How to handle legacy authentication?

2. Session Management
   - How are sessions currently tracked?
   - Where is session data stored?
   - What is the session timeout policy?

3. Token Strategy
   - JWT vs other token types?
   - Token lifetime and refresh strategy?
   - Token storage and transmission?

4. Migration Path
   - How to handle existing sessions?
   - What is the timeline for new auth system?
   - How to handle auth during transition?
