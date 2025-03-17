import {
  BillPayConfig
} from '../../../../../types/bill-pay.types';

import {
  NotificationResponse
} from '../../../../../types/notification.types';

import {
  Holiday,
  HolidayType,
  HolidayStatus,
} from '../../../../../types/calendar.types';

export const mockTemplates: NotificationResponse[] = [
  {
    id: '1',
    errorNumber: 100,
    statusCode: 200,
    matchMode: 1,
    matchOrder: 1,
    matchText: 'Payment Confirmation',
    messageSubject: 'Payment Confirmation',
    messageBody: 'Your payment has been processed',
    emailMember: true,
    emailMemberServices: false,
    emailSysOp: false,
    notes: '',
    symmetry: false,
    emerge: false
  },
  {
    id: '2',
    errorNumber: 101,
    statusCode: 400,
    matchMode: 1,
    matchOrder: 1,
    matchText: 'Payment Failed',
    messageSubject: 'Payment Failed',
    messageBody: 'Your payment has failed',
    emailMember: true,
    emailMemberServices: true,
    emailSysOp: true,
    notes: 'Sent when a payment fails',
    symmetry: false,
    emerge: true
  }
];

export const availableVariables: string[] = [
  'amount',
  'date',
  'paymentID',
  'status'
];

export const initialHolidays: Holiday[] = [
  {
    id: 1,
    name: 'New Year\'s Day',
    date: '2024-01-01',
    type: 'Federal' as HolidayType,
    status: 'Active' as HolidayStatus
  },
  {
    id: 2,
    name: 'Memorial Day',
    date: '2024-05-27',
    type: 'Federal' as HolidayType,
    status: 'Active' as HolidayStatus
  }
];
