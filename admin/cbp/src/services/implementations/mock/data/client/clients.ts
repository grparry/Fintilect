import { 
  PaymentMethod, 
  Environment, 
  ClientStatus, 
  Client, 
  ClientType
} from '../../../../../types/client.types';

export const paymentMethodOptions: PaymentMethod[] = [
  'ACH',
  'Wire',
  'RTP',
  'Check'
];

export const environmentOptions: Environment[] = [
  'PRODUCTION',
  'DEVELOPMENT'
];

export { mockClients } from './mockClientData';