import { PayeeConversionFile } from '../../types/bill-pay.types';

export const mockPayeeConversionFiles: PayeeConversionFile[] = [
  {
    id: 'pcf_1',
    name: 'payee_conversion_20240101.csv',
    status: 'PROCESSED',
    createdAt: '2024-01-01T10:00:00Z',
    processedAt: '2024-01-01T10:05:00Z'
  },
  {
    id: 'pcf_2',
    name: 'payee_conversion_20240102.csv',
    status: 'PENDING',
    createdAt: '2024-01-02T10:00:00Z'
  }
];
