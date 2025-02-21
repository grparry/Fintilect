import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import ExceptionTool from './payments/ExceptionTool';
import FISExceptionHandling from './payments/FISExceptionHandling';
import ManagePayments from './payments/ManagePayments';
import ManualProcessing from './payments/ManualProcessing';
import Holidays from './settings/Holidays';
import BillPayConfig from './settings/BillPayConfig';
import NotificationTemplates from './settings/NotificationTemplates';
import PermissionGroups from './settings/PermissionGroups';
import Reports from './reports/Reports';
import BillPaySecuritySettings from './settings/security/BillPaySecuritySettings';
import Settings from './settings/Settings';

const BillPay: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="exceptions" element={<ExceptionTool />} />
        <Route path="fis-exceptions" element={<FISExceptionHandling />} />
        <Route path="manage-payments" element={<ManagePayments />} />
        <Route path="manual-processing" element={<ManualProcessing />} />
        <Route path="settings" element={<Settings />}>
          <Route index element={<Navigate to="config" replace />} />
          <Route path="config" element={<BillPayConfig />} />
          <Route path="holidays" element={<Holidays />} />
          <Route path="notifications" element={<NotificationTemplates />} />
          <Route path="permissions" element={<PermissionGroups />} />
          <Route path="security" element={<BillPaySecuritySettings />} />
        </Route>
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  );
};

export default BillPay;