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
import { navigationConfig } from './config/navigation';
import { Box } from '@mui/material';
import './App.css';

interface ProtectedRouteProps {
  children: ReactNode;
}

// Protected Route Component



// Protected Route Component





// Public Route Component



// Loading component
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </div>
);




  
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


// Pre-load components to ensure proper initialization

  

    
      <Route
          <RouteElement
          />
      >
        {route.children && renderRoutes(route.children)}
      </Route>
    );


    <ErrorBoundary>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Router>
            <ServiceProvider>
              <AuthProvider>
                <NavigationProvider config={navigationConfig}>
                  <Box sx={{
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

