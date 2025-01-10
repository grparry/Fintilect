import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import ExceptionTool from './payments/ExceptionTool';
import FISExceptionHandling from './payments/FISExceptionHandling';
import PendingPayments from './payments/PendingPayments';
import ManualProcessing from './payments/ManualProcessing';
import PayeeConversion from './payments/PayeeConversion';
import Holidays from './settings/Holidays';
import BillPayConfig from './settings/BillPayConfig';
import NotificationTemplates from './settings/NotificationTemplates';
import PermissionGroups from './settings/PermissionGroups';
import Reports from './reports/Reports';
import BillPaySecuritySettings from './settings/security/BillPaySecuritySettings';
import Settings from './settings/Settings';
import { paymentApi } from '../../services/api/payment.api';
import { PaymentException, ExceptionResolution, FISException, FISExceptionFilters, FISResponseHistory, FISRetryResult, ExceptionStats } from '../../types/bill-pay.types';
import { PaymentApiResponse, ApiResponse } from '../../types/api.types';

// Define interfaces for the API wrappers
interface ExceptionToolApi {
  getExceptions(): Promise<PaymentApiResponse<PaymentException[]>>;
  resolveException(id: string, resolution: ExceptionResolution): Promise<PaymentApiResponse<void>>;
}

interface FISExceptionApi {
  getExceptions(filters: FISExceptionFilters): Promise<ApiResponse<FISException[]>>;
  getResponseHistory(requestId: string): Promise<ApiResponse<FISResponseHistory[]>>;
  retryException(id: string): Promise<ApiResponse<FISRetryResult>>;
  ignoreException(id: string, notes: string): Promise<ApiResponse<void>>;
  bulkRetry(ids: string[]): Promise<ApiResponse<FISRetryResult[]>>;
  bulkDelete(ids: string[]): Promise<ApiResponse<void>>;
  exportExceptions(filters: FISExceptionFilters): Promise<Blob>;
  getExceptionStats(): Promise<ApiResponse<ExceptionStats>>;
}

const BillPay: React.FC = () => {
  const navigate = useNavigate();
  
  const handleClose = () => {
    navigate('/payments');
  };

  // Create API wrappers that implement the exact interfaces
  const exceptionToolApi: ExceptionToolApi = {
    getExceptions() {
      return paymentApi.getPaymentExceptions();
    },
    resolveException(id: string, resolution: ExceptionResolution) {
      return paymentApi.resolvePaymentException(id, resolution);
    }
  };

  const fisExceptionApi: FISExceptionApi = {
    getExceptions(filters: FISExceptionFilters) {
      return paymentApi.getFISExceptions(filters);
    },
    getResponseHistory(requestId: string) {
      return paymentApi.getFISExceptionHistory(requestId);
    },
    retryException(id: string) {
      return paymentApi.retryFISException(id);
    },
    ignoreException(id: string, notes: string) {
      // Assuming this maps to bulkDelete with a single ID for now
      return paymentApi.bulkDelete([id]);
    },
    bulkRetry(ids: string[]) {
      return paymentApi.bulkRetry(ids);
    },
    bulkDelete(ids: string[]) {
      return paymentApi.bulkDelete(ids);
    },
    async exportExceptions(filters: FISExceptionFilters) {
      const response = await paymentApi.exportExceptions(filters);
      if (!response.success) {
        throw new Error('Failed to export exceptions');
      }
      return response.data;
    },
    getExceptionStats() {
      return paymentApi.getExceptionStats();
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="payments">
        <Route path="exceptions" element={<ExceptionTool api={exceptionToolApi} onClose={handleClose} />} />
        <Route path="fis-exceptions" element={<FISExceptionHandling api={fisExceptionApi} onClose={handleClose} />} />
        <Route path="pending" element={<PendingPayments />} />
        <Route path="manual" element={<ManualProcessing />} />
        <Route path="payee-conversion" element={<PayeeConversion />} />
      </Route>
      <Route path="settings">
        <Route path="holidays" element={<Holidays />} />
        <Route path="config" element={<BillPayConfig />} />
        <Route path="notifications" element={<NotificationTemplates />} />
        <Route path="permissions" element={<PermissionGroups />} />
        <Route path="security" element={<BillPaySecuritySettings />} />
        <Route index element={<Settings />} />
      </Route>
      <Route path="reports" element={<Reports />} />
    </Routes>
  );
};

export default BillPay;
