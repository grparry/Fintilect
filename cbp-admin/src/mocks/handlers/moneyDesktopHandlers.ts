import { http, HttpResponse } from 'msw';
import { mockAccounts, mockConnections } from '../emerge-admin/money-desktop';

export const moneyDesktopHandlers = [
  // Get connections
  http.get('*/money-desktop/connections', () => {
    return HttpResponse.json({
      success: true,
      data: mockConnections
    });
  }),

  // Get accounts
  http.get('*/money-desktop/accounts', () => {
    return HttpResponse.json({
      success: true,
      data: mockAccounts
    });
  }),

  // Sync connection
  http.post('*/money-desktop/connections/:id/sync', () => {
    return HttpResponse.json({
      success: true,
      message: 'Connection sync initiated'
    });
  })
];
