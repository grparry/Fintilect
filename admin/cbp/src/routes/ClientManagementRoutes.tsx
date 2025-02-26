import React, { lazy } from 'react';
import { useParams } from 'react-router-dom';
import { RouteConfig } from '../types/route.types';
import { ResourceId } from '../types/permissions.types';
import BusinessIcon from '@mui/icons-material/Business';
import ListIcon from '@mui/icons-material/List';

// Lazy load components
const ClientManagementHeader = lazy(() => import('../components/client-management/ClientManagementHeader'));
const ClientList = lazy(() => import('../components/client-management/ClientList'));
const ClientManagementWrapper = lazy(() => import('../components/client-management/wrappers/ClientManagementWrapper'));
const ContactInformation = lazy(() => import('../components/client-management/ContactInformation'));
const UsersWrapper = lazy(() => import('../components/client-management/wrappers/UsersWrapper'));
const UserEditWrapper = lazy(() => import('../components/client-management/wrappers/UserEditWrapper'));
const GroupsWrapper = lazy(() => import('../components/client-management/wrappers/GroupsWrapper'));
const SecuritySettings = lazy(() => import('../components/client-management/security/SecuritySettings'));
const MemberSecuritySettings = lazy(() => import('../components/client-management/security/MemberSecuritySettings'));
const ClientManagement = lazy(() => import('../components/client-management/ClientManagement'));
const SecuritySettingsWrapper = lazy(() => import('../components/client-management/wrappers/SecuritySettingsWrapper'));

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
    resourceId: 'route:client-management-root' as ResourceId
  },
  {
    id: 'client-list',
    path: 'list',
    title: 'Clients',
    element: ClientList,
    icon: ListIcon,
    sectionId: 'clientManagement',
    resourceId: 'route:client-management.list' as ResourceId
  },
  {
    id: 'client-edit',
    path: 'edit/:clientId/*',
    title: 'Client Details',
    element: ClientManagementWrapper,
    hideFromSidebar: true,
    sectionId: 'clientManagement',
    resourceId: 'route:client-management.edit' as ResourceId,
    children: [
      {
        id: 'client-contact',
        path: 'contact',
        title: 'Contact Information',
        element: ContactInformation,
        resourceId: 'route:client-management.edit.contact' as ResourceId
      },
      {
        id: 'client-users',
        path: 'users',
        title: 'Users',
        element: UsersWrapper,
        sectionId: 'clientManagement',
        resourceId: 'route:client-management.edit.users' as ResourceId,
        children: [
          {
            id: 'client-user-edit',
            path: ':userId',
            title: 'Edit User',
            element: UserEditWrapper,
            hideFromSidebar: true,
            sectionId: 'clientManagement',
            resourceId: 'route:client-management.edit.users.edit' as ResourceId
          }
        ]
      },
      {
        id: 'client-groups',
        path: 'groups',
        title: 'Groups',
        element: GroupsWrapper,
        sectionId: 'clientManagement',
        resourceId: 'route:client-management.edit.groups' as ResourceId
      },
      {
        id: 'client-security',
        path: 'security',
        title: 'Security Settings',
        element: SecuritySettingsWrapper,
        children: [
          {
            id: 'client-security-settings',
            path: '',
            title: 'Security Settings',
            element: SecuritySettings,
            resourceId: 'route:client-management.edit.security' as ResourceId
          },
          {
            id: 'client-member-security',
            path: 'member-security',
            title: 'Member Security Settings',
            element: MemberSecuritySettings,
            resourceId: 'route:client-management.edit.member-security' as ResourceId
          }
        ]
      }
    ]
  }
];
export default clientManagementRoutes;