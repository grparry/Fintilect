import React from 'react';
import { lazy } from 'react';

// Lazy load components
const MemberDashboard = lazy(() => import('../components/emerge-admin/member-center/MemberDashboard'));
const MoneyDesktop = lazy(() => import('../components/emerge-admin/MoneyDesktop'));
const emergeAdminRoutes = [
  {
    path: '/member-center',
    element: MemberDashboard,
    title: 'Member Center',
    icon: 'Group',
  },
  {
    path: '/money-desktop',
    element: MoneyDesktop,
    title: 'Money Desktop',
    icon: 'AccountBalance',
  },
];
export default emergeAdminRoutes;