import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const LoaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  requiredPermissions?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
  requiredPermissions = [],
}) => {
  const { isAuthenticated, user, loading, permissions } = useAuth();
  const location = useLocation();

  console.log('=== ProtectedRoute Debug ===');
  console.log('Path:', location.pathname);
  console.log('Auth State:', { isAuthenticated, loading, hasUser: !!user });
  console.log('User:', user);
  console.log('Permissions:', permissions);
  console.log('Required Roles:', requiredRoles);
  console.log('Required Permissions:', requiredPermissions);

  if (loading) {
    console.log('ProtectedRoute - Loading auth state');
    return (
      <LoaderContainer>






      <LoaderContainer>
        <CircularProgress />
      </LoaderContainer>
    );


  // Check roles if required

  // Check permissions if required
    );


