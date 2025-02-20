import React from 'react';
import { Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import ExceptionTool from './payments/ExceptionTool';
import FISExceptionHandling from './payments/FISExceptionHandling';
import ManagePayments from './payments/ManagePayments';
import ManualProcessing from './payments/ManualProcessing';
import PayeeConversion from './payments/PayeeConversion';
import Holidays from './settings/Holidays';
import BillPayConfig from './settings/BillPayConfig';
import NotificationTemplates from './settings/NotificationTemplates';
import PermissionGroups from './settings/PermissionGroups';
import Reports from './reports/Reports';
import BillPaySecuritySettings from './settings/security/BillPaySecuritySettings';
import Settings from './settings/Settings';
import { ServiceFactory } from '../../services/factory/ServiceFactory';
import { IBillPayService } from '../../services/interfaces/IBillPayService';
import { IPaymentProcessorService } from '../../services/interfaces/IPaymentProcessorService';
import { IExceptionService } from '../../services/interfaces/IExceptionService';
import {
  PaymentException,
  ExceptionResolution,
  FISException,
  FISExceptionFilters,
  FISResponseHistory,
  FISRetryResult,
  ExceptionStats,
  ExceptionFilters,
  ExceptionTool as ExceptionToolType,
  ExceptionStatus,
  FISExceptionStatus,
  FISErrorCode
} from '../../types/bill-pay.types';
import { PaymentTransaction, PaymentType, PaymentMethod, PaymentStatus, PaymentPriority } from '../../types/payment.types';
import { PaginatedResponse } from '../../types/common.types';
import { ApiResponse, PaymentApiResponse, ApiSuccessResponse } from '../../types/api.types';

// Adapter for ExceptionTool component
interface ExceptionToolAdapter {
  getExceptions(): Promise<PaymentApiResponse<PaymentException[]>>;
  resolveException(id: string, resolution: ExceptionResolution): Promise<PaymentApiResponse<void>>;
}
// Adapter for FISExceptionHandling component
interface FISExceptionAdapter {
  getExceptions(filters: FISExceptionFilters): Promise<ApiSuccessResponse<FISException[]>>;
  getResponseHistory(requestId: string): Promise<ApiSuccessResponse<FISResponseHistory[]>>;
  retryException(id: string): Promise<ApiSuccessResponse<FISRetryResult>>;
  ignoreException(id: string, notes: string): Promise<ApiSuccessResponse<void>>;
  bulkRetry(ids: string[]): Promise<ApiSuccessResponse<FISRetryResult[]>>;
  bulkDelete(ids: string[]): Promise<ApiSuccessResponse<void>>;
  exportExceptions(filters: FISExceptionFilters): Promise<Blob>;
  getExceptionStats(): Promise<ApiSuccessResponse<ExceptionStats>>;
}
const BillPay: React.FC = () => {
  const navigate = useNavigate();
  // Services
  const billPayService = ServiceFactory.getInstance().getBillPayService();
  const paymentProcessorService = ServiceFactory.getInstance().getPaymentProcessorService();
  const exceptionService = ServiceFactory.getInstance().getExceptionService();
  // Create adapter for ExceptionTool
  const exceptionToolAdapter: ExceptionToolAdapter = {
    async getExceptions() {
      const response = await exceptionService.getExceptions({
        status: [FISExceptionStatus.PENDING],
        page: 1,
        limit: 100
      });
      // Convert ExceptionTool to PaymentException
      const paymentExceptions: PaymentException[] = response.items.map(item => ({
        id: item.id.toString(),
        paymentId: item.paymentId,
        type: item.paymentType,
        status: FISExceptionStatus.PENDING,
        message: item.errorMessage,
        details: { errorCode: item.errorCode },
        createdAt: item.timestamp,
        updatedAt: item.timestamp,
        resolutions: []
      }));
      return {
        success: true,
        data: paymentExceptions,
        error: null
      };
    },
    async resolveException(id: string, resolution: ExceptionResolution) {
      await exceptionService.updateExceptionStatus(
        id,
        resolution.type === 'ignore' ? 'Resolved' : 'Pending',
        resolution.notes
      );
      return {
        success: true,
        data: void 0,
        error: null
      };
    }
  };
  // Create adapter for FISExceptionHandling
  const fisExceptionAdapter: FISExceptionAdapter = {
    async getExceptions(filters: FISExceptionFilters): Promise<ApiSuccessResponse<FISException[]>> {
      const response = await paymentProcessorService.searchTransactions({
        status: filters.status?.map(s => PaymentStatus[s as keyof typeof PaymentStatus]),
        type: PaymentType.DEBIT
      });
      // Convert PaymentTransaction to FISException
      const fisExceptions: FISException[] = response.items.map(tx => ({
        id: tx.id,
        requestId: tx.metadata?.requestId?.toString() || '',
        status: tx.status === PaymentStatus.FAILED ? FISExceptionStatus.FAILED : FISExceptionStatus.PENDING,
        errorCode: tx.metadata?.errorCode as FISErrorCode || FISErrorCode.TECHNICAL_ERROR,
        errorMessage: tx.metadata?.errorMessage?.toString() || 'Technical error occurred',
        metadata: tx.metadata || {},
        createdAt: tx.createdAt.toISOString(),
        updatedAt: tx.updatedAt.toISOString(),
        retryCount: Number(tx.metadata?.retryCount) || 0
      }));
      return {
        success: true,
        data: fisExceptions,
        meta: {
          timestamp: new Date().toISOString(),
          requestId: 'FIS-' + Date.now()
        }
      };
    },
    async getResponseHistory(requestId: string): Promise<ApiSuccessResponse<FISResponseHistory[]>> {
      const tx = await paymentProcessorService.getTransaction(requestId);
      const history: FISResponseHistory[] = [{
        id: tx.id,
        requestId: tx.metadata?.requestId?.toString() || '',
        status: tx.status === PaymentStatus.FAILED ? FISExceptionStatus.FAILED : FISExceptionStatus.PENDING,
        response: tx.metadata || {},
        timestamp: tx.updatedAt.toISOString(),
        retryCount: Number(tx.metadata?.retryCount || 0)
      }];
      return {
        success: true,
        data: history,
        meta: {
          timestamp: new Date().toISOString(),
          requestId: 'FIS-HISTORY-' + Date.now()
        }
      };
    },
    async retryException(id: string): Promise<ApiSuccessResponse<FISRetryResult>> {
      const tx: PaymentTransaction = {
        id,
        clientId: 'FIS',
        amount: 0,
        currency: 'USD',
        method: PaymentMethod.ACH,
        type: PaymentType.DEBIT,
        status: PaymentStatus.PENDING,
        priority: PaymentPriority.HIGH,
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
          retry: true,
          retryCount: 1
        }
      };
      const result = await paymentProcessorService.processPayment(tx);
      const retryResult: FISRetryResult = {
        success: result.status === PaymentStatus.COMPLETED,
        message: result.metadata?.errorMessage?.toString() || 'Retry successful',
        retryCount: Number(result.metadata?.retryCount || 1),
        lastRetryAt: result.updatedAt.toISOString(),
        newStatus: result.status
      };
      return {
        success: true,
        data: retryResult,
        meta: {
          timestamp: new Date().toISOString(),
          requestId: 'FIS-RETRY-' + Date.now()
        }
      };
    },
    async ignoreException(id: string, notes: string): Promise<ApiSuccessResponse<void>> {
      const tx: PaymentTransaction = {
        id,
        clientId: 'FIS',
        amount: 0,
        currency: 'USD',
        method: PaymentMethod.ACH,
        type: PaymentType.DEBIT,
        status: PaymentStatus.CANCELLED,
        priority: PaymentPriority.LOW,
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
          notes,
          ignored: true
        }
      };
      await paymentProcessorService.processPayment(tx);
      return {
        success: true,
        data: void 0,
        meta: {
          timestamp: new Date().toISOString(),
          requestId: 'FIS-IGNORE-' + Date.now()
        }
      };
    },
    async bulkRetry(ids: string[]): Promise<ApiSuccessResponse<FISRetryResult[]>> {
      const results = await Promise.all(
        ids.map(id => this.retryException(id))
      );
      return {
        success: true,
        data: results.map(r => r.data),
        meta: {
          timestamp: new Date().toISOString(),
          requestId: 'FIS-BULK-RETRY-' + Date.now()
        }
      };
    },
    async bulkDelete(ids: string[]): Promise<ApiSuccessResponse<void>> {
      await Promise.all(
        ids.map(id => this.ignoreException(id, 'Bulk delete'))
      );
      return {
        success: true,
        data: void 0,
        meta: {
          timestamp: new Date().toISOString(),
          requestId: 'FIS-BULK-DELETE-' + Date.now()
        }
      };
    },
    async exportExceptions(filters: FISExceptionFilters): Promise<Blob> {
      const response = await this.getExceptions(filters);
      const blob = new Blob([JSON.stringify(response.data, null, 2)], {
        type: 'application/json'
      });
      return blob;
    },
    async getExceptionStats(): Promise<ApiSuccessResponse<ExceptionStats>> {
      const response = await this.getExceptions({});
      const byStatus = response.data.reduce((acc: Record<string, number>, curr: FISException) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      }, {});
      const stats: ExceptionStats = {
        total: response.data.length,
        byStatus,
        byType: {
          FIS: response.data.length,
          ACH: 0,
          WIRE: 0
        },
        resolutionRate: 0,
        averageRetryCount: response.data.reduce((acc: number, curr: FISException) => acc + curr.retryCount, 0) / response.data.length
      };
      return {
        success: true,
        data: stats,
        meta: {
          timestamp: new Date().toISOString(),
          requestId: 'FIS-STATS-' + Date.now()
        }
      };
    }
  };
  const handleClose = () => {
    navigate('/payments');
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="exceptions" element={<ExceptionTool onClose={handleClose} />} />
        <Route path="fis-exceptions" element={<FISExceptionHandling />} />
        <Route path="manage" element={<ManagePayments />} />
        <Route path="manual" element={<ManualProcessing />} />
        <Route path="payee-conversion" element={<PayeeConversion />} />
        <Route path="settings">
          <Route index element={<Settings />} />
          <Route path="holidays" element={<Holidays />} />
          <Route path="config" element={<BillPayConfig />} />
          <Route path="notifications" element={<NotificationTemplates />} />
          <Route path="permissions" element={<PermissionGroups />} />
          <Route path="security" element={<BillPaySecuritySettings />} />
        </Route>
        <Route path="reports" element={<Reports />} />
      </Routes>
      <Outlet />
    </>
  );
};
export default BillPay;