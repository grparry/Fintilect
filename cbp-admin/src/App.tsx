import React, { Suspense, ReactNode, lazy, FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { NavigationProvider } from './context/NavigationContext';
import { ServiceProvider } from './providers/ServiceProvider';
import MainLayout from './components/layout/MainLayout';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoginPage from './components/auth/LoginPage';
import NotFound from './components/common/NotFound';
import { getAllRoutes } from './routes';
import { RouteConfig } from './types/route.types';
import './App.css';

interface ProtectedRouteProps {
  children: ReactNode;
}

// Protected Route Component
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  console.log('ProtectedRoute - Checking auth');

  if (loading) {
    return <LoadingFallback />;
  }

  if (!user) {
    console.log('ProtectedRoute - No user, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  return <AppWrapper>{children}</AppWrapper>;
};

interface PublicRouteProps {
  children: ReactNode;
}

// Public Route Component
const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user } = useAuth();
  console.log('PublicRoute - Checking auth');

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Loading component
const LoadingFallback: React.FC = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </div>
);

const AppWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  console.log('AppWrapper - Rendering with children');
  return <MainLayout toggleTheme={toggleTheme}>{children}</MainLayout>;
};

type RouteElementComponent = React.ComponentType<any>;

interface RouteElementProps {
  Component: RouteElementComponent | React.LazyExoticComponent<RouteElementComponent>;
  path: string;
}

const RouteElement: React.FC<RouteElementProps> = ({ Component, path }) => {
  console.log('RouteElement rendering:', {
    path,
    componentType: typeof Component,
    isLazy: Component.constructor?.name === 'LazyExoticComponent',
    componentName: typeof Component === 'function' ? Component.name : 'Unknown'
  });
  
  return (
    <ProtectedRoute>
      <Suspense fallback={<LoadingFallback />}>
        <ErrorBoundary>
          <Component />
        </ErrorBoundary>
      </Suspense>
    </ProtectedRoute>
  );
};

const createElementWrapper = (element: JSX.Element): FC => {
  const ElementWrapper: FC = () => element;
  return ElementWrapper;
};

// Pre-load components to ensure proper initialization
const BillPayHeader = lazy(() => import('./components/bill-pay/BillPayHeader'));
const ClientManagementHeader = lazy(() => import('./components/client-management/ClientManagementHeader'));
const EmergeAdminHeader = lazy(() => import('./components/emerge-admin/EmergeAdminHeader'));
const DevelopmentHeader = lazy(() => import('./components/development/DevelopmentHeader'));

const renderRoutes = (routes: RouteConfig[]) => {
  console.log('=== Route Rendering Debug Start ===');
  console.log('All routes:', routes.map(r => ({
    id: r.id,
    path: r.path,
    elementType: typeof r.element,
    hasChildren: !!r.children,
    isLazy: r.element?.constructor?.name === 'LazyExoticComponent',
    elementName: typeof r.element === 'function' ? r.element.name : 'Unknown'
  })));
  
  return routes.map((route) => {
    const fullPath = route.path;
    console.log(`Processing route:`, {
      id: route.id,
      path: fullPath,
      elementType: typeof route.element,
      hasChildren: !!route.children,
      isLazy: route.element?.constructor?.name === 'LazyExoticComponent',
      elementName: typeof route.element === 'function' ? route.element.name : 'Unknown'
    });

    // Regular route handling
    if (React.isValidElement(route.element)) {
      console.log(`Route ${route.id} has valid React element`);
      const ElementWrapper = createElementWrapper(route.element);
      return (
        <Route
          key={route.id}
          path={fullPath}
          element={
            <RouteElement
              Component={ElementWrapper}
              path={fullPath}
            />
          }
        >
          {route.children && renderRoutes(route.children)}
        </Route>
      );
    }

    console.log(`Route ${route.id} using component type`);
    const Component = route.element as React.ComponentType<any> | React.LazyExoticComponent<React.ComponentType<any>>;
    return (
      <Route
        key={route.id}
        path={fullPath}
        element={
          <RouteElement
            Component={Component}
            path={fullPath}
          />
        }
      >
        {route.children && renderRoutes(route.children)}
      </Route>
    );
  });
};

const App: React.FC = () => {
  const routes = getAllRoutes();
  console.log('Generated Routes:', JSON.stringify(routes, null, 2));

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Router>
            <ServiceProvider>
              <AuthProvider>
                <NavigationProvider>
                  <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                      <Route key="login" path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                      <Route key="root" path="/" element={<Navigate to="/admin" replace />} />
                      <Route key="old-clients" path="/admin/clients" element={<Navigate to="/admin/client-management" replace />} />
                      <Route key="old-clients-list" path="/admin/clients/list" element={<Navigate to="/admin/client-management/list" replace />} />
                      <Route key="old-client-details" path="/admin/clients/:clientId/*" element={<Navigate to="/admin/client-management/:clientId/*" replace />} />
                      {renderRoutes(routes)}
                      <Route key="not-found" path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
                    </Routes>
                  </Suspense>
                </NavigationProvider>
              </AuthProvider>
            </ServiceProvider>
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
