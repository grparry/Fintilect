# CSharp API Gaps

This document tracks possible gaps between the new admin interface requirements and the CSharp API capabilities. These gaps represent features or data fields that are needed in the new admin interface but are not currently supported by the CSharp API.

## Credit Union Information

### Sponsor Details Management
✅ Available:
- Sponsor ID (sponsorId)
- Sponsor Name (sponsorName)

❌ Missing:
- Sponsor Prefix

### Settlement Information
✅ Available:
- Routing Number (routingId)

❌ Missing:
- Settlement GL Code
- Settlement External ACH Number
- Clear definition of wrgAccountNumber purpose and relationship to settlement

### Operating Hours Configuration
❌ Missing:
- Primary business hours
- After hours contact information

### Staff Contact Information
❌ Missing:
- Staff contact list with roles
- Role-based contact management

## Holiday Management

❌ Missing Holiday Management Features:
- Complete holiday management system including:
  - Holiday Type definitions (FEDERAL, STATE, BANK)
  - Holiday CRUD operations
  - Holiday status tracking
  - Holiday date management with descriptions
  - Creation and update timestamp tracking

### Required Types Not in API
```typescript
enum HolidayType {
  FEDERAL = 'FEDERAL',
  STATE = 'STATE',
  BANK = 'BANK'
}

interface Holiday {
  id: number;
  name: string;
  date: string;
  type: HolidayType;
  description?: string;
  status: HolidayStatus;
  createdAt?: string;
  updatedAt?: string;
}
```

## Notifications

❌ Possible Missing Notification Features:
- Notification template management:
  - Template CRUD operations
  - Variable management
  - Template activation/deactivation
- Delivery settings configuration:
  - Email and SMS settings
  - Default recipients
  - Retry policy configuration
- Notification monitoring:
  - Delivery statistics
  - Failure tracking
  - Performance metrics

### Required Types Not in API
```typescript
interface NotificationTemplate {
  id: number;
  name: string;
  description?: string;
  subject: string;
  body: string;
  type: 'email' | 'sms';
  variables: string[];
  isActive: boolean;
}

interface DeliverySettings {
  emailEnabled: boolean;
  smsEnabled: boolean;
  defaultRecipients: string[];
  retryAttempts: number;
  retryInterval: number;
}

interface NotificationStats {
  totalSent: number;
  totalFailed: number;
  deliveryRate: number;
  averageDeliveryTime: number;
}
```

