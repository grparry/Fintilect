import { setupWorker } from 'msw/browser';
import { memberHandlers } from './handlers/memberHandlers';
import { billPayHandlers } from './handlers/billPayHandlers';
import { moneyDesktopHandlers } from './handlers/moneyDesktopHandlers';
import { reportHandlers } from './handlers/reportHandlers';
import { payeeConversionHandlers } from './handlers/payeeConversionHandlers';
import { billPayConfigHandlers } from './handlers/billPayConfigHandlers';
import { notificationTemplateHandlers } from './handlers/notificationTemplateHandlers';
import { permissionHandlers } from './handlers/permissionHandlers';
import { billPaySecurityHandlers } from './handlers/billPaySecurityHandlers';
import { holidayHandlers } from './handlers/holidayHandlers';
import { clientHandlers } from './handlers/clientHandlers';
import { paymentHandlers } from './handlers/paymentHandlers';

// Log all registered handlers for debugging
console.log('MSW: Registering handlers', {
  payeeConversion: payeeConversionHandlers.map(h => h.info.path),
  reports: reportHandlers.map(h => h.info.path),
  billPay: billPayHandlers.map(h => h.info.path),
  moneyDesktop: moneyDesktopHandlers.map(h => h.info.path),
  member: memberHandlers.map(h => h.info.path),
  billPayConfig: billPayConfigHandlers.map(h => h.info.path),
  notificationTemplate: notificationTemplateHandlers.map(h => h.info.path),
  permission: permissionHandlers.map(h => h.info.path),
  billPaySecurity: billPaySecurityHandlers.map(h => h.info.path),
  holiday: holidayHandlers.map(h => h.info.path),
  client: clientHandlers.map(h => h.info.path),
  payment: paymentHandlers.map(h => h.info.path)
});

// Create the worker instance
export const worker = setupWorker(
  ...memberHandlers,
  ...billPayHandlers,
  ...moneyDesktopHandlers,
  ...reportHandlers,
  ...payeeConversionHandlers,
  ...billPayConfigHandlers,
  ...notificationTemplateHandlers,
  ...permissionHandlers,
  ...billPaySecurityHandlers,
  ...holidayHandlers,
  ...clientHandlers,
  ...paymentHandlers
);
