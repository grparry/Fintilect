import { http, HttpResponse } from 'msw';
import { PayeeConversionFile, PayeeConversionFileUploadResponse, PayeeConversionProgressResponse, PayeeConversionRecord } from '../../types/bill-pay.types';
import { mockPayeeConversionFiles } from '../payment-processing/mockPayeeConversionData';

// Simple request ID generator
const generateRequestId = () => `req_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export const payeeConversionHandlers = [
  // Get payee conversion files
  http.get('*/api/v1/payment/payee-conversion/files', () => {
    console.log('Mock Handler - Entering payee conversion files handler');
    console.log('Mock Handler - Mock data type:', typeof mockPayeeConversionFiles);
    console.log('Mock Handler - Mock data is array?', Array.isArray(mockPayeeConversionFiles));
    console.log('Mock Handler - Mock data:', JSON.stringify(mockPayeeConversionFiles, null, 2));
    
    // Return just the array since PaymentApi will handle wrapping it in the success response
    return HttpResponse.json(mockPayeeConversionFiles, { status: 200 });
  }),

  // Get payee conversion file details
  http.get('*/api/v1/payment/payee-conversion/:fileId', ({ params }) => {
    const { fileId } = params;
    
    const file: PayeeConversionFileUploadResponse = {
      id: fileId as string,
      name: 'payees_batch_1.csv',
      status: 'PENDING',
      validation: {
        totalRecords: 100,
        validRecords: 95,
        invalidRecords: 5,
        errors: [
          { field: 'accountNumber', message: 'Invalid account number format' },
          { field: 'routingNumber', message: 'Invalid routing number' }
        ],
        warnings: [
          { field: 'name', message: 'Name might contain special characters' }
        ]
      },
      createdAt: new Date().toISOString()
    };

    return HttpResponse.json({
      success: true,
      data: file,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: generateRequestId()
      }
    });
  }),

  // Get payee conversion records
  http.get('*/api/v1/payment/payee-conversion/:fileId/records', ({ params }) => {
    const fileId = params.fileId as string;
    
    const records: PayeeConversionRecord[] = [
      {
        id: 'pcr_1',
        fileId: fileId,
        payeeName: 'John Doe',
        payeeId: 'pay_1',
        status: 'PROCESSED',
        createdAt: new Date().toISOString(),
        processedAt: new Date().toISOString()
      },
      {
        id: 'pcr_2',
        fileId: fileId,
        payeeName: 'Jane Smith',
        status: 'FAILED',
        error: 'Invalid account number',
        createdAt: new Date().toISOString()
      }
    ];

    return HttpResponse.json({
      success: true,
      data: records,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: generateRequestId()
      }
    });
  }),

  // Upload payee conversion file
  http.post('*/api/v1/payment/payee-conversion/upload', async () => {
    const file: PayeeConversionFileUploadResponse = {
      id: 'pcf_' + Date.now(),
      name: 'uploaded_file.csv',
      status: 'PENDING',
      validation: {
        totalRecords: 100,
        validRecords: 95,
        invalidRecords: 5,
        errors: [
          { field: 'accountNumber', message: 'Invalid account number format' }
        ],
        warnings: [
          { field: 'name', message: 'Name might contain special characters' }
        ]
      },
      createdAt: new Date().toISOString()
    };

    return HttpResponse.json({
      success: true,
      data: file,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: generateRequestId()
      }
    });
  }),

  // Start payee conversion
  http.post('*/api/v1/payment/payee-conversion/:fileId/start', () => {
    return HttpResponse.json({
      success: true,
      data: null,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: generateRequestId()
      }
    });
  }),

  // Get payee conversion progress
  http.get('*/api/v1/payment/payee-conversion/:fileId/progress', ({ params }) => {
    const { fileId } = params;
    
    const progress: PayeeConversionProgressResponse = {
      id: fileId as string,
      name: 'payees_batch_1.csv',
      status: 'PROCESSING',
      validation: {
        totalRecords: 100,
        validRecords: 50,
        invalidRecords: 5,
        errors: [
          { field: 'accountNumber', message: 'Invalid account number format' }
        ],
        warnings: [
          { field: 'name', message: 'Name might contain special characters' }
        ]
      },
      createdAt: new Date().toISOString()
    };

    return HttpResponse.json({
      success: true,
      data: progress,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: generateRequestId()
      }
    });
  })
];
