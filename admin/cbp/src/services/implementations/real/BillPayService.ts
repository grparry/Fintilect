import { IBillPayService } from '../../interfaces/IBillPayService';
import {
    BillPayConfig,
    BillPayConfigUpdate,
    BillPayConfigValidation,
    Payee,
    BillPayStats,
    TransactionTrend,
    ExceptionResolution
} from '../../../types/bill-pay.types';
import {
    Holiday,
    HolidayInput,
    HolidayStatus
} from '../../../types/calendar.types';
import {
    Client
} from '../../../types/client.types';
import {
    PaymentException,
    PaymentFilters
} from '../../../types/payment.types';
import { PaginatedResponse } from '../../../types/common.types';
import { ApiResponse } from '../../types';
import api from '../../api';
import { BaseService } from './BaseService';
import logger from '../../../utils/logger';

export class BillPayService extends BaseService implements IBillPayService {
    constructor(basePath: string = '/api/v1/bill-pay') {
        super(basePath);
    }

    async getConfiguration(): Promise<BillPayConfig> {
        try {
            return await this.get<BillPayConfig>('/config');
        } catch (error) {
            logger.error(`Error getting bill pay configuration: ${error}`);
            throw error;
        }
    }

    async updateConfiguration(config: BillPayConfigUpdate): Promise<BillPayConfigValidation> {
        try {
            return await this.put<BillPayConfigValidation>('/config', config);
        } catch (error) {
            logger.error(`Error updating bill pay configuration: ${error}`);
            throw error;
        }
    }

    async validateConfiguration(config: BillPayConfigUpdate): Promise<BillPayConfigValidation> {
        try {
            return await this.post<BillPayConfigValidation>('/config/validate', config);
        } catch (error) {
            logger.error(`Error validating bill pay configuration: ${error}`);
            throw error;
        }
    }

    async getExceptions(filters: PaymentFilters): Promise<PaginatedResponse<PaymentException>> {
        try {
            return await this.get<PaginatedResponse<PaymentException>>('/exceptions', filters);
        } catch (error) {
            logger.error(`Error getting exceptions: ${error}`);
            throw error;
        }
    }

    async resolveException(exceptionId: string, resolution: ExceptionResolution): Promise<void> {
        try {
            await this.put<void>(`/exceptions/${exceptionId}/resolve`, resolution);
        } catch (error) {
            logger.error(`Error resolving exception: ${error}`);
            throw error;
        }
    }

    async getClients(): Promise<Client[]> {
        try {
            return await this.get<Client[]>('/clients');
        } catch (error) {
            logger.error(`Error getting clients: ${error}`);
            throw error;
        }
    }

    async getPayees(clientId: string): Promise<Payee[]> {
        try {
            return await this.get<Payee[]>(`/clients/${clientId}/payees`);
        } catch (error) {
            logger.error(`Error getting payees: ${error}`);
            throw error;
        }
    }

    async getStats(timeframe: 'day' | 'week' | 'month'): Promise<BillPayStats> {
        try {
            return await this.get<BillPayStats>('/stats', { timeframe });
        } catch (error) {
            logger.error(`Error getting bill pay stats: ${error}`);
            throw error;
        }
    }

    async getTransactionTrends(timeframe: 'day' | 'week' | 'month'): Promise<TransactionTrend[]> {
        try {
            return await this.get<TransactionTrend[]>('/trends', { timeframe });
        } catch (error) {
            logger.error(`Error getting transaction trends: ${error}`);
            throw error;
        }
    }

    async getHolidays(): Promise<Holiday[]> {
        try {
            return await this.get<Holiday[]>('/holidays');
        } catch (error) {
            logger.error(`Error getting holidays: ${error}`);
            throw error;
        }
    }

    async addHoliday(holiday: HolidayInput): Promise<Holiday> {
        try {
            return await this.post<Holiday>('/holidays', holiday);
        } catch (error) {
            logger.error(`Error adding holiday: ${error}`);
            throw error;
        }
    }

    async sendOTP(method: string, destination: string): Promise<void> {
        try {
            await this.post<void>('/security/otp/send', { method, destination });
        } catch (error) {
            logger.error(`Error sending OTP: ${error}`);
            throw error;
        }
    }
}