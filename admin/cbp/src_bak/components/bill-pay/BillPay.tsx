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
import { PaymentTransaction, PaymentType, PaymentMethod, PaymentStatus, PaymentPriority } from '../types/payment.types';
import { PaginatedResponse } from '../../types/common.types';
import { ApiResponse, PaymentApiResponse, ApiSuccessResponse } from '../types/api.types';

// Adapter for ExceptionTool component




// Adapter for ExceptionTool component

// Adapter for FISExceptionHandling component


  // Services

  // Create adapter for ExceptionTool
      
      // Convert ExceptionTool to PaymentException

      );

  // Create adapter for FISExceptionHandling

      // Convert PaymentTransaction to FISException






      );
      );
      




    <Routes>
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="exceptions" element={<ExceptionTool onClose={handleClose} />} />
      <Route path="fis-exceptions" element={<FISExceptionHandling api={fisExceptionAdapter} onClose={handleClose} />} />
      <Route path="pending" element={<PendingPayments />} />
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
  );

