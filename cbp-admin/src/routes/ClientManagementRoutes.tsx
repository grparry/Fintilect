import React from 'react';
import { lazy } from 'react';
import { useParams } from 'react-router-dom';
import { RouteConfig } from '../types/route.types';

// Lazy load components
const ClientList = lazy(() => import('../components/client-management/ClientList'));
const ClientManagementWrapper = lazy(() => import('../components/client-management/wrappers/ClientManagementWrapper'));
const ContactInformation = lazy(() => import('../components/client-management/ContactInformation'));
const UsersWrapper = lazy(() => import('../components/client-management/wrappers/UsersWrapper'));
const UserEditWrapper = lazy(() => import('../components/client-management/wrappers/UserEditWrapper'));
const GroupsWrapper = lazy(() => import('../components/client-management/wrappers/GroupsWrapper'));
const SecuritySettingsWrapper = lazy(() => import('../components/client-management/wrappers/SecuritySettingsWrapper'));
const AuditSearch = lazy(() => import('../components/client-management/security/AuditSearch'));
const ClientManagementHeader = lazy(() => import('../components/client-management/ClientManagementHeader'));

interface RouteParams {
  clientId?: string;
  userId?: string;
  groupId?: string;
}

// Route configuration
const clientManagementRoutes: RouteConfig[] = [
  {
    id: 'client-management',
    path: '/admin/client-management',
    title: 'Client Management',
    element: ClientManagementHeader,
    icon: 'Business',
    sectionId: 'clientManagement',
  },
  {
    id: 'client-list',
    path: '/admin/client-management/list',
    title: 'Clients',
    element: ClientList,
    icon: 'List',
    sectionId: 'clientManagement',
  },
  {
    id: 'client-details',
    path: '/admin/client-management/:clientId/*',
    title: 'Client Details',
    element: ClientManagementWrapper,
    hideFromSidebar: true,
    sectionId: 'clientManagement',
    children: [
      {
        id: 'client-contact',
        path: 'contact',
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
        element: SecuritySettingsWrapper,
        sectionId: 'clientManagement',
      },
      {
        id: 'client-audit',
        path: 'audit-log',
        title: 'Audit History',
        element: AuditSearch,
        sectionId: 'clientManagement',
      }
    ]
  }
];

export default clientManagementRoutes;
