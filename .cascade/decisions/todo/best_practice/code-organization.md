# Code Organization TODO

## Overview
This TODO tracks the necessary changes to improve code organization and module patterns across the codebase.

**Created**: 2024-12-31T06:11:07-07:00
**Status**: Pending
**Priority**: High
**Category**: Architecture
**Related Pattern**: core/organization.md

## Current Issues

### 1. Component Organization
- **Issue**: Mixed patterns
- **Current**: Feature folders
- **Required**: Atomic design
- **Impact**: Poor reuse

### 2. Service Organization
- **Issue**: Flat structure
- **Current**: Single files
- **Required**: Domain modules
- **Impact**: Poor cohesion

### 3. Type Organization
- **Issue**: Mixed concerns
- **Current**: Feature files
- **Required**: Domain types
- **Impact**: Poor reuse

### 4. Module Boundaries
- **Issue**: Unclear boundaries
- **Current**: Mixed imports
- **Required**: Clear boundaries
- **Impact**: Poor isolation

### 5. Code Sharing
- **Issue**: Duplicate code
- **Current**: Copy-paste
- **Required**: Shared modules
- **Impact**: Poor maintenance

## Required Changes

### 1. Component Structure
```typescript
// src/components/index.ts
export * from './atoms';
export * from './molecules';
export * from './organisms';
export * from './templates';
export * from './pages';

// src/components/atoms/index.ts
export * from './Button';
export * from './Input';
export * from './Text';
export * from './Icon';

// src/components/molecules/index.ts
export * from './FormField';
export * from './SearchBar';
export * from './Card';
export * from './Menu';

// src/components/organisms/index.ts
export * from './Form';
export * from './Table';
export * from './Navigation';
export * from './Modal';

// src/components/templates/index.ts
export * from './Dashboard';
export * from './Settings';
export * from './Profile';
export * from './Auth';

// src/components/pages/index.ts
export * from './Home';
export * from './Admin';
export * from './Client';
export * from './Payment';
```

### 2. Service Structure
```typescript
// src/domains/payment/index.ts
export * from './payment.types';
export * from './payment.service';
export * from './payment.hooks';
export * from './payment.utils';

// src/domains/payment/payment.types.ts
export interface Payment {
  id: string;
  amount: number;
  status: PaymentStatus;
  date: Date;
}

export enum PaymentStatus {
  Pending = 'pending',
  Processing = 'processing',
  Completed = 'completed',
  Failed = 'failed'
}

// src/domains/payment/payment.service.ts
import { Payment, PaymentStatus } from './payment.types';
import { api } from '@/services/api';

export class PaymentService {
  static async getPayments(): Promise<Payment[]> {
    return api.get('/payments');
  }
  
  static async createPayment(payment: Omit<Payment, 'id'>): Promise<Payment> {
    return api.post('/payments', payment);
  }
  
  static async updatePayment(id: string, status: PaymentStatus): Promise<Payment> {
    return api.patch(`/payments/${id}`, { status });
  }
}

// src/domains/payment/payment.hooks.ts
import { useQuery, useMutation } from 'react-query';
import { PaymentService } from './payment.service';
import { Payment, PaymentStatus } from './payment.types';

export function usePayments() {
  return useQuery('payments', PaymentService.getPayments);
}

export function useCreatePayment() {
  return useMutation((payment: Omit<Payment, 'id'>) => 
    PaymentService.createPayment(payment)
  );
}

export function useUpdatePayment() {
  return useMutation(({ id, status }: { id: string; status: PaymentStatus }) =>
    PaymentService.updatePayment(id, status)
  );
}

// src/domains/payment/payment.utils.ts
import { Payment, PaymentStatus } from './payment.types';

export function formatPaymentAmount(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export function getPaymentStatusColor(status: PaymentStatus): string {
  switch (status) {
    case PaymentStatus.Pending:
      return 'warning';
    case PaymentStatus.Processing:
      return 'info';
    case PaymentStatus.Completed:
      return 'success';
    case PaymentStatus.Failed:
      return 'error';
    default:
      return 'default';
  }
}
```

### 3. Type Structure
```typescript
// src/domains/core/types.ts
export interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditableEntity extends Entity {
  createdBy: string;
  updatedBy: string;
}

export interface SoftDeletableEntity extends Entity {
  deletedAt?: Date;
  deletedBy?: string;
}

// src/domains/auth/types.ts
import { Entity } from '@/domains/core/types';

export interface User extends Entity {
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
}

export enum UserRole {
  Admin = 'admin',
  Manager = 'manager',
  User = 'user'
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

// src/domains/client/types.ts
import { AuditableEntity } from '@/domains/core/types';

export interface Client extends AuditableEntity {
  name: string;
  email: string;
  phone: string;
  status: ClientStatus;
  type: ClientType;
}

export enum ClientStatus {
  Active = 'active',
  Inactive = 'inactive',
  Suspended = 'suspended'
}

export enum ClientType {
  Individual = 'individual',
  Business = 'business',
  Enterprise = 'enterprise'
}
```

### 4. Module Structure
```typescript
// src/domains/index.ts
export * from './auth';
export * from './client';
export * from './payment';
export * from './report';

// src/shared/index.ts
export * from './hooks';
export * from './utils';
export * from './constants';
export * from './components';

// src/app/index.ts
export * from './routes';
export * from './store';
export * from './theme';
export * from './i18n';
```

### 5. Shared Code
```typescript
// src/shared/hooks/index.ts
export * from './useAsync';
export * from './useForm';
export * from './useModal';
export * from './useToast';

// src/shared/utils/index.ts
export * from './format';
export * from './validate';
export * from './transform';
export * from './calculate';

// src/shared/constants/index.ts
export * from './api';
export * from './routes';
export * from './theme';
export * from './regex';

// src/shared/components/index.ts
export * from './ErrorBoundary';
export * from './Suspense';
export * from './Portal';
export * from './Provider';
```

## Implementation Plan

1. **Phase 1: Components**
   - Create atomic design
   - Add component types
   - Add component docs
   - Add component tests

2. **Phase 2: Services**
   - Create domains
   - Add domain types
   - Add domain logic
   - Add domain tests

3. **Phase 3: Types**
   - Create core types
   - Add domain types
   - Add shared types
   - Add type tests

4. **Phase 4: Modules**
   - Create boundaries
   - Add exports
   - Add imports
   - Add tests

5. **Phase 5: Shared**
   - Create shared code
   - Add utilities
   - Add hooks
   - Add tests

## Notes
- Use TypeScript
- Add documentation
- Consider scale
- Handle errors
- Follow patterns
