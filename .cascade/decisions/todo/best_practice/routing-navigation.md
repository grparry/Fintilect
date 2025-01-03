# Routing and Navigation TODO

## Overview
This TODO tracks the necessary changes to improve routing and navigation patterns across the codebase.

**Created**: 2024-12-31T06:12:31-07:00
**Status**: Pending
**Priority**: High
**Category**: Architecture
**Related Pattern**: core/routing.md

## Current Issues

### 1. Route Organization
- **Issue**: Mixed patterns
- **Current**: Flat files
- **Required**: Feature modules
- **Impact**: Poor organization

### 2. Route Types
- **Issue**: Basic types
- **Current**: Simple interfaces
- **Required**: Advanced types
- **Impact**: Poor type safety

### 3. Navigation State
- **Issue**: Basic state
- **Current**: Local state
- **Required**: Global state
- **Impact**: Poor consistency

### 4. Route Guards
- **Issue**: No guards
- **Current**: No protection
- **Required**: Route guards
- **Impact**: Poor security

### 5. Route Loading
- **Issue**: Basic loading
- **Current**: No suspense
- **Required**: Advanced loading
- **Impact**: Poor performance

## Required Changes

### 1. Route Structure
```typescript
// src/routing/index.ts
export * from './config';
export * from './guards';
export * from './hooks';
export * from './types';

// src/routing/config/index.ts
export * from './routes';
export * from './navigation';
export * from './breadcrumbs';
export * from './middleware';

// src/routing/guards/index.ts
export * from './auth.guard';
export * from './permission.guard';
export * from './role.guard';
export * from './module.guard';

// src/routing/hooks/index.ts
export * from './useNavigation';
export * from './useRoute';
export * from './useBreadcrumbs';
export * from './useGuard';

// src/routing/types/index.ts
export * from './route.types';
export * from './navigation.types';
export * from './breadcrumb.types';
export * from './guard.types';
```

### 2. Route Types
```typescript
// src/routing/types/route.types.ts
import { ComponentType, LazyExoticComponent } from 'react';
import { Permission } from '@/domains/auth/types';

export interface BaseRouteConfig {
  id: string;
  path: string;
  title: string;
  icon?: string;
  hideFromSidebar?: boolean;
  permissions?: Permission[];
  roles?: string[];
  module?: string;
}

export interface RouteData {
  params: Record<string, string>;
  query: Record<string, string>;
  state: Record<string, unknown>;
}

export interface RouteMatch {
  id: string;
  path: string;
  params: Record<string, string>;
  data: RouteData;
}

export interface RouteConfig extends BaseRouteConfig {
  element: ComponentType<any> | LazyExoticComponent<ComponentType<any>>;
  children?: RouteConfig[];
  guards?: RouteGuard[];
  middleware?: RouteMiddleware[];
  errorElement?: ComponentType<any>;
  loadingElement?: ComponentType<any>;
}

export interface RouteGuard {
  canActivate: (route: RouteMatch) => boolean | Promise<boolean>;
  redirectTo?: string;
}

export interface RouteMiddleware {
  execute: (route: RouteMatch) => void | Promise<void>;
}

export interface RouteSection {
  id: string;
  title: string;
  basePath: string;
  routes: RouteConfig[];
  guards?: RouteGuard[];
  middleware?: RouteMiddleware[];
}

export type RouteSections = Record<string, RouteSection>;
```

### 3. Navigation State
```typescript
// src/routing/store/navigation.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RouteMatch } from '../types';

interface NavigationState {
  currentRoute: RouteMatch | null;
  previousRoute: RouteMatch | null;
  breadcrumbs: RouteMatch[];
  expandedSections: string[];
  history: RouteMatch[];
}

const initialState: NavigationState = {
  currentRoute: null,
  previousRoute: null,
  breadcrumbs: [],
  expandedSections: [],
  history: []
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCurrentRoute(state, action: PayloadAction<RouteMatch>) {
      state.previousRoute = state.currentRoute;
      state.currentRoute = action.payload;
      state.history.push(action.payload);
    },
    setBreadcrumbs(state, action: PayloadAction<RouteMatch[]>) {
      state.breadcrumbs = action.payload;
    },
    toggleSection(state, action: PayloadAction<string>) {
      const index = state.expandedSections.indexOf(action.payload);
      if (index === -1) {
        state.expandedSections.push(action.payload);
      } else {
        state.expandedSections.splice(index, 1);
      }
    },
    clearHistory(state) {
      state.history = [];
    }
  }
});

export const {
  setCurrentRoute,
  setBreadcrumbs,
  toggleSection,
  clearHistory
} = navigationSlice.actions;

export default navigationSlice.reducer;
```

