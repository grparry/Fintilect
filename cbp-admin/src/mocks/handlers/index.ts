import { authHandlers } from './authHandlers';
import { billPayHandlers } from './billPayHandlers';
import { billPayConfigHandlers } from './billPayConfigHandlers';
import { billPaySecurityHandlers } from './billPaySecurityHandlers';
import { clientHandlers } from './clientHandlers';
import { holidayHandlers } from './holidayHandlers';
import { memberHandlers } from './memberHandlers';
import { moneyDesktopHandlers } from './moneyDesktopHandlers';
import { notificationTemplateHandlers } from './notificationTemplateHandlers';
import { payeeConversionHandlers } from './payeeConversionHandlers';
import { paymentHandlers } from './paymentHandlers';
import { pendingPaymentsHandlers } from './pendingPaymentsHandlers';
import { permissionHandlers } from './permissionHandlers';
import { reportHandlers } from './reportHandlers';

export const handlers = [
  ...authHandlers,
  ...billPayHandlers,
  ...billPayConfigHandlers,
  ...billPaySecurityHandlers,
  ...clientHandlers,
  ...holidayHandlers,
  ...memberHandlers,
  ...moneyDesktopHandlers,
  ...notificationTemplateHandlers,
  ...payeeConversionHandlers,
  ...paymentHandlers,
  ...pendingPaymentsHandlers,
  ...permissionHandlers,
  ...reportHandlers,
];
