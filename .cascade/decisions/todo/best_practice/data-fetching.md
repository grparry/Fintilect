# Data Fetching TODO

## Overview
This TODO tracks the necessary changes to improve data fetching and caching patterns across the codebase.

**Created**: 2024-12-31T06:15:22-07:00
**Status**: Pending
**Priority**: High
**Category**: Architecture
**Related Pattern**: core/data.md

## Current Issues

### 1. Data Fetching
- **Issue**: Basic fetching
- **Current**: Simple fetch
- **Required**: Advanced fetch
- **Impact**: Poor efficiency

### 2. Data Caching
- **Issue**: No caching
- **Current**: No cache
- **Required**: Global cache
- **Impact**: Poor performance

### 3. Data State
- **Issue**: Basic state
- **Current**: No sync
- **Required**: Global sync
- **Impact**: Poor consistency

### 4. Data Loading
- **Issue**: Basic loading
- **Current**: No feedback
- **Required**: Rich feedback
- **Impact**: Poor UX

### 5. Data Errors
- **Issue**: Basic errors
- **Current**: Simple errors
- **Required**: Rich errors
- **Impact**: Poor reliability

## Required Changes

### 1. Data Client
```typescript
// src/data/client/index.ts
export * from './query';
export * from './mutation';
export * from './cache';
export * from './hooks';

// src/data/client/query.ts
import {
  QueryClient,
  QueryCache,
  MutationCache,
  DefaultOptions
} from '@tanstack/react-query';
import { toast } from '@/components/atoms';

const queryCache = new QueryCache({
  onError: (error: unknown) => {
    toast.error(
      error instanceof Error ? error.message : 'An error occurred'
    );
  }
});

const mutationCache = new MutationCache({
  onError: (error: unknown) => {
    toast.error(
      error instanceof Error ? error.message : 'An error occurred'
    );
  }
});

const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false
  }
};

export const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions
});
```

### 2. Data Hooks
```typescript
// src/data/hooks/index.ts
export * from './useQuery';
export * from './useMutation';
export * from './useInfiniteQuery';
export * from './usePrefetch';

// src/data/hooks/useQuery.ts
import {
  useQuery as useReactQuery,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useQuery<
  TData = unknown,
  TError = AxiosError,
  TQueryKey extends [string, ...unknown[]] = [string]
>(
  queryKey: TQueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<
    UseQueryOptions<TData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<TData, TError> {
  return useReactQuery<TData, TError, TData, TQueryKey>({
    queryKey,
    queryFn,
    ...options
  });
}

// src/data/hooks/useMutation.ts
import {
  useMutation as useReactMutation,
  UseMutationOptions,
  UseMutationResult
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useMutation<
  TData = unknown,
  TError = AxiosError,
  TVariables = void,
  TContext = unknown
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationFn'
  >
): UseMutationResult<TData, TError, TVariables, TContext> {
  return useReactMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    ...options
  });
}
```

### 3. Data Cache
```typescript
// src/data/cache/index.ts
export * from './config';
export * from './utils';
export * from './types';
export * from './keys';

// src/data/cache/config.ts
import { QueryClient } from '@tanstack/react-query';
import { CacheConfig } from './types';

export const cacheConfig: CacheConfig = {
  defaultStaleTime: 5 * 60 * 1000,
  defaultCacheTime: 10 * 60 * 1000,
  maxAge: 24 * 60 * 60 * 1000,
  maxEntries: 100
};

export function configureCacheDefaults(
  queryClient: QueryClient,
  config: Partial<CacheConfig> = {}
): void {
  const mergedConfig = { ...cacheConfig, ...config };

  queryClient.setDefaultOptions({
    queries: {
      staleTime: mergedConfig.defaultStaleTime,
      cacheTime: mergedConfig.defaultCacheTime,
      refetchOnWindowFocus: false,
      retry: false
    }
  });
}

// src/data/cache/utils.ts
import { QueryClient } from '@tanstack/react-query';
import { CacheEntry } from './types';

export function invalidateQueries(
  queryClient: QueryClient,
  queryKey: unknown[]
): Promise<void> {
  return queryClient.invalidateQueries({ queryKey });
}

export function prefetchQuery<T>(
  queryClient: QueryClient,
  queryKey: unknown[],
  queryFn: () => Promise<T>
): Promise<void> {
  return queryClient.prefetchQuery({
    queryKey,
    queryFn
  });
}

export function updateCache<T>(
  queryClient: QueryClient,
  queryKey: unknown[],
  updater: (oldData: T | undefined) => T
): void {
  queryClient.setQueryData(queryKey, updater);
}
```

### 4. Data Loading
```typescript
// src/data/loading/index.ts
export * from './components';
export * from './hooks';
export * from './utils';
export * from './types';

// src/data/loading/components/LoadingState.tsx
import { Skeleton } from '@mui/material';
import { LoadingStateProps } from '../types';

export function LoadingState({
  loading,
  error,
  children,
  fallback,
  retry
}: LoadingStateProps) {
  if (loading) {
    return fallback || <Skeleton />;
  }

  if (error) {
    return (
      <div>
        <p>{error.message}</p>
        {retry && (
          <button onClick={retry}>
            Retry
          </button>
        )}
      </div>
    );
  }

  return children;
}

// src/data/loading/hooks/useLoadingState.ts
import { useEffect } from 'react';
import { LoadingState } from '../types';

export function useLoadingState(
  loading: boolean,
  error: Error | null
): LoadingState {
  useEffect(() => {
    if (loading) {
      // Start loading indicator
      return () => {
        // Clean up loading indicator
      };
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      // Show error toast
      return () => {
        // Clean up error toast
      };
    }
  }, [error]);

  return {
    loading,
    error,
    success: !loading && !error
  };
}
```

### 5. Data Errors
```typescript
// src/data/errors/index.ts
export * from './types';
export * from './handlers';
export * from './utils';
export * from './constants';

// src/data/errors/handlers.ts
import { toast } from '@/components/atoms';
import { DataError, ErrorHandler } from './types';

export const defaultErrorHandler: ErrorHandler = {
  handle: (error: DataError) => {
    if (error.status === 401) {
      // Handle unauthorized
      window.location.href = '/login';
      return;
    }

    if (error.status === 403) {
      // Handle forbidden
      window.location.href = '/forbidden';
      return;
    }

    if (error.status === 404) {
      // Handle not found
      window.location.href = '/not-found';
      return;
    }

    // Handle other errors
    toast.error(error.message);
  }
};

export function createErrorHandler(
  options: Partial<ErrorHandler>
): ErrorHandler {
  return {
    ...defaultErrorHandler,
    ...options
  };
}
```

## Implementation Plan

1. **Phase 1: Client**
   - Create data client
   - Add query client
   - Add mutation client
   - Add client tests

2. **Phase 2: Hooks**
   - Create data hooks
   - Add query hooks
   - Add mutation hooks
   - Add hook tests

3. **Phase 3: Cache**
   - Create cache config
   - Add cache utils
   - Add cache logic
   - Add cache tests

4. **Phase 4: Loading**
   - Create loading state
   - Add loading hooks
   - Add loading logic
   - Add loading tests

5. **Phase 5: Errors**
   - Create error handlers
   - Add error types
   - Add error logic
   - Add error tests

## Notes
- Use TypeScript
- Add monitoring
- Document patterns
- Consider scale
- Handle errors
