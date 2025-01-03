# Caching and Data Persistence TODO

## Overview
This TODO tracks the necessary changes to improve caching and data persistence across the codebase.

**Created**: 2024-12-31T06:08:20-07:00
**Status**: Pending
**Priority**: High
**Category**: Performance
**Related Pattern**: core/caching.md

## Current Issues

### 1. Client-Side Cache
- **Issue**: No caching
- **Current**: Direct API
- **Required**: Cache layer
- **Impact**: Poor performance

### 2. Data Persistence
- **Issue**: Basic storage
- **Current**: Local storage
- **Required**: Enhanced storage
- **Impact**: Poor reliability

### 3. Cache Invalidation
- **Issue**: No invalidation
- **Current**: Manual refresh
- **Required**: Auto refresh
- **Impact**: Stale data

### 4. Request Caching
- **Issue**: No request cache
- **Current**: Direct calls
- **Required**: Request cache
- **Impact**: Poor performance

### 5. State Persistence
- **Issue**: Basic state
- **Current**: Memory only
- **Required**: Persisted state
- **Impact**: Poor reliability

## Required Changes

### 1. Cache Provider
```typescript
// src/cache/CacheProvider.ts
export interface CacheOptions {
  ttl?: number;
  invalidate?: string[];
  persist?: boolean;
}

export class CacheProvider {
  private static instance: CacheProvider;
  private cache: Map<string, any>;
  private ttls: Map<string, number>;
  
  private constructor() {
    this.cache = new Map();
    this.ttls = new Map();
    this.loadPersistedCache();
  }
  
  static getInstance(): CacheProvider {
    if (!this.instance) {
      this.instance = new CacheProvider();
    }
    return this.instance;
  }
  
  get<T>(key: string): T | null {
    if (!this.isValid(key)) {
      this.delete(key);
      return null;
    }
    return this.cache.get(key) || null;
  }
  
  set<T>(key: string, value: T, options: CacheOptions = {}): void {
    this.cache.set(key, value);
    
    if (options.ttl) {
      this.ttls.set(key, Date.now() + options.ttl);
    }
    
    if (options.persist) {
      this.persistCache();
    }
    
    if (options.invalidate) {
      this.invalidateKeys(options.invalidate);
    }
  }
  
  delete(key: string): void {
    this.cache.delete(key);
    this.ttls.delete(key);
    this.persistCache();
  }
  
  clear(): void {
    this.cache.clear();
    this.ttls.clear();
    this.persistCache();
  }
  
  private isValid(key: string): boolean {
    const ttl = this.ttls.get(key);
    return !ttl || ttl > Date.now();
  }
  
  private invalidateKeys(keys: string[]): void {
    keys.forEach(pattern => {
      const regex = new RegExp(pattern);
      Array.from(this.cache.keys())
        .filter(key => regex.test(key))
        .forEach(key => this.delete(key));
    });
  }
  
  private persistCache(): void {
    const persistable = new Map();
    this.cache.forEach((value, key) => {
      if (this.isValid(key)) {
        persistable.set(key, value);
      }
    });
    
    localStorage.setItem('app-cache', JSON.stringify({
      cache: Array.from(persistable.entries()),
      ttls: Array.from(this.ttls.entries()),
    }));
  }
  
  private loadPersistedCache(): void {
    try {
      const stored = localStorage.getItem('app-cache');
      if (stored) {
        const { cache, ttls } = JSON.parse(stored);
        this.cache = new Map(cache);
        this.ttls = new Map(ttls);
      }
    } catch (error) {
      console.error('Failed to load persisted cache:', error);
    }
  }
}
```

### 2. Request Cache
```typescript
// src/cache/RequestCache.ts
import { CacheProvider } from './CacheProvider';

interface RequestCacheOptions {
  ttl?: number;
  invalidate?: string[];
  persist?: boolean;
  force?: boolean;
}

export class RequestCache {
  private static instance: RequestCache;
  private cache: CacheProvider;
  
  private constructor() {
    this.cache = CacheProvider.getInstance();
  }
  
  static getInstance(): RequestCache {
    if (!this.instance) {
      this.instance = new RequestCache();
    }
    return this.instance;
  }
  
  async fetch<T>(
    key: string,
    request: () => Promise<T>,
    options: RequestCacheOptions = {}
  ): Promise<T> {
    if (!options.force) {
      const cached = this.cache.get<T>(key);
      if (cached) return cached;
    }
    
    const data = await request();
    this.cache.set(key, data, options);
    return data;
  }
  
  invalidate(key: string): void {
    this.cache.delete(key);
  }
  
  clear(): void {
    this.cache.clear();
  }
}
```

