import { 
  PaymentMethod, 
  Environment, 
  ClientStatus, 
  Customer, 
  ClientType
} from '../../../../../types/client.types';
import { mockCustomers } from './mockClientData';

export const paymentMethodOptions: PaymentMethod[] = [
  'ACH',
  'Wire',
  'RTP',
  'Check'
];
export const environmentOptions: Environment[] = [
  Environment.Production,
  Environment.Development
];
export const mockClients = mockCustomers;