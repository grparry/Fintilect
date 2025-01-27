import { IPayeeService } from '../../interfaces/IPayeeService';
import { BaseMockService } from './BaseMockService';
import {
  Payee,
  PayeeStatus,
  PayeeType,
  PayeeValidationResult,
  PayeeConversionSummary,
  PayeeConversionFilters,
  PayeeConversionFile,
  PayeeConversionValidation,
  PayeeConversionFileUploadResponse,
  PayeeConversionProgressResponse,
  PayeeConversionProgress,
  PayeeConversionRecord,
  PayeeConversionTemplate
} from '../../../types/bill-pay.types';
import { PaginatedResponse } from '../../../types/common.types';

export class MockPayeeService extends BaseMockService implements IPayeeService {
  private mockPayees: Payee[] = [
    {


    {
    {
  ];

    {
        { name: 'name', required: true, type: 'string' },
        { name: 'accountNumber', required: true, type: 'string' },
        { name: 'routingNumber', required: true, type: 'string' },
        { name: 'bankName', required: true, type: 'string' }
      ],
  ];

  ) {


      );



      ...payee,

    
      ...this.mockPayees[index],
      ...payee,


    );



      {
    ];


      {
    ];

  ): Promise<PayeeConversionFileUploadResponse> {
          { field: 'accountNumber', message: 'Invalid format' }
        ],
          { field: 'bankName', message: 'Bank name not recognized' }
        ]




    // Mock implementation - no action needed


  ): Promise<PayeeConversionTemplate> {
      ...template,

  ): Promise<PayeeConversionTemplate> {
    
      ...this.mockTemplates[index],
      ...template,


      {
      {
    ];

  ): Promise<string> {

  ): Promise<{
