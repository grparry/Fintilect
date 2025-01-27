import React, { Suspense, ReactNode, lazy, FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { NavigationProvider } from '@/context/NavigationContext';
import { ServiceProvider } from '@/providers/ServiceProvider';
import MainLayout from '@/components/layout/MainLayout';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import LoginPage from '@/components/auth/LoginPage';
import NotFound from '@/components/common/NotFound';
import { getAllRoutes } from '@/routes';
import { RouteConfig } from '@/types/route.types';
import { navigationConfig } from '@/config/navigation';
import { Box } from '@mui/material';
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

  return <>{children}</>;
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
  const { toggleTheme } = useTheme();
  console.log('Rendering route element for path:', path);
  
  return (
    <ProtectedRoute>
      <Suspense fallback={<LoadingFallback />}>
        <ErrorBoundary>
          <MainLayout toggleTheme={toggleTheme}>
            <Component />
          </MainLayout>
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
const EmergeConfigHeader = lazy(() => import('./components/emerge-config/EmergeConfigHeader'));
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
    console.log(`Processing route:`, {
      id: route.id,
      path: route.path,
      elementType: typeof route.element,
      hasChildren: !!route.children,
      isLazy: route.element?.constructor?.name === 'LazyExoticComponent',
      elementName: typeof route.element === 'function' ? route.element.name : 'Unknown'
    });

    const Component = route.element as React.ComponentType<any> | React.LazyExoticComponent<React.ComponentType<any>>;
    console.log(`Creating route element for ${route.id} with path ${route.path}`);
    
    return (
      <Route
        key={route.id}
        path={route.path}
        element={
          <RouteElement
            Component={Component}
            path={route.path}
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
                <NavigationProvider config={navigationConfig}>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    bgcolor: 'background.default'
                  }}>
                    <Suspense fallback={<LoadingFallback />}>
                      <Routes>
                        <Route key="login" path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                        <Route key="root" path="/" element={<Navigate to="/admin" replace />} />
                        <Route key="admin" path="/admin">
                          <Route key="old-clients" path="clients" element={<Navigate to="/admin/client-management" replace />} />
                          <Route key="old-clients-list" path="clients/list" element={<Navigate to="/admin/client-management/list" replace />} />
                          <Route key="old-client-details" path="clients/:clientId/*" element={<Navigate to="/admin/client-management/edit/:clientId/*" replace />} />
                          {renderRoutes(routes)}
                        </Route>
                        <Route key="not-found" path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
                      </Routes>
                    </Suspense>
                  </Box>
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
