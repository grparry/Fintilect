import { 
  ExceptionTool,
  ExceptionToolStatus,
  ExceptionToolPriority,
  FISException,
  FISExceptionStatus,
  FISExceptionHistory,
  FISResponseHistory,
  FISRetryResult,
  FISRefundRequest,
  ExceptionFilters,
  FISExceptionFilters,
  FISErrorCode,
  PaymentType,
  PaymentStatus
} from '../../../types/bill-pay.types';
import { IExceptionService } from '../../interfaces/IExceptionService';
import { PaginatedResponse } from '../../../types/common.types';
import { BaseMockService } from './BaseMockService';
import { v4 as uuidv4 } from 'uuid';

export class MockExceptionService extends BaseMockService implements IExceptionService {
  private exceptions: Map<string, ExceptionTool> = new Map();
  private fisExceptions: Map<string, FISException> = new Map();
  private auditTrails: Map<string, Array<{
    action: string;
    performedBy: string;
    timestamp: string;
    details: Record<string, unknown>;
  }>> = new Map();
  private notes: Map<string, Array<{
    id: string;
    content: string;
    createdBy: string;
    createdAt: string;
  }>> = new Map();

  constructor(basePath: string = '/api/v1/exceptions') {
    super(basePath);
    this.initializeMockData();
  }

  private initializeMockData(): void {
    // Initialize mock exceptions




    // Initialize mock exceptions

    // Initialize mock FIS exceptions


        





      ...exception,


      ...exception,







      {
    ];

      {
    ];


      ...exception,


      ...exception,

    // Add to audit trail


    // Calculate status breakdown

    // Calculate priority breakdown

    // Calculate average resolution time (for resolved exceptions)
      ? resolvedExceptions.reduce((sum, exc) => {
      : 0;



    // Calculate status breakdown

    // Calculate average retry count
      ? exceptions.reduce((sum, exc) => sum + exc.retryCount, 0) / exceptions.length
      : 0;

    // Calculate success rate


      ...exception,

    // Add audit trail entry

  ): Promise<void> {
        ...exception,
        ...updates,



