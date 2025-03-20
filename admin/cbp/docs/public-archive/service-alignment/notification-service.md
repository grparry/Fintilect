# Notification Service API Alignment

## Current TypeScript Implementation

### Base URL
```typescript
// From NotificationService.ts
api/v1/notification
```

### Endpoints Called
```typescript
// Core Notification Management
GET    /notification/:id           - Get notification by ID
GET    /notification              - Get all notifications
POST   /notification              - Create new notification
DELETE /notification/:id          - Delete notification
POST   /notification/saved/clear  - Clear saved notifications

// Template Management (Not in C# API)
GET    /notification/template/:id  - Get template by ID
GET    /notification/templates    - Get all templates
POST   /notification/template     - Create template
PUT    /notification/template/:id - Update template
DELETE /notification/template/:id - Delete template
```

### TypeScript Types Used
```typescript
// Core Types
interface NotificationRequest {
  type: NotificationType;
  recipientId: string;
  data: Record<string, any>;
  channel?: 'email' | 'sms';
  priority?: 'high' | 'normal' | 'low';
}

interface NotificationResponse {
  id: string;
  recipientId: string;
  type: NotificationType;
  status: 'SENT' | 'DELIVERED' | 'FAILED';
  channel: 'email' | 'sms';
  sentAt: string;
  deliveredAt?: string;
  error?: string;
}

// Template Types (Not in C# API)
interface NotificationTemplate {
  id: number;
  name: string;
  type: NotificationType;
  category: NotificationCategory;
  subject: string;
  content: string;
  active: boolean;
  lastModified: string;
  variables?: NotificationVariable[];
}

interface NotificationConfig {
  providers: {
    email: {
      enabled: boolean;
      provider: string;
      apiKey: string;
      fromEmail: string;
      templates: Record<NotificationType, string>;
    };
    sms: {
      enabled: boolean;
      provider: string;
      apiKey: string;
      fromNumber: string;
      templates: Record<NotificationType, string>;
    };
  };
  defaultChannel: 'email' | 'sms';
}
```

## C# Implementation

### Controller Location
```csharp
// NotificationController found in:
legacy/legacy-apis/cbp.admin-cu-api/ConnectBillPay.AdminCuApi/Controllers/NotificationController.cs
```

### Available Endpoints
```csharp
// Core Notification Management
GET    /api/v1/notification/{id}      - Get notification by ID
GET    /api/v1/notification           - Get all notifications
POST   /api/v1/notification           - Create notification
DELETE /api/v1/notification/{id}      - Delete notification
POST   /api/v1/notification/saved/clear - Clear saved notifications

// Notification Sending
POST   /api/v1/notification/send          - Send notification by status code
POST   /api/v1/notification/send/customer - Send customer notification
POST   /api/v1/notification/send/support  - Send support notification

// Configuration
GET    /api/v1/notification/configured    - Get configured notifications
```

### C# Types
```csharp
// Request/Response types in:
// - Requests.Notification.NotificationCreateRequest
// - Requests.Notification.SavedNotificationClearRequest
// - Requests.Notification.NotificationSendCustomerRequest
// - Requests.Notification.NotificationSendRequest
// - Requests.Notification.NotificationSendSupportRequest
// - ConnectBillPay.Responses.NotificationResponse
// - ConnectBillPay.Responses.NotificationListResponse
```

## Implementation Gaps

1. Template Management
   - C# API lacks template CRUD operations
   - No template storage or retrieval endpoints
   - Missing template validation and variable handling
   - No template-to-notification binding

2. Provider Configuration
   - TypeScript expects provider-specific settings
   - C# implementation details unclear for:
     - Email provider configuration
     - SMS provider configuration
     - Template mapping

3. Channel Support
   - TypeScript supports email and SMS channels
   - C# implementation unclear about channel handling
   - Need to verify multi-channel delivery support

## Questions for Team Discussion

1. Template Management
   - How are notification templates currently managed?
   - Where are templates stored and maintained?
   - How are template variables handled?

2. Provider Integration
   - Which email/SMS providers are supported?
   - How is provider configuration managed?
   - How are templates mapped to providers?

3. Channel Support
   - Is multi-channel delivery supported?
   - How is channel selection handled?
   - What is the default channel strategy?
