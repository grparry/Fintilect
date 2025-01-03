# Type System TODO

## Overview
This TODO tracks the necessary changes to improve the type system implementation and type safety across the codebase.

**Created**: 2024-12-31T05:58:23-07:00
**Status**: Pending
**Priority**: High
**Category**: Type System
**Related Pattern**: core/type-system.md

## Current Issues

### 1. Type Organization
- **Issue**: Scattered type definitions
- **Current**: Basic type files
- **Required**: Organized system
- **Impact**: Poor maintainability

### 2. Type Safety
- **Issue**: Loose typing
- **Current**: Basic types
- **Required**: Strict types
- **Impact**: Runtime errors

### 3. Type Reuse
- **Issue**: Duplicate types
- **Current**: Copy-paste
- **Required**: Type composition
- **Impact**: Inconsistency

### 4. Type Documentation
- **Issue**: Missing docs
- **Current**: Basic comments
- **Required**: Full docs
- **Impact**: Poor DX

### 5. Type Validation
- **Issue**: Runtime validation
- **Current**: Ad-hoc checks
- **Required**: Static validation
- **Impact**: Runtime errors

## Required Changes

### 1. Type Directory Structure
```
src/
├── types/
│   ├── core/
│   │   ├── api.types.ts
│   │   ├── auth.types.ts
│   │   └── common.types.ts
│   ├── features/
│   │   ├── bill-pay/
│   │   │   ├── payment.types.ts
│   │   │   └── config.types.ts
│   │   └── client-management/
│   │       ├── client.types.ts
│   │       └── group.types.ts
│   ├── shared/
│   │   ├── form.types.ts
│   │   └── validation.types.ts
│   └── index.ts
```

### 2. Type Safety System
```typescript
// src/types/core/common.types.ts
export type Nominal<T, K extends string> = T & { readonly __type: K };

export type Currency = Nominal<number, 'Currency'>;
export type AccountNumber = Nominal<string, 'AccountNumber'>;
export type RoutingNumber = Nominal<string, 'RoutingNumber'>;

// Usage
interface Payment {
  amount: Currency;
  accountNumber: AccountNumber;
  routingNumber: RoutingNumber;
}

// Validation
const validateCurrency = (value: number): Currency => {
  if (value < 0) throw new Error('Invalid currency');
  return value as Currency;
};
```

### 3. Type Composition
```typescript
// src/types/shared/form.types.ts
export interface BaseField<T> {
  name: keyof T;
  label: string;
  required?: boolean;
}

export interface TextField<T> extends BaseField<T> {
  type: 'text';
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

export interface NumberField<T> extends BaseField<T> {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
}

export type FormField<T> = TextField<T> | NumberField<T>;

// Usage
interface LoginForm {
  username: string;
  password: string;
}

const loginFields: FormField<LoginForm>[] = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    required: true,
    minLength: 3,
  },
];
```

### 4. Type Documentation
```typescript
// src/types/features/bill-pay/payment.types.ts

/**
 * Represents a payment in the bill pay system
 * @template T - The payment method type
 */
export interface Payment<T extends PaymentMethod> {
  /** Unique identifier for the payment */
  id: string;
  
  /** Amount in cents */
  amount: Currency;
  
  /** Payment method specific details */
  method: T;
  
  /** Current status of the payment */
  status: PaymentStatus;
  
  /** Audit information */
  audit: {
    /** User who created the payment */
    createdBy: string;
    
    /** Timestamp of creation */
    createdAt: string;
  };
}

/**
 * Payment method specific validation rules
 * @template T - The payment method type
 */
export interface PaymentValidation<T extends PaymentMethod> {
  /** Validates the payment data */
  validate(payment: Payment<T>): ValidationResult;
  
  /** Formats the payment for display */
  format(payment: Payment<T>): string;
}
```

### 5. Type Validation System
```typescript
// src/types/shared/validation.types.ts
export interface Validator<T> {
  validate(value: T): ValidationResult;
}

export class StringValidator implements Validator<string> {
  constructor(
    private readonly rules: {
      minLength?: number;
      maxLength?: number;
      pattern?: RegExp;
    }
  ) {}
  
  validate(value: string): ValidationResult {
    // Implementation
  }
}

export class NumberValidator implements Validator<number> {
  constructor(
    private readonly rules: {
      min?: number;
      max?: number;
      step?: number;
    }
  ) {}
  
  validate(value: number): ValidationResult {
    // Implementation
  }
}

// Factory for creating validators
export class ValidatorFactory {
  static create<T>(type: string, rules: any): Validator<T> {
    switch (type) {
      case 'string':
        return new StringValidator(rules);
      case 'number':
        return new NumberValidator(rules);
      default:
        throw new Error(`Unknown validator type: ${type}`);
    }
  }
}
```

## Implementation Plan

1. **Phase 1: Organization**
   - Create type structure
   - Move type files
   - Update imports
   - Add documentation

2. **Phase 2: Type Safety**
   - Add nominal types
   - Create validators
   - Update interfaces
   - Add type guards

3. **Phase 3: Type Composition**
   - Create base types
   - Add type utilities
   - Update usage
   - Add tests

4. **Phase 4: Documentation**
   - Add JSDoc comments
   - Create type guide
   - Update examples
   - Add validation

5. **Phase 5: Validation**
   - Create validators
   - Add runtime checks
   - Update usage
   - Add tests

## Notes
- Maintain backwards compatibility
- Add migration guide
- Document patterns
- Monitor bundle size
- Consider IDE impact
