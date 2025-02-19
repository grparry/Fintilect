import React, { Suspense, ReactNode, lazy, FC, memo, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
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
import { navigationConfig } from './config/navigation';
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
// Protected route wrapper that doesn't include MainLayout
const ProtectedRouteWrapper: React.FC<{ Component: React.ComponentType<any> }> = memo(({ Component }) => {
  return (
    <ProtectedRoute>
      <Suspense fallback={<LoadingFallback />}>
        <ErrorBoundary>
          <Component />
        </ErrorBoundary>
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
  
  const renderRoutes = useCallback((routes: RouteConfig[]) => {
    if (!routes?.length) return null;

    return routes.map((route) => {
      if (!route?.path) return null;

      const Component = route.element as React.ComponentType<any> | React.LazyExoticComponent<React.ComponentType<any>>;
      if (!Component) return null;
      
      // Handle path transformation
      let relativePath = route.path;
      if (route.path === '/admin') {
        relativePath = '';
      } else if (route.path.startsWith('/admin/')) {
        relativePath = route.path.replace(/^\/admin\//, '');
      }
      
      return (
        <Route
          key={route.id}
          path={relativePath}
          element={<ProtectedRouteWrapper Component={Component} />}
        >
          {route.children && renderRoutes(route.children)}
        </Route>
      );
    });
  }, []);
  
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
                        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                        <Route path="/" element={<Navigate to="/admin" replace />} />
                        
                        {/* Admin section with MainLayout */}
                        <Route path="/admin/*" element={<AdminWrapper />}>
                          {/* Legacy route redirects */}
                          <Route path="clients" element={<Navigate to="/admin/client-management" replace />} />
                          <Route path="clients/list" element={<Navigate to="/admin/client-management/list" replace />} />
                          <Route path="clients/:clientId/*" element={<Navigate to="/admin/client-management/edit/:clientId/*" replace />} />
                          
                          {/* Dynamic routes */}
                          {renderRoutes(routes)}
                        </Route>

                        <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
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