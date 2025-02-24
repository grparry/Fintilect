import React from 'react';
import { lazy } from 'react';
import { useParams } from 'react-router-dom';
import { RouteConfig } from '@/types/route.types';
import BusinessIcon from '@mui/icons-material/Business';
import ListIcon from '@mui/icons-material/List';

// Lazy load components
const ClientList = lazy(() => import('../components/client-management/ClientList'));
const ClientManagementWrapper = lazy(() => import('../components/client-management/wrappers/ClientManagementWrapper'));
const ContactInformation = lazy(() => import('../components/client-management/ContactInformation'));
const UsersWrapper = lazy(() => import('../components/client-management/wrappers/UsersWrapper'));
const UserEditWrapper = lazy(() => import('../components/client-management/wrappers/UserEditWrapper'));
const GroupsWrapper = lazy(() => import('../components/client-management/wrappers/GroupsWrapper'));
const SecuritySettingsWrapper = lazy(() => import('../components/client-management/wrappers/SecuritySettingsWrapper'));
const ClientManagementHeader = lazy(() => import('../components/client-management/ClientManagementHeader'));
const SecuritySettings = lazy(() => import('../components/client-management/security/SecuritySettings'));
const MemberSecuritySettings = lazy(() => import('../components/client-management/security/MemberSecuritySettings'));
const ClientManagement = lazy(() => import('../components/client-management/ClientManagement'));

interface RouteParams {
  clientId?: string;
  userId?: string;
  groupId?: string;
}
// Route configuration
const clientManagementRoutes: RouteConfig[] = [
  {
    id: 'client-management-root',
    path: '',
    element: ClientManagementHeader,
    icon: BusinessIcon,
    title: 'Client Management',
    permissions: {
      requiredPermissions: ['client-management:read']
    }
  },
  {
    id: 'client-list',
    path: 'list',
    title: 'Clients',
    element: ClientList,
    icon: ListIcon,
    sectionId: 'clientManagement',
  },
  {
    id: 'client-edit',
    path: 'edit/:clientId/*',  // Added wildcard to match all child routes
    title: 'Client Details',
    element: ClientManagementWrapper,
    hideFromSidebar: true,
    sectionId: 'clientManagement',
    children: [
      {
        id: 'client-contact',
        path: '',  // Default tab
        title: 'Contact Information',
        element: ContactInformation,
        sectionId: 'clientManagement',
      },
      {
        id: 'client-users',
        path: 'users',
        title: 'Users',
        element: UsersWrapper,
        sectionId: 'clientManagement',
        children: [
          {
            id: 'client-user-edit',
            path: ':userId',
            title: 'Edit User',
            element: UserEditWrapper,
            hideFromSidebar: true,
            sectionId: 'clientManagement',
          }
        ]
      },
      {
        id: 'client-groups',
        path: 'groups',
        title: 'Groups',
        element: GroupsWrapper,
        sectionId: 'clientManagement',
      },
      {
        id: 'client-security',
        path: 'security',
        title: 'Security Settings',
        element: SecuritySettings,
        permissions: {
         requiredPermissions: ['client-management:read']
        }
      },
      {
        id: 'client-member-security',
        path: 'member-security',
        title: 'Member Security Settings',
        element: MemberSecuritySettings,
        permissions: {
          requiredPermissions: ['client-management:read']
         }
       }
    ]
  }
];
export default clientManagementRoutes;