# CBP Configuration API - Data Model Specification

> Note: This specification defines the core data models. For related specifications, see:
> - Security rules and validation in [SECURITY_SPEC.md](./SECURITY_SPEC.md)
> - Performance optimization in [PERFORMANCE_SPEC.md](./PERFORMANCE_SPEC.md)
> - Business validation rules in [CONFIGURATION_SPEC.md](./CONFIGURATION_SPEC.md)

## Core Entities

### 1. Configuration
```typescript
interface Configuration {
  id: string;                    // UUID
  institutionId: string;         // Institution scope
  key: string;                   // Configuration key
  value: JsonValue;             // Configuration value
  version: number;              // Optimistic locking
  environment: string;          // Environment scope
  status: ConfigurationStatus;  // Active/Inactive
  metadata: ConfigurationMetadata;
  audit: ConfigurationAudit;
}

interface ConfigurationMetadata {
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  tags: string[];             // Configuration categorization tags
  sponsorId?: string;         // Credit union sponsor reference
}

interface ConfigurationAudit {
  changes: ChangeRecord[];
  comments: string[];
}

interface ChangeRecord {
  timestamp: Date;
  userId: string;
  action: string;
  oldValue?: JsonValue;
  newValue: JsonValue;
  reason?: string;
}

enum ConfigurationStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  ARCHIVED = 'ARCHIVED'
}

### Configuration Validation Rules
```typescript
// Validation rules for Configuration metadata
interface ConfigurationValidation {
  metadata: {
    tags: {
      rules: string[];           // ["Must be from approved taxonomy", "At least one tag required", "Maximum 5 tags"]
      approvedTags: string[];    // ["security", "performance", "feature-flag", "tenant-specific", "system-wide"]
    };
    sponsorId: {
      rules: string[];          // ["Required for tenant-specific", "Must be valid UUID", "Not allowed for global"]
      pattern: RegExp;          // UUID v4 pattern
    };
  };
  versioning: {
    rules: string[];           // ["Must increment", "Maintain history", "Archive old versions"]
    retention: {
      maxVersions: number;     // 10
      archiveDays: number;     // 90
    };
  };
  environment: {
    rules: string[];          // ["Must be valid", "Production needs approval", "Test auto-expires"]
    validEnvironments: string[]; // ["development", "test", "staging", "production"]
  };
}
```

### 2. Holiday Calendar
```typescript
// See CONFIGURATION_SPEC.md "Holiday Schedule Management" section for maintenance rules
// and "Payment Rules > Holiday handling" for processing behavior
interface HolidayCalendar {
  id: string;                    // UUID
  institutionId: string;         // Institution scope
  name: string;                  // Calendar name
  timezone: string;             // Institution timezone
  holidays: Holiday[];          // Holiday list
  recurrenceRules: Rule[];      // Recurrence patterns
  metadata: {
    validFrom: Date;
    validTo: Date;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
    sponsorId?: string;
  };
  status: CalendarStatus;       // See CalendarStatus enum
}

interface Holiday {
  id: string;                   // UUID
  name: string;                // Holiday name
  date: string;               // ISO 8601 date
  type: HolidayType;         // Federal/State/Local
  recurrence?: Rule;         // Optional recurrence pattern
  impact: ProcessingImpact;  // Processing impact
}

interface Rule {
  pattern: string;            // Recurrence pattern
  exceptions: string[];      // Exception dates
  validFrom: Date;          // Start date
  validTo: Date;           // End date
}
```

### 3. Processing Window
```typescript
interface ProcessingWindow {
  id: string;                    // UUID
  institutionId: string;         // Institution scope
  name: string;                  // Window name
  schedule: {
    start: string;              // ISO time
    end: string;               // ISO time
    timezone: string;          // Window timezone
    effectiveDate: Date;      // Start date
    expirationDate?: Date;   // Optional end date
  };
  exclusions: {
    holidays: boolean;
    maintenance: MaintenanceWindow[];
  };
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
    sponsorId?: string;
  };
  status: WindowStatus;
  override?: {
    reason: string;
    approvedBy: string;
    expiresAt: Date;
  };
}

interface MaintenanceWindow {
  id: string;                   // UUID
  start: Date;                 // Start time
  end: Date;                  // End time
  reason: string;            // Maintenance reason
  impact: ServiceImpact;    // Service impact
  notification?: {
    required: boolean;
    sentAt?: Date;
    recipients: string[];
  };
}
```

### 4. Institution
```typescript
interface Institution {
  id: string;                    // UUID
  name: string;                  // Institution name
  type: InstitutionType;        // Type of institution
  status: InstitutionStatus;    // Active/Inactive
  sponsorId?: string;           // Optional sponsor
  timezone: string;             // Primary timezone
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
  };
  settings: {
    features: FeatureFlags;
    limits: OperationLimits;
    notifications: NotificationPrefs;
  };
  hierarchy?: {
    parentId?: string;
    childIds: string[];
    level: number;
  };
}

interface FeatureFlags {
  [key: string]: {
    enabled: boolean;
    override?: {
      value: boolean;
      reason: string;
      expiresAt: Date;
    };
  };
}
```

### 5. Audit Log
```typescript
interface AuditLog {
  id: string;                    // UUID
  timestamp: Date;              // Event time
  entityType: string;          // Entity type
  entityId: string;           // Entity ID
  action: AuditAction;       // Action performed
  userId: string;           // Actor ID
  metadata: {
    institutionId: string;
    sponsorId?: string;
    environment: string;
    source: string;
  };
  changes: {
    field: string;
    oldValue?: any;
    newValue: any;
  }[];
  context: {
    requestId: string;
    sessionId: string;
    ipAddress: string;
  };
}
```

## Enums and Types

### 1. Status Enums
```typescript
enum ConfigurationStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  ARCHIVED = 'ARCHIVED'
}