### 3. State Persistence
```typescript
// src/cache/StatePersistence.ts
export interface PersistenceOptions {
  key: string;
  storage?: Storage;
  serialize?: (state: any) => string;
  deserialize?: (stored: string) => any;
}

export class StatePersistence<T> {
  private options: Required<PersistenceOptions>;
  
  constructor(options: PersistenceOptions) {
    this.options = {
      storage: localStorage,
      serialize: JSON.stringify,
      deserialize: JSON.parse,
      ...options,
    };
  }
  
  save(state: T): void {
    try {
      const serialized = this.options.serialize(state);
      this.options.storage.setItem(this.options.key, serialized);
    } catch (error) {
      console.error('Failed to persist state:', error);
    }
  }
  
  load(): T | null {
    try {
      const stored = this.options.storage.getItem(this.options.key);
      return stored ? this.options.deserialize(stored) : null;
    } catch (error) {
      console.error('Failed to load persisted state:', error);
      return null;
    }
  }
  
  clear(): void {
    this.options.storage.removeItem(this.options.key);
  }
}
```

### 4. Cache Hooks
```typescript
// src/cache/hooks.ts
import { useState, useEffect } from 'react';
import { CacheProvider } from './CacheProvider';
import { RequestCache } from './RequestCache';
import { StatePersistence } from './StatePersistence';

export function useCache<T>(key: string, initialValue?: T) {
  const cache = CacheProvider.getInstance();
  const [value, setValue] = useState<T | null>(() => {
    return cache.get<T>(key) || initialValue || null;
  });
  
  useEffect(() => {
    if (value !== null) {
      cache.set(key, value);
    }
  }, [key, value]);
  
  return [value, setValue] as const;
}

export function useCachedRequest<T>(
  key: string,
  request: () => Promise<T>,
  options: RequestCacheOptions = {}
) {
  const cache = RequestCache.getInstance();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    let mounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await cache.fetch(key, request, options);
        if (mounted) {
          setData(result);
        }
      } catch (error) {
        if (mounted) {
          setError(error as Error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      mounted = false;
    };
  }, [key]);
  
  return { data, loading, error };
}

export function usePersistence<T>(key: string, initialValue?: T) {
  const persistence = new StatePersistence<T>({ key });
  const [state, setState] = useState<T | null>(() => {
    return persistence.load() || initialValue || null;
  });
  
  useEffect(() => {
    if (state !== null) {
      persistence.save(state);
    }
  }, [state]);
  
  return [state, setState] as const;
}
```

### 5. Cache Utilities
```typescript
// src/cache/utils.ts
export function createCacheKey(...parts: any[]): string {
  return parts
    .map(part => 
      typeof part === 'object' 
        ? JSON.stringify(part) 
        : String(part)
    )
    .join(':');
}

export function memoize<T>(
  fn: (...args: any[]) => T,
  keyFn: (...args: any[]) => string = createCacheKey
): (...args: any[]) => T {
  const cache = new Map<string, T>();
  
  return (...args: any[]): T => {
    const key = keyFn(...args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

export function clearCaches(): void {
  CacheProvider.getInstance().clear();
  RequestCache.getInstance().clear();
  localStorage.clear();
  sessionStorage.clear();
}
```

## Implementation Plan

1. **Phase 1: Provider**
   - Create cache provider
   - Add options
   - Add persistence
   - Add invalidation

2. **Phase 2: Request**
   - Create request cache
   - Add fetching
   - Add options
   - Add invalidation

3. **Phase 3: State**
   - Create state persistence
   - Add storage
   - Add serialization
   - Add loading

4. **Phase 4: Hooks**
   - Create cache hooks
   - Add request hooks
   - Add state hooks
   - Add utilities

5. **Phase 5: Migration**
   - Update services
   - Update components
   - Update storage
   - Add monitoring

## Notes
- Use TypeScript
- Add monitoring
- Document patterns
- Consider scale
- Handle errors
