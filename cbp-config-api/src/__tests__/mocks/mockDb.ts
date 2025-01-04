import { IDatabase } from '../../interfaces/database.interface';
import testData from '../fixtures/testData.json';

export class MockDatabase implements IDatabase {
  private data: any;
  private procedureHandlers: { [key: string]: (params: any) => Promise<{ recordset: any[] }> };

  constructor() {
    this.data = JSON.parse(JSON.stringify(testData)); // Deep clone to prevent mutations
    this.setupProcedureHandlers();
  }

  private setupProcedureHandlers() {
    this.procedureHandlers = {
      // Payment procedures
      'PAYMENT_LIST': this.handlePaymentList.bind(this),
      'PAYMENT_DETAILS': this.handlePaymentDetails.bind(this),
      'PAYMENT_CREATE': this.handlePaymentCreate.bind(this),
      'PAYMENT_UPDATE': this.handlePaymentUpdate.bind(this),
      'PAYMENT_DELETE': this.handlePaymentDelete.bind(this),
      'PENDING_PAYMENTS': this.handlePendingPayments.bind(this),

      // Payee procedures
      'PAYEE_LIST': this.handlePayeeList.bind(this),
      'PAYEE_DETAILS': this.handlePayeeDetails.bind(this),
      'PAYEE_CREATE': this.handlePayeeCreate.bind(this),
      'PAYEE_UPDATE': this.handlePayeeUpdate.bind(this),
      'PAYEE_DELETE': this.handlePayeeDelete.bind(this),

      // Client procedures
      'CLIENT_LIST': this.handleClientList.bind(this),
      'CLIENT_DETAILS': this.handleClientDetails.bind(this),
      'CLIENT_SETTINGS': this.handleClientSettings.bind(this),
      'CLIENT_UPDATE_SETTINGS': this.handleClientUpdateSettings.bind(this),

      // User procedures
      'USER_LIST': this.handleUserList.bind(this),
      'USER_DETAILS': this.handleUserDetails.bind(this),
      'USER_CREATE': this.handleUserCreate.bind(this),
      'USER_UPDATE': this.handleUserUpdate.bind(this),
      'USER_DELETE': this.handleUserDelete.bind(this),

      // Payee options procedures
      'USER_PAYEE_OPTIONS': this.handlePayeeOptions.bind(this),
      'USER_PAYEE_OPTIONS_UPDATE': this.handlePayeeOptionsUpdate.bind(this),

      // Host info procedures
      'USER_HOST_INFO': this.handleHostInfo.bind(this),
      'USER_HOST_INFO_UPDATE': this.handleHostInfoUpdate.bind(this),

      // Activity and alerts procedures
      'ACTIVITY_LIST': this.handleActivityList.bind(this),
      'ALERT_LIST': this.handleAlertList.bind(this),
      'ALERT_UPDATE': this.handleAlertUpdate.bind(this)
    };
  }

  async executeProc(procName: string, params: any = {}): Promise<{ recordset: any[] }> {
    const handler = this.procedureHandlers[procName];
    if (!handler) {
      throw new Error(`Stored procedure ${procName} not implemented in mock`);
    }
    return handler(params);
  }

  async query(sql: string): Promise<{ recordset: any[] }> {
    throw new Error('Direct SQL queries not supported in mock');
  }

  // Reset the database to initial state
  reset() {
    this.data = JSON.parse(JSON.stringify(testData));
  }

  // Payment handlers
  private async handlePaymentList(params: any): Promise<{ recordset: any[] }> {
    let payments = [...this.data.payments];
    
    // Apply filters
    if (params.StartDate) {
      payments = payments.filter(p => new Date(p.EffectiveDate) >= new Date(params.StartDate));
    }
    if (params.EndDate) {
      payments = payments.filter(p => new Date(p.EffectiveDate) <= new Date(params.EndDate));
    }
    if (params.Status) {
      payments = payments.filter(p => p.Status === params.Status);
    }
    if (params.ClientId) {
      payments = payments.filter(p => p.ClientId === params.ClientId);
    }

    // Apply pagination
    const start = ((params.Page || 1) - 1) * (params.PageSize || 10);
    const end = start + (params.PageSize || 10);
    
    return { recordset: payments.slice(start, end) };
  }

  private async handlePaymentDetails(params: any): Promise<{ recordset: any[] }> {
    const payment = this.data.payments.find(p => p.PaymentId === params.PaymentId);
    return { recordset: payment ? [payment] : [] };
  }

  private async handlePendingPayments(params: any): Promise<{ recordset: any[] }> {
    let pending = [...this.data.pendingPayments];
    
    if (params.ClientId) {
      pending = pending.filter(p => p.ClientId === params.ClientId);
    }
    
    return { recordset: pending };
  }

  // Payee handlers
  private async handlePayeeList(params: any): Promise<{ recordset: any[] }> {
    let payees = [...this.data.payees];
    
    if (params.Status) {
      payees = payees.filter(p => p.Status === params.Status);
    }

    const start = ((params.Page || 1) - 1) * (params.PageSize || 10);
    const end = start + (params.PageSize || 10);
    
    return { recordset: payees.slice(start, end) };
  }

  private async handlePayeeDetails(params: any): Promise<{ recordset: any[] }> {
    const payee = this.data.payees.find(p => p.PayeeId === params.PayeeId);
    return { recordset: payee ? [payee] : [] };
  }

  // Client handlers
  private async handleClientList(params: any): Promise<{ recordset: any[] }> {
    const { Status, Type, Page = 1, PageSize = 10 } = params;
    let clients = this.data.clients;

    if (Status) {
      clients = clients.filter(c => c.Status === Status);
    }
    if (Type) {
      clients = clients.filter(c => c.Type === Type);
    }

    const start = (Page - 1) * PageSize;
    const end = start + PageSize;
    const pagedClients = clients.slice(start, end);

    return { recordset: pagedClients };
  }