### 4. Route Guards
```typescript
// src/routing/guards/auth.guard.ts
import { RouteGuard, RouteMatch } from '../types';
import { AuthService } from '@/domains/auth/auth.service';

export const authGuard: RouteGuard = {
  canActivate: async (route: RouteMatch) => {
    const isAuthenticated = await AuthService.isAuthenticated();
    return isAuthenticated;
  },
  redirectTo: '/auth/login'
};

// src/routing/guards/permission.guard.ts
import { RouteGuard, RouteMatch } from '../types';
import { Permission } from '@/domains/auth/types';
import { AuthService } from '@/domains/auth/auth.service';

export function createPermissionGuard(permissions: Permission[]): RouteGuard {
  return {
    canActivate: async (route: RouteMatch) => {
      const userPermissions = await AuthService.getUserPermissions();
      return permissions.every(permission => 
        userPermissions.includes(permission)
      );
    },
    redirectTo: '/auth/unauthorized'
  };
}

// src/routing/guards/role.guard.ts
import { RouteGuard, RouteMatch } from '../types';
import { AuthService } from '@/domains/auth/auth.service';

export function createRoleGuard(roles: string[]): RouteGuard {
  return {
    canActivate: async (route: RouteMatch) => {
      const userRole = await AuthService.getUserRole();
      return roles.includes(userRole);
    },
    redirectTo: '/auth/unauthorized'
  };
}

// src/routing/guards/module.guard.ts
import { RouteGuard, RouteMatch } from '../types';
import { ModuleService } from '@/domains/module/module.service';

export function createModuleGuard(module: string): RouteGuard {
  return {
    canActivate: async (route: RouteMatch) => {
      const isEnabled = await ModuleService.isModuleEnabled(module);
      return isEnabled;
    },
    redirectTo: '/auth/unavailable'
  };
}
```

### 5. Route Loading
```typescript
// src/routing/components/RouteLoader.tsx
import React, { Suspense } from 'react';
import { RouteConfig } from '../types';
import { LoadingSpinner } from '@/components/atoms';

interface RouteLoaderProps {
  route: RouteConfig;
}

export function RouteLoader({ route }: RouteLoaderProps) {
  const LoadingElement = route.loadingElement || LoadingSpinner;
  const ErrorElement = route.errorElement || DefaultError;

  return (
    <Suspense fallback={<LoadingElement />}>
      <ErrorBoundary fallback={<ErrorElement />}>
        <route.element />
      </ErrorBoundary>
    </Suspense>
  );
}

// src/routing/hooks/useRouteLoader.ts
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCurrentRoute, setBreadcrumbs } from '../store/navigation.slice';
import { RouteConfig, RouteMatch } from '../types';

export function useRouteLoader(route: RouteConfig) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadRoute = async () => {
      // Create route match
      const match: RouteMatch = {
        id: route.id,
        path: location.pathname,
        params: {},
        data: {
          params: {},
          query: {},
          state: location.state || {}
        }
      };

      // Check guards
      if (route.guards) {
        for (const guard of route.guards) {
          const canActivate = await guard.canActivate(match);
          if (!canActivate) {
            navigate(guard.redirectTo || '/');
            return;
          }
        }
      }

      // Execute middleware
      if (route.middleware) {
        for (const middleware of route.middleware) {
          await middleware.execute(match);
        }
      }

      // Update navigation state
      dispatch(setCurrentRoute(match));
      dispatch(setBreadcrumbs(generateBreadcrumbs(match)));
    };

    loadRoute();
  }, [route, location]);
}
```

## Implementation Plan

1. **Phase 1: Structure**
   - Create routing module
   - Add route types
   - Add route config
   - Add route tests

2. **Phase 2: State**
   - Create navigation store
   - Add state types
   - Add state logic
   - Add state tests

3. **Phase 3: Guards**
   - Create route guards
   - Add guard types
   - Add guard logic
   - Add guard tests

4. **Phase 4: Loading**
   - Create route loader
   - Add loading types
   - Add loading logic
   - Add loading tests

5. **Phase 5: Migration**
   - Update routes
   - Update navigation
   - Update components
   - Add monitoring

## Notes
- Use TypeScript
- Add monitoring
- Document patterns
- Consider scale
- Handle errors