enum CalendarStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DRAFT = 'DRAFT',
  ARCHIVED = 'ARCHIVED'
}

enum WindowStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  OVERRIDE = 'OVERRIDE'
}

enum InstitutionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING = 'PENDING'
}
```

### 2. Type Definitions
```typescript
enum HolidayType {
  FEDERAL = 'FEDERAL',
  STATE = 'STATE',
  LOCAL = 'LOCAL',
  CUSTOM = 'CUSTOM'
}

enum ProcessingImpact {
  FULL_DAY = 'FULL_DAY',
  PARTIAL_DAY = 'PARTIAL_DAY',
  NO_IMPACT = 'NO_IMPACT'
}

enum ServiceImpact {
  FULL_OUTAGE = 'FULL_OUTAGE',
  PARTIAL_OUTAGE = 'PARTIAL_OUTAGE',
  DEGRADED = 'DEGRADED',
  NO_IMPACT = 'NO_IMPACT'
}

enum AuditAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  ACTIVATE = 'ACTIVATE',
  DEACTIVATE = 'DEACTIVATE',
  OVERRIDE = 'OVERRIDE'
}
```

## Database Schema

### 1. Primary Tables
```sql
CREATE TABLE configurations (
  id UUID PRIMARY KEY,
  institution_id UUID NOT NULL,
  key VARCHAR(255) NOT NULL,
  value JSONB NOT NULL,
  version INTEGER NOT NULL,
  environment VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL,
  metadata JSONB NOT NULL,
  audit JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  UNIQUE(institution_id, key, environment)
);

CREATE TABLE holiday_calendars (
  id UUID PRIMARY KEY,
  institution_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  timezone VARCHAR(50) NOT NULL,
  holidays JSONB NOT NULL,
  recurrence_rules JSONB NOT NULL,
  metadata JSONB NOT NULL,
  status VARCHAR(20) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE processing_windows (
  id UUID PRIMARY KEY,
  institution_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  schedule JSONB NOT NULL,
  exclusions JSONB NOT NULL,
  metadata JSONB NOT NULL,
  status VARCHAR(20) NOT NULL,
  override JSONB,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE institutions (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL,
  sponsor_id UUID,
  timezone VARCHAR(50) NOT NULL,
  metadata JSONB NOT NULL,
  settings JSONB NOT NULL,
  hierarchy JSONB,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  timestamp TIMESTAMP NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  action VARCHAR(50) NOT NULL,
  user_id UUID NOT NULL,
  metadata JSONB NOT NULL,
  changes JSONB NOT NULL,
  context JSONB NOT NULL
);
```

### 2. Indexes
```sql
-- Configurations
CREATE INDEX idx_configurations_institution ON configurations(institution_id);
CREATE INDEX idx_configurations_key ON configurations(key);
CREATE INDEX idx_configurations_status ON configurations(status);
CREATE INDEX idx_configurations_updated ON configurations(updated_at);

-- Holiday Calendars
CREATE INDEX idx_calendars_institution ON holiday_calendars(institution_id);
CREATE INDEX idx_calendars_status ON holiday_calendars(status);
CREATE INDEX idx_calendars_date_range ON holiday_calendars USING GIN (metadata->'validFrom', metadata->'validTo');

-- Processing Windows
CREATE INDEX idx_windows_institution ON processing_windows(institution_id);
CREATE INDEX idx_windows_status ON processing_windows(status);
CREATE INDEX idx_windows_schedule ON processing_windows USING GIN (schedule);

-- Institutions
CREATE INDEX idx_institutions_sponsor ON institutions(sponsor_id);
CREATE INDEX idx_institutions_status ON institutions(status);
CREATE INDEX idx_institutions_hierarchy ON institutions USING GIN (hierarchy);

-- Audit Logs
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_timestamp ON audit_logs(timestamp);
CREATE INDEX idx_audit_user ON audit_logs(user_id);
```

## Data Integrity Rules

### 1. Validation Rules
```yaml
rules:
  configuration:
    key:
      - Max length: 255 characters
      - Pattern: ^[a-zA-Z0-9_.-]+$
      - No duplicates per institution/environment
    value:
      - Valid JSON
      - Max size: 1MB
      - Schema validation
    version:
      - Incremental
      - No gaps
      - No duplicates

  calendar:
    name:
      - Max length: 255 characters
      - No special characters
      - Unique per institution
    timezone:
      - Valid IANA timezone
      - Required
    dates:
      - ISO 8601 format
      - Future dates only
      - Max 2 years ahead

  window:
    name:
      - Max length: 255 characters
      - Unique per institution
    schedule:
      - Valid time format
      - No overlaps
      - Within business hours
    maintenance:
      - Future dates only
      - Max duration: 24 hours
      - Notification required
```

### 2. Referential Integrity
```yaml
constraints:
  institution:
    - Valid sponsor reference
    - Unique name
    - Valid timezone
    - Active status for operations

  hierarchy:
    - No circular references
    - Max depth: 5 levels
    - Valid parent references
    - Consistent sponsor chain

  audit:
    - Valid entity references
    - Valid user references
    - Complete change records
    - Consistent timestamps
