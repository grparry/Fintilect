import React, { Suspense, ReactNode, lazy, FC, memo, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { NavigationProvider } from './context/NavigationContext';
import { HostProvider, useHost } from './context/HostContext';
import { ServiceProvider } from './providers/ServiceProvider';
import MainLayout from './components/layout/MainLayout';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoginPage from './components/auth/LoginPage';
import NotFound from './components/common/NotFound';
import { getAllRoutes } from './routes';
import { RouteConfig } from './types/route.types';
import { navigationConfig } from './config/navigation';
import { ResourceId } from './types/permissions.types';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { usePermissions } from './hooks/usePermissions';
import './App.css';

interface ProtectedRouteProps {
  children: ReactNode;
  resourceId?: ResourceId;
}

interface PublicRouteProps {
  children: ReactNode;
}

// Public Route Component
const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  console.log('PublicRoute - Checking auth');

  if (loading) {
    return <LoadingFallback />;
  }

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

// Protected route wrapper that doesn't include MainLayout
const ProtectedRouteWrapper: React.FC<{ 
  Component: React.ComponentType<any>;
  resourceId?: ResourceId;
}> = memo(({ Component, resourceId }) => {
  console.log('=== ProtectedRouteWrapper Debug ===');
  console.log('Received resourceId:', resourceId);
  
  return (
    <ProtectedRoute resourceId={resourceId}>
      <Suspense fallback={<LoadingFallback />}>
        <Component />
      </Suspense>
    </ProtectedRoute>
  );
});

ProtectedRouteWrapper.displayName = 'ProtectedRouteWrapper';

// Admin section wrapper that includes MainLayout
const AdminWrapper: React.FC = () => {
  const { toggleTheme } = useTheme();
  
  return (
    <ProtectedRoute>
      <MainLayout toggleTheme={toggleTheme}>
        <Outlet />
      </MainLayout>
    </ProtectedRoute>
  );
};

interface RouteElementProps {
  Component: React.ComponentType<any> | React.LazyExoticComponent<React.ComponentType<any>>;
  path: string;
}
const RouteElement: React.FC<RouteElementProps> = ({ Component, path }) => {
  return (
    <Route
      key={path}
      path={path}
      element={<ProtectedRouteWrapper Component={Component} />}
    />
  );
};
const createElementWrapper = (element: JSX.Element): FC => {
  const ElementWrapper: FC = () => element;
  return ElementWrapper;
};
// Pre-load components to ensure proper initialization
const BillPayHeader = lazy(() => import('./components/bill-pay/BillPayHeader'));
const ClientManagementHeader = lazy(() => import('./components/client-management/ClientManagementHeader'));
const DevelopmentHeader = lazy(() => import('./components/development/DevelopmentHeader'));

const App: React.FC = () => {
  const routes = useMemo(() => getAllRoutes(), []);
  
  const renderRoutes = useCallback((routes: RouteConfig[], parentPath: string = '') => {
    if (!routes?.length) return null;

    console.log("=== Route Rendering Debug ===");
    console.log("Parent path:", parentPath);
    console.log("Routes to render:", routes);
    
    return routes.map((route) => {
      if (!route?.path && route.path !== '') return null;

      const Component = route.element;
      
      console.log(`=== Route Configuration ===`);
      console.log(`Route ${route.id}:`, {
        path: route.path,
        resourceId: route.resourceId,
        component: Component?.name || 'Anonymous',
        children: route.children
      });

      return (
        <Route
          key={route.id}
          path={route.path}
          element={<ProtectedRouteWrapper Component={Component} resourceId={route.resourceId} />}
        >
          {route.children && renderRoutes(route.children)}
        </Route>
      );
    });
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <HostProvider>
              <ServiceProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <NavigationProvider config={navigationConfig}>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      minHeight: '100vh',
                      bgcolor: 'background.default'
                    }}>
                      <Suspense fallback={<LoadingFallback />}>
                        <Routes>
                          {/* Public routes */}
                          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                          <Route path="/unauthorized" element={<PublicRoute><NotFound message="You are not authorized to access this resource." /></PublicRoute>} />
                          
                          {/* Root redirect */}
                          <Route index element={<Navigate to="admin" replace />} />
                          
                          {/* Admin section with MainLayout */}
                          <Route path="admin" element={<AdminWrapper />}>
                          
                            {/* Legacy route redirects */}
                            <Route path="clients" element={<Navigate to="client-management" replace />} />
                            <Route path="clients/list" element={<Navigate to="client-management/list" replace />} />
                            <Route path="clients/:clientId/*" element={<Navigate to="client-management/edit/:clientId/*" replace />} />
                            
                            {/* Development route redirects */}
                            <Route path="dev" element={<Navigate to="development" replace />} />
                            <Route path="dev/testing" element={<Navigate to="development/api-testing" replace />} />
                            
                            {/* Render all other routes */}
                            {renderRoutes(routes)}

                            {/* Catch-all route */}
                            <Route path="*" element={<NotFound />} />

                          </Route>

                        </Routes>
                      </Suspense>
                    </Box>
                  </NavigationProvider>
                </LocalizationProvider>
              </ServiceProvider>
            </HostProvider>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </ErrorBoundary>
  );
};
export default App;