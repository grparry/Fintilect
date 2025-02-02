# Type System Specification

## Overview
Based on the successful patterns from the CBP admin pilot project, this document defines the type system and generation patterns for the model generator.

## Core Types

### 1. API Layer Types
```typescript
// Base Setting Type
interface Setting {
    key: string;
    value: string;
    description?: string;
    dataType: 'string' | 'number' | 'boolean' | 'json';
    validation?: Record<string, any>;
}

// Group Container
interface SettingGroup {
    settings: Setting[];
    metadata: {
        __metadata?: Record<string, string>;
        __validations?: Record<string, any>;
        __display?: Record<string, any>;
    };
}
```

### 2. Model Layer Types
```typescript
// Core Interface
interface ISettingsGroup {
    toSettings(): Setting[];
    fromSettings(settings: Setting[]): void;
}

// Metadata Interface
interface ISettingsMetadata {
    readonly groupName: string;
    readonly settings: {
        readonly [key: string]: {
            readonly key: string;
            readonly type: string;
            readonly required: boolean;
        };
    };
}
```

### 3. JSON Handling
```typescript
abstract class JsonSetting<T> {
    protected abstract settingKey: string;
    private _value: T;
    
    constructor(protected defaultValue: T);
    get value(): T;
    set value(val: T);
    toSetting(): Setting;
    fromSetting(setting: Setting): void;
}
```

## Type Mapping Rules

### 1. Primitive Types
```typescript
const primitiveTypeMap = {
    'bool': { tsType: 'boolean', dataType: 'boolean' },
    'string': { tsType: 'string', dataType: 'string' },
    'int': { tsType: 'number', dataType: 'number' },
    'double': { tsType: 'number', dataType: 'number' }
};
```

### 2. Complex Types
```typescript
const complexTypeMap = {
    'Array': (elementType: string) => ({
        tsType: `${elementType}[]`,
        dataType: 'json',
        wrapper: 'JsonSetting'
    }),
    'Dictionary': (keyType: string, valueType: string) => ({
        tsType: `Record<${keyType}, ${valueType}>`,
        dataType: 'json',
        wrapper: 'JsonSetting'
    })
};
```

### 3. Special Cases
```typescript
const specialCaseMap = {
    'DateTime': { tsType: 'string', dataType: 'string' },
    'TimeSpan': { tsType: 'string', dataType: 'string' },
    'Guid': { tsType: 'string', dataType: 'string' }
};