  private async handleClientDetails(params: any): Promise<{ recordset: any[] }> {
    const { ClientId } = params;
    const client = this.data.clients.find(c => c.ClientId === ClientId);
    return { recordset: client ? [client] : [] };
  }

  private async handleClientSettings(params: any): Promise<{ recordset: any[] }> {
    const { ClientId } = params;
    const client = this.data.clients.find(c => c.ClientId === ClientId);
    return { recordset: client ? [client.Settings] : [] };
  }

  private async handleClientUpdateSettings(params: any): Promise<{ recordset: any[] }> {
    const { ClientId, Settings } = params;
    const clientIndex = this.data.clients.findIndex(c => c.ClientId === ClientId);
    
    if (clientIndex === -1) {
      return { recordset: [] };
    }

    this.data.clients[clientIndex].Settings = Settings;
    return { recordset: [Settings] };
  }

  // User handlers
  private async handleUserList(params: any): Promise<{ recordset: any[] }> {
    let users = [...this.data.users];
    
    if (params.Role) {
      users = users.filter(u => u.Role === params.Role);
    }
    if (params.Status) {
      users = users.filter(u => u.Status === params.Status);
    }

    return { recordset: users };
  }

  private async handleUserDetails(params: any): Promise<{ recordset: any[] }> {
    const user = this.data.users.find(u => u.UserId === params.UserId);
    return { recordset: user ? [user] : [] };
  }

  // Payee options handlers
  private async handlePayeeOptions(params: any): Promise<{ recordset: any[] }> {
    const options = this.data.payeeOptions.find(
      o => o.UserId === params.UserId && o.PayeeId === params.PayeeId
    );
    return { recordset: options ? [options] : [] };
  }

  // Host info handlers
  private async handleHostInfo(params: any): Promise<{ recordset: any[] }> {
    const hostInfo = this.data.hostInfo.find(h => h.UserId === params.UserId);
    return { recordset: hostInfo ? [hostInfo] : [] };
  }

  // Activity handlers
  private async handleActivityList(params: any): Promise<{ recordset: any[] }> {
    let activities = [...this.data.activity];
    
    if (params.UserId) {
      activities = activities.filter(a => a.UserId === params.UserId);
    }
    if (params.Type) {
      activities = activities.filter(a => a.Type === params.Type);
    }
    if (params.StartDate) {
      activities = activities.filter(a => new Date(a.Timestamp) >= new Date(params.StartDate));
    }
    if (params.EndDate) {
      activities = activities.filter(a => new Date(a.Timestamp) <= new Date(params.EndDate));
    }

    const start = ((params.Page || 1) - 1) * (params.PageSize || 10);
    const end = start + (params.PageSize || 10);
    
    return { recordset: activities.slice(start, end) };
  }

  // Alert handlers
  private async handleAlertList(params: any): Promise<{ recordset: any[] }> {
    let alerts = [...this.data.alerts];
    
    if (params.Type) {
      alerts = alerts.filter(a => a.Type === params.Type);
    }
    if (params.Severity) {
      alerts = alerts.filter(a => a.Severity === params.Severity);
    }
    if (params.Status) {
      alerts = alerts.filter(a => a.Status === params.Status);
    }

    const start = ((params.Page || 1) - 1) * (params.PageSize || 10);
    const end = start + (params.PageSize || 10);
    
    return { recordset: alerts.slice(start, end) };
  }

  // Write operation handlers (these are stubs since we don't persist data in tests)
  private async handlePaymentCreate(params: any): Promise<{ recordset: any[] }> {
    return { recordset: [{ PaymentId: 'new_payment_id', ...params }] };
  }

  private async handlePaymentUpdate(params: any): Promise<{ recordset: any[] }> {
    return { recordset: [{ PaymentId: params.PaymentId, ...params }] };
  }

  private async handlePaymentDelete(params: any): Promise<{ recordset: any[] }> {
    return { recordset: [{ PaymentId: params.PaymentId, Status: 'DELETED' }] };
  }

  private async handlePayeeCreate(params: any): Promise<{ recordset: any[] }> {
    return { recordset: [{ PayeeId: 'new_payee_id', ...params }] };
  }

  private async handlePayeeUpdate(params: any): Promise<{ recordset: any[] }> {
    return { recordset: [{ PayeeId: params.PayeeId, ...params }] };
  }

  private async handlePayeeDelete(params: any): Promise<{ recordset: any[] }> {
    return { recordset: [{ PayeeId: params.PayeeId, Status: 'DELETED' }] };
  }

  private async handleUserCreate(params: any): Promise<{ recordset: any[] }> {
    return { recordset: [{ UserId: 'new_user_id', ...params }] };
  }

  private async handleUserUpdate(params: any): Promise<{ recordset: any[] }> {
    return { recordset: [{ UserId: params.UserId, ...params }] };
  }

  private async handleUserDelete(params: any): Promise<{ recordset: any[] }> {
    return { recordset: [{ UserId: params.UserId, Status: 'DELETED' }] };
  }

  private async handlePayeeOptionsUpdate(params: any): Promise<{ recordset: any[] }> {
    return { recordset: [{ UserId: params.UserId, PayeeId: params.PayeeId, ...params }] };
  }

  private async handleHostInfoUpdate(params: any): Promise<{ recordset: any[] }> {
    return { recordset: [{ UserId: params.UserId, ...params }] };
  }

  private async handleAlertUpdate(params: any): Promise<{ recordset: any[] }> {
    return { recordset: [{ AlertId: params.AlertId, ...params }] };
  }
}