Note: While the API has basic support notification endpoints (/notification/send/*), we did not see endpoints for template management and delivery configuration features.

## Authentication

❌ Possible Missing API Features:
- Authentication endpoints for:
  - User login/logout
  - Token refresh
  - Session management
  - User context and permissions API

## Permission Management

❌ Missing Permission Management Endpoints:
- CRUD operations for permissions and permission groups:
  - Create/Update/Delete permission groups
  - Assign/Revoke permissions to groups
  - Add/Remove users from groups
- Permission validation:
  - Check user permissions
  - Validate group permissions
  - Check resource access

### Required Types in API
```typescript
interface PermissionGroup {
  id: number;
  name: string;
  description: string;
  permissions: PermissionCategory;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: PermissionCategoryType;
  actions: PermissionAction[];
  createdAt: string;
  updatedAt: string;
}

type PermissionAction = 'view' | 'edit' | 'delete' | 'process' | 'approve' | 'export' | 'create';
type PermissionCategoryType = 'System' | 'BillPay' | 'Client' | 'MoneyDesktop' | 'Users' | 'Security' | 'Settings' | 'Reports';
```

Note: The API needs endpoints for managing permissions and permission groups to support role-based access control.

## Configuration and Common Types

❌ Missing Configuration and Common Types Features:
- Configuration categories (BILL_PAY, SYSTEM, SECURITY, NOTIFICATIONS)
- Type validation for configuration values
- Configuration audit tracking (lastUpdated, updatedBy)
- Configuration search and filtering by category

### Required Types Not in API
```typescript
interface SystemConfigurationItem {
  key: string;
  value: string | number | boolean;
  category: string;
  lastUpdated: string;
  updatedBy: string;
}

interface ConfigurationUpdate {
  key: string;
  value: ConfigurationValue;
  category: ConfigurationCategory;
}
```

Note: The core CBP API has a `/configuration/all` endpoint, but we need clarification from the C# team about how it should be used for bill pay settings.

❌ Missing Bill Pay Configuration Features:
- Comprehensive bill pay settings management including:
  - Processing cutoff time configuration
  - Daily and transaction limit settings
  - Weekend processing configuration
  - Dual approval requirements
  - Retry attempt configuration
  - Notification settings (email and general)

### Required Types Not in API
```typescript
interface BillPayConfig {
  id: string;
  cutoffTime: string;
  maxDailyLimit: number;
  maxTransactionLimit: number;
  allowWeekendProcessing: boolean;
  requireDualApproval: boolean;
  retryAttempts: number;
  notificationEmail: string;
  enableEmailNotifications: boolean;
}
```

## Security

❌ Possible Missing Security Features:
- Comprehensive security settings management:
  - Password policy configuration
  - Login policy settings
  - IP whitelist management
  - MFA configuration
  - Audit log settings
  - Security alert configuration
- Security metrics and monitoring:
  - Login attempt tracking
  - MFA usage statistics
  - Password reset metrics
  - Risk level assessments
- Security event handling:
  - Risk assessment endpoints
  - Security alert management
  - Access attempt logging

### Required Types Not in API
```typescript
interface SecuritySettings {
  passwordPolicy: PasswordPolicy;
  loginPolicy: LoginPolicy;
  ipWhitelist: IPWhitelist;
  mfaSettings: MFASettings;
  auditSettings: AuditSettings;
  alertSettings: AlertSettings;
}

interface SecurityMetrics {
  loginAttempts: {
    successful: number;
    failed: number;
    locked: number;
  };
  mfaUsage: {
    enabled: number;
    disabled: number;
    byMethod: Record<MFAMethod, number>;
  };
  passwordResets: {
    selfService: number;
    adminInitiated: number;
    forgotten: number;
  };
}
```

## Security Settings API Gaps

The following TypeScript interfaces are defined but their corresponding C# models are not found in the C# APIs:

### BillPaySecuritySettings
```typescript
interface BillPaySecuritySettings {
    passwordPolicy: BillPayPasswordPolicy;
    loginPolicy: BillPayLoginPolicy;
    ipWhitelist: BillPayIPWhitelist;
    otpSettings: BillPayOTPSettings;
    etag?: string;
}
```

### BillPayOTPMethod
```typescript
enum BillPayOTPMethod {
    EMAIL = 'email',
    SMS = 'sms'
}
```

### BillPaySecurityValidation
```typescript
interface BillPaySecurityValidation {
    isValid: boolean;
    errors: Record<string, unknown>;
}
```

**Note**: These security settings may be part of the `/configuration/all` endpoint's response. Need to verify the actual shape of the security configuration data returned by this endpoint.

**Action Items**:
1. Verify if these security settings exist in the `/configuration/all` endpoint response
2. If found, ensure the TypeScript types match the actual API response structure
3. If not found, determine if these are new features that need to be added to the API

## Reporting Documentation

❌ Missing Documentation for Report Endpoint:
- The `/api/v1/report/run` endpoint accepts stored procedures but lacks:
  - List of available stored procedures
  - Required arguments for each procedure
  - Expected return types/schemas
  - Argument validation rules
  - Example requests and responses

### Required Documentation
```typescript
// Example of what the documentation should specify for each stored procedure
interface StoredProcedureSpec {
  name: string;
  description: string;
  arguments: {
    [key: string]: {
      type: string;
      required: boolean;
      description: string;
      validation?: string;
    }
  };
  returnSchema: {
    type: string;
    properties: Record<string, unknown>;
  };
}
```

Note: While the reporting endpoint exists, its documentation needs to be enhanced to specify the available stored procedures and their requirements.

## Next Steps
1. Evaluate if these features should be added to the C# API
2. Determine if any of these settings are handled through other means (e.g., environment variables, config files)
