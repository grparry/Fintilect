import { 
  PaymentMethod, 
  Environment, 
  ClientStatus, 
  Client, 
  ClientType,
  ClientSettings,
  GeneralSettings,
  SecuritySettings
} from '../../../../../types/client.types';
import { mockClients as mockClientData } from './mockClientData';

export const paymentMethodOptions: PaymentMethod[] = [
  'ACH',
  'Wire',
  'RTP',
  'Check'
];

export const environmentOptions: Environment[] = [
  Environment.Production,
  Environment.Staging,
  Environment.Development
];

export const mockClients = mockClientData;
