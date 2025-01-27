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
    FISExceptionFilters
} from '../../../types/bill-pay.types';
import { PaginatedResponse } from '../../../types/common.types';
import { IExceptionService } from '../../interfaces/IExceptionService';
import { BaseService } from './BaseService';

export class ExceptionService extends BaseService implements IExceptionService {
    constructor(basePath: string = '/api/v1/exceptions') {
        super(basePath);
    }

    async getExceptions(filters?: ExceptionFilters): Promise<PaginatedResponse<ExceptionTool>> {
        return this.get<PaginatedResponse<ExceptionTool>>('/exceptions', { params: filters });
    }

    async getException(exceptionId: string): Promise<ExceptionTool> {
        return this.get<ExceptionTool>(`/exceptions/${exceptionId}`);
    }

    async updateExceptionStatus(
        exceptionId: string,
        status: ExceptionToolStatus,
        notes?: string
    ): Promise<void> {





    ): Promise<void> {

    ): Promise<void> {










    ): Promise<void> {


    ): Promise<void> {

