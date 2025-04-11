import React from 'react';
import { useLocation } from 'react-router-dom';
import logger from '../../../utils/logger';

// Import landing pages
import ReportsLanding from './ReportsLanding';
import PaymentReportsLanding from './PaymentReportsLanding';
import RecurringPaymentReportsLanding from './RecurringPaymentReportsLanding';
import UserPayeeReportsLanding from './UserPayeeReportsLanding';
import SystemComplianceReportsLanding from './SystemComplianceReportsLanding';

// Import individual report components
import PaymentActivityReport from './reports/PaymentActivityReport';
import ErrorRecapReport from './reports/ErrorRecapReport';
import ActiveUserCountReport from './reports/ActiveUserCountReport';
import FailedOnUsReport from './reports/FailedOnUsReport';
import GlobalHolidaysReport from './reports/GlobalHolidaysReport';
import MonthlyUsersReport from './reports/MonthlyUsersReport';
import OnUsPostingsReport from './reports/OnUsPostingsReport';
import PayeeReport from './reports/PayeeReport';
import PaymentReport from './reports/PaymentReport';
import PaymentClearReport from './reports/PaymentClearReport';
import RecurringPaymentReport from './reports/RecurringPaymentReport';
import PendingPaymentsReport from './reports/PendingPaymentsReport';
import ProcessingConfirmationReport from './reports/ProcessingConfirmationReport';
import RecurringPaymentChangeHistoryReport from './reports/RecurringPaymentChangeHistoryReport';
import ScheduledPaymentChangeHistoryReport from './reports/ScheduledPaymentChangeHistoryReport';
import StatusesWithNotificationsReport from './reports/StatusesWithNotificationsReport';
import UserPayeeChangeHistoryReport from './reports/UserPayeeChangeHistoryReport';
import UserPayeeReport from './reports/UserPayeeReport';
import OFACExceptionsReport from './reports/OFACExceptionsReport';
import SuspendedPaymentReport from './reports/SuspendedPaymentReport';
import SettlementSummaryReport from './reports/SettlementSummaryReport';
import LargePaymentReport from './reports/LargePaymentReport';

/**
 * Reports component that serves as the entry point for the reports section
 * This component conditionally renders the appropriate report page based on the current URL path
 */
const Reports: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  
  logger.log('Current path:', path);
  
  // Helper function to check if path matches a pattern
  const matchPath = (pattern: string): boolean => {
    // Normalize paths by removing trailing slashes
    const normalizedPath = path.replace(/\/$/, '');
    const normalizedPattern = pattern.replace(/\/$/, '');
    return normalizedPath.includes(normalizedPattern);
  };
  
  // Category landing pages
  if (matchPath('/admin/bill-pay/reports/payment-reports')) {
    logger.log('Rendering PaymentReportsLanding');
    return <PaymentReportsLanding />;
  } else if (matchPath('/admin/bill-pay/reports/recurring-payment-reports')) {
    logger.log('Rendering RecurringPaymentReportsLanding');
    return <RecurringPaymentReportsLanding />;
  } else if (matchPath('/admin/bill-pay/reports/user-payee-reports')) {
    logger.log('Rendering UserPayeeReportsLanding');
    return <UserPayeeReportsLanding />;
  } else if (matchPath('/admin/bill-pay/reports/system-compliance-reports')) {
    logger.log('Rendering SystemComplianceReportsLanding');
    return <SystemComplianceReportsLanding />;
  }
  
  // Individual report pages
  else if (matchPath('/admin/bill-pay/reports/payment-activity')) {
    return <PaymentActivityReport />;
  } else if (matchPath('/admin/bill-pay/reports/error-recap')) {
    return <ErrorRecapReport />;
  } else if (matchPath('/admin/bill-pay/reports/active-user-count')) {
    return <ActiveUserCountReport />;
  } else if (matchPath('/admin/bill-pay/reports/failed-on-us')) {
    return <FailedOnUsReport />;
  } else if (matchPath('/admin/bill-pay/reports/global-holidays')) {
    return <GlobalHolidaysReport />;
  } else if (matchPath('/admin/bill-pay/reports/monthly-users')) {
    return <MonthlyUsersReport />;
  } else if (matchPath('/admin/bill-pay/reports/on-us-postings')) {
    return <OnUsPostingsReport />;
  } else if (matchPath('/admin/bill-pay/reports/payee')) {
    return <PayeeReport />;
  } else if (path.match(/\/admin\/bill-pay\/reports\/payment$|\/admin\/bill-pay\/reports\/payment\//)) {
    return <PaymentReport />;
  } else if (matchPath('/admin/bill-pay/reports/payment-clear')) {
    return <PaymentClearReport />;
  } else if (matchPath('/admin/bill-pay/reports/recurring-payment')) {
    return <RecurringPaymentReport />;
  } else if (matchPath('/admin/bill-pay/reports/pending-payments')) {
    return <PendingPaymentsReport />;
  } else if (matchPath('/admin/bill-pay/reports/processing-confirmation')) {
    return <ProcessingConfirmationReport />;
  } else if (matchPath('/admin/bill-pay/reports/recurring-payment-change-history')) {
    return <RecurringPaymentChangeHistoryReport />;
  } else if (matchPath('/admin/bill-pay/reports/scheduled-payment-change-history')) {
    return <ScheduledPaymentChangeHistoryReport />;
  } else if (matchPath('/admin/bill-pay/reports/statuses-with-notifications')) {
    return <StatusesWithNotificationsReport />;
  } else if (matchPath('/admin/bill-pay/reports/user-payee-change-history')) {
    return <UserPayeeChangeHistoryReport />;
  } else if (matchPath('/admin/bill-pay/reports/user-payee')) {
    return <UserPayeeReport />;
  } else if (matchPath('/admin/bill-pay/reports/ofac-exceptions')) {
    return <OFACExceptionsReport />;
  } else if (matchPath('/admin/bill-pay/reports/suspended-payment')) {
    return <SuspendedPaymentReport />;
  } else if (matchPath('/admin/bill-pay/reports/settlement-summary')) {
    return <SettlementSummaryReport />;
  } else if (matchPath('/admin/bill-pay/reports/large-payment')) {
    return <LargePaymentReport />;
  }
  
  // Default to the main reports landing page
  logger.log('Rendering default ReportsLanding');
  return <ReportsLanding />;
};

export default Reports;
