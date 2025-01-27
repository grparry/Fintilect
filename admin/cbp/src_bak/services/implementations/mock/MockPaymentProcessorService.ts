import { IPaymentProcessorService } from '../../interfaces/IPaymentProcessorService';
import { BaseMockService } from './BaseMockService';
import {
    PaymentTransaction,
    PaymentStatus,
    PaymentMethod,
    PaymentType,
    PaymentPriority,
    PaymentSchedule,
    TransactionBatch,
    BatchStatus,
    ProcessorConfig,
    ProcessingError,
    PaymentValidation,
    PaymentReceipt,
    TransactionSummary,
    ProcessorMetrics,
    DateRange
} from '../../../types/payment.types';
import { PaginatedResponse } from '../../../types/common.types';
import { v4 as uuidv4 } from 'uuid';

export class MockPaymentProcessorService extends BaseMockService implements IPaymentProcessorService {
    private transactions: Map<string, PaymentTransaction> = new Map();
    private batches: Map<string, TransactionBatch> = new Map();
    private errors: Map<string, ProcessingError[]> = new Map();

    constructor(
        basePath: string = '/api/v1/payment-processor'
    ) {



    ) {

            ...transaction,
        

        );
        
        








            );



        
            ...transaction,
        

            ...transaction,

            ...transaction,
        

        
        



            ...(await this.getProcessorConfig()),
            ...config










        );
        
        
        

        
        








