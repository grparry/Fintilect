# Service API Alignment

## Current TypeScript Implementation

### Base URL
```typescript
// From ClientService.ts
api/v1/client
```

### Endpoints Called
```typescript
// IClientService interface
GET    /clients              - Get paginated list of clients
GET    /clients/:id          - Get specific client
POST   /clients             - Create client
PUT    /clients/:id         - Update client
DELETE /clients/:id         - Delete client
GET    /clients/:id/settings - Get client settings
PUT    /clients/:id/settings - Update client settings
GET    /clients/:id/config   - Get client configuration
PUT    /clients/:id/config   - Update client configuration
GET    /clients/:id/api-keys - Get client API keys
POST   /clients/:id/api-keys - Create API key
DELETE /clients/:id/api-keys/:keyId - Delete API key
```

### TypeScript Types Used
```typescript
// Core Types
interface Client {
  id: string;
  name: string;
  type: ClientType;
  status: ClientStatus;
  environment: Environment;
  domain?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  sponsorId?: string;
  sponsorName?: string;
  routingId?: string;
  settings: ClientSettings;
  createdAt?: string;
  updatedAt?: string;
}

interface ClientSettings {
  general: GeneralSettings;
  security: SecuritySettings;
  notifications: NotificationSettings;
}

interface ClientConfiguration {
  id: number;
  clientId: number;
  maxDailyLimit: number;
  maxTransactionLimit: number;
  allowWeekendProcessing: boolean;
  requireDualApproval: boolean;
  notificationEmail: string;
  lastModified: string;
}

// And many more types for users, roles, permissions, etc.
```

## C# Implementation

### Controller Location
```csharp
// No direct ClientController found
// Some functionality in CustomerController.cs at:
legacy/legacy-apis/cbp.admin-cu-api/ConnectBillPay.AdminCuApi/Controllers/CustomerController.cs
```

### Available Endpoints
```csharp
// CustomerController endpoints
POST   /api/v1/customer     - Create customer

// Missing most client management endpoints
```

### C# Types
```csharp
// CustomerCreateRequest
// CustomerCreateResponse
// Detailed type information not found in controller
```

## Gaps and Actions Needed

### Missing Endpoints
1. Client Management
   - GET /clients (list/search)
   - GET /client/:id (details)
   - PUT /client/:id (update)
   - DELETE /client/:id
   
2. Settings & Configuration
   - All settings endpoints missing
   - All configuration endpoints missing
   - API key management missing

3. User Management
   - All user management endpoints missing
   - Role and permission endpoints missing
   - Group management missing

### Type Mismatches
1. Entity Naming
   - TypeScript uses "Client"
   - C# uses "Customer"
   - Need to align on consistent terminology

2. Missing Types
   - Most TypeScript types have no C# equivalents
   - Need to create corresponding C# models for:
     - ClientSettings/CustomerSettings
     - ClientConfiguration/CustomerConfiguration
     - SecuritySettings
     - NotificationSettings

3. Enum Mismatches
   - ClientType/CustomerType not aligned
   - ClientStatus/CustomerStatus not aligned
   - Environment types may differ

### Suggested Changes

1. API Structure
   - Create dedicated ClientController in C# API
   - Implement all missing endpoints
   - Consider if Customer/Client should be separate concepts

2. Type Alignment
   - Create matching C# models for all TypeScript types
   - Ensure consistent naming between TypeScript and C#
   - Document type transformations

3. Feature Parity
   - Implement settings management
   - Add configuration endpoints
   - Add API key management
   - Add user/role management

## Questions for Team Discussion

1. Client vs Customer
   - Should these be separate concepts?
   - Which term should we standardize on?
   - What are the business implications?

2. Security Model
   - How should roles and permissions be implemented?
   - Should we use existing security framework?
   - How to handle API key security?

3. Migration Strategy
   - How to handle existing customer data?
   - What is the timeline for adding missing endpoints?
   - Should we version the new API endpoints?

4. Configuration Management
   - Where should configuration be stored?
   - How to handle environment-specific settings?
   - What validation rules are needed?
