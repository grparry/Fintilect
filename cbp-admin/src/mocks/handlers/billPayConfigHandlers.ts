import { http, HttpResponse } from 'msw';
import { BillPayConfig, BillPayConfigUpdate } from '../../types/bill-pay.types';
import { SystemConfiguration } from '../../types/configuration.types';
import { BILL_PAY_CONFIG_KEYS, DEFAULT_BILL_PAY_CONFIG } from '../../constants/configuration.constants';

const mockBillPayConfig: BillPayConfig = {
  id: '1',
  ...DEFAULT_BILL_PAY_CONFIG,
  lastUpdatedAt: new Date().toISOString(),
  lastUpdatedBy: 'admin'
};

const mockSystemConfig: SystemConfiguration = {
  configurations: [
    {
      key: BILL_PAY_CONFIG_KEYS.CUTOFF_TIME,
      value: DEFAULT_BILL_PAY_CONFIG.cutoffTime,
      category: 'bill_pay',
      lastUpdated: new Date().toISOString(),
      updatedBy: 'admin'
    },
    {
      key: BILL_PAY_CONFIG_KEYS.MAX_DAILY_LIMIT,
      value: DEFAULT_BILL_PAY_CONFIG.maxDailyLimit,
      category: 'bill_pay',
      lastUpdated: new Date().toISOString(),
      updatedBy: 'admin'
    },
    {
      key: BILL_PAY_CONFIG_KEYS.MAX_TRANSACTION_LIMIT,
      value: DEFAULT_BILL_PAY_CONFIG.maxTransactionLimit,
      category: 'bill_pay',
      lastUpdated: new Date().toISOString(),
      updatedBy: 'admin'
    },
    {
      key: BILL_PAY_CONFIG_KEYS.ALLOW_WEEKEND_PROCESSING,
      value: DEFAULT_BILL_PAY_CONFIG.allowWeekendProcessing,
      category: 'bill_pay',
      lastUpdated: new Date().toISOString(),
      updatedBy: 'admin'
    },
    {
      key: BILL_PAY_CONFIG_KEYS.REQUIRE_DUAL_APPROVAL,
      value: DEFAULT_BILL_PAY_CONFIG.requireDualApproval,
      category: 'bill_pay',
      lastUpdated: new Date().toISOString(),
      updatedBy: 'admin'
    },
    {
      key: BILL_PAY_CONFIG_KEYS.RETRY_ATTEMPTS,
      value: DEFAULT_BILL_PAY_CONFIG.retryAttempts,
      category: 'bill_pay',
      lastUpdated: new Date().toISOString(),
      updatedBy: 'admin'
    },
    {
      key: BILL_PAY_CONFIG_KEYS.NOTIFICATION_EMAIL,
      value: DEFAULT_BILL_PAY_CONFIG.notificationEmail,
      category: 'bill_pay',
      lastUpdated: new Date().toISOString(),
      updatedBy: 'admin'
    },
    {
      key: BILL_PAY_CONFIG_KEYS.ENABLE_EMAIL_NOTIFICATIONS,
      value: DEFAULT_BILL_PAY_CONFIG.enableEmailNotifications,
      category: 'bill_pay',
      lastUpdated: new Date().toISOString(),
      updatedBy: 'admin'
    }
  ]
};

export const billPayConfigHandlers = [
  // Real API endpoint
  http.get('*/configuration/all', () => {
    console.log('MSW: Handling /configuration/all request');
    return HttpResponse.json({
      success: true,
      data: mockSystemConfig
    });
  }),

  // Mock endpoints for development
  http.get('*/bill-pay/config', () => {
    console.log('MSW: Handling bill-pay config request');
    return HttpResponse.json({
      success: true,
      data: mockBillPayConfig
    });
  }),

  http.put('*/bill-pay/config', async ({ request }) => {
    console.log('MSW: Handling bill-pay config update request');
    const update = await request.json() as BillPayConfigUpdate;

    const updatedConfig: BillPayConfig = {
      ...mockBillPayConfig,
      ...update,
      lastUpdatedAt: new Date().toISOString(),
      lastUpdatedBy: 'admin',
      validationRules: {
        ...mockBillPayConfig.validationRules,
        maxTransactionAmount: update.maxTransactionLimit ?? mockBillPayConfig.validationRules.maxTransactionAmount,
        maxDailyLimit: update.maxDailyLimit ?? mockBillPayConfig.validationRules.maxDailyLimit
      }
    };

    return HttpResponse.json({
      success: true,
      data: updatedConfig
    });
  }),

  http.post('*/bill-pay/config/validate', async ({ request }) => {
    console.log('MSW: Handling bill-pay config validation request');
    const data = await request.json() as BillPayConfigUpdate;
    
    const errors = [];
    if (data.maxDailyLimit && data.maxDailyLimit < DEFAULT_BILL_PAY_CONFIG.validationRules.minDailyLimit) {
      errors.push({ field: 'maxDailyLimit', message: 'Daily limit too low' });
    }
    if (data.maxTransactionLimit && data.maxTransactionLimit < DEFAULT_BILL_PAY_CONFIG.validationRules.minTransactionAmount) {
      errors.push({ field: 'maxTransactionLimit', message: 'Transaction limit too low' });
    }

    return HttpResponse.json({
      success: true,
      data: {
        valid: errors.length === 0,
        errors
      }
    });
  }),

  http.post('*/bill-pay/config/reset', () => {
    console.log('MSW: Handling bill-pay config reset request');
    return HttpResponse.json({
      success: true,
      data: mockBillPayConfig
    });
  }),

  http.post('*/bill-pay/config/test-email', async ({ request }) => {
    console.log('MSW: Handling test email request');
    const { email } = await request.json() as { email: string };
    
    return HttpResponse.json({
      success: true,
      data: {
        success: true,
        message: `Test email sent to ${email}`
      }
    });
  })
];
