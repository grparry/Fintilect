import {
  Payment,
  PaymentMethod,
  BillPayConfig,
  ValidationError,
  PaymentValidationResult,
  PaymentMethodLimits,
  DailyLimitCheck,
} from '../../types/bill-pay.types';
import { billPayService } from '../bill-pay.service';

export class PaymentValidationService {
  private async getConfig(): Promise<BillPayConfig> {
    return await billPayService.getConfig();
  }

  private async validateAmountLimits(
    amount: number,
    method: PaymentMethod,
    config: BillPayConfig
  ): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];
    const { validationRules } = config;

    if (amount < validationRules.minTransactionAmount) {
      errors.push({
        field: 'amount',
        message: `Amount must be at least ${validationRules.minTransactionAmount}`,
      });
    }

    if (amount > validationRules.maxTransactionAmount) {
      errors.push({
        field: 'amount',
        message: `Amount cannot exceed ${validationRules.maxTransactionAmount}`,
      });
    }

    // Method-specific limits
    const methodLimits: Record<PaymentMethod, PaymentMethodLimits> = {
      [PaymentMethod.ACH]: {
        maxAmount: 100000,
        minAmount: 0.01,
        allowedCurrencies: ['USD'],
        requiresApproval: amount > 50000,
      },
      [PaymentMethod.WIRE]: {
        maxAmount: 1000000,
        minAmount: 100,
        allowedCurrencies: ['USD', 'EUR', 'GBP'],
        requiresApproval: amount > 100000,
      },
      [PaymentMethod.CHECK]: {
        maxAmount: 50000,
        minAmount: 1,
        allowedCurrencies: ['USD'],
        requiresApproval: amount > 10000,
      },
      [PaymentMethod.CARD]: {
        maxAmount: 25000,
        minAmount: 0.01,
        allowedCurrencies: ['USD'],
        requiresApproval: amount > 5000,
      },
      [PaymentMethod.RTP]: {
        maxAmount: 100000,
        minAmount: 0.01,
        allowedCurrencies: ['USD'],
        requiresApproval: amount > 25000,
      },
    };

    const limits = methodLimits[method];
    if (amount < limits.minAmount) {
      errors.push({
        field: 'amount',
        message: `${method} payments must be at least ${limits.minAmount}`,
      });
    }

    if (amount > limits.maxAmount) {
      errors.push({
        field: 'amount',
        message: `${method} payments cannot exceed ${limits.maxAmount}`,
      });
    }

    return errors;
  }

  private async validateDailyLimits(
    clientId: string,
    amount: number,
    config: BillPayConfig
  ): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];
    const today = new Date().toISOString().split('T')[0];

    // Get all payments for the client today
    const dailyPayments = await billPayService.searchPayments({
      clientId,
      startDate: today,
      endDate: today,
    });

    const totalDailyAmount = dailyPayments.data.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    if (totalDailyAmount + amount > config.maxDailyLimit) {
      errors.push({
        field: 'amount',
        message: `Daily payment limit of ${config.maxDailyLimit} would be exceeded`,
      });
    }

    return errors;
  }

  private validateMethodSpecificRules(
    payment: Partial<Payment>
  ): ValidationError[] {
    const errors: ValidationError[] = [];

    switch (payment.method) {
      case PaymentMethod.WIRE:
        // Wire-specific validations
        if (!payment.description) {
          errors.push({
            field: 'description',
            message: 'Description is required for wire transfers',
          });
        }
        break;

      case PaymentMethod.ACH:
        // ACH-specific validations
        if (
          !payment.effectiveDate ||
          new Date(payment.effectiveDate).getTime() < Date.now()
        ) {
          errors.push({
            field: 'effectiveDate',
            message: 'Future effective date is required for ACH payments',
          });
        }
        break;

      case PaymentMethod.CHECK:
        // Check-specific validations
        if (!payment.payeeName || !payment.payeeId) {
          errors.push({
            field: 'payee',
            message: 'Valid payee information is required for check payments',
          });
        }
        break;

      case PaymentMethod.RTP:
        // RTP-specific validations
        const currentTime = new Date();
        const cutoffTime = new Date();
        cutoffTime.setHours(17, 0, 0); // 5 PM cutoff

        if (currentTime > cutoffTime) {
          errors.push({
            field: 'method',
            message: 'RTP payments must be submitted before 5 PM',
          });
        }
        break;
    }

    return errors;
  }

  private validateBusinessRules(
    payment: Partial<Payment>,
    config: BillPayConfig
  ): ValidationError[] {
    const errors: ValidationError[] = [];

    // Weekend processing check
    if (!config.allowWeekendProcessing) {
      const effectiveDate = new Date(payment.effectiveDate || '');
      const dayOfWeek = effectiveDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        errors.push({
          field: 'effectiveDate',
          message: 'Weekend processing is not allowed',
        });
      }
    }

    // Dual approval requirement check
    if (
      config.requireDualApproval &&
      payment.amount &&
      payment.amount > config.maxTransactionLimit / 2
    ) {
      errors.push({
        field: 'approval',
        message: 'This payment requires dual approval',
        type: 'warning',
      });
    }

    // Currency validation
    if (payment.method && payment.currency) {
      const methodLimits: Record<PaymentMethod, PaymentMethodLimits> = {
        [PaymentMethod.ACH]: {
          maxAmount: 100000,
          minAmount: 0.01,
          allowedCurrencies: ['USD'],
          requiresApproval: false,
        },
        [PaymentMethod.WIRE]: {
          maxAmount: 1000000,
          minAmount: 100,
          allowedCurrencies: ['USD', 'EUR', 'GBP'],
          requiresApproval: false,
        },
        [PaymentMethod.CHECK]: {
          maxAmount: 50000,
          minAmount: 1,
          allowedCurrencies: ['USD'],
          requiresApproval: false,
        },
        [PaymentMethod.CARD]: {
          maxAmount: 25000,
          minAmount: 0.01,
          allowedCurrencies: ['USD'],
          requiresApproval: false,
        },
        [PaymentMethod.RTP]: {
          maxAmount: 100000,
          minAmount: 0.01,
          allowedCurrencies: ['USD'],
          requiresApproval: false,
        },
      };

      if (
        !methodLimits[payment.method].allowedCurrencies.includes(payment.currency)
      ) {
        errors.push({
          field: 'currency',
          message: `${payment.currency} is not supported for ${payment.method} payments`,
        });
      }
    }

    return errors;
  }

  public async validatePayment(
    payment: Partial<Payment>
  ): Promise<PaymentValidationResult> {
    const config = await this.getConfig();
    let errors: ValidationError[] = [];

    // Required fields validation
    if (!payment.amount || !payment.method || !payment.clientId) {
      errors.push({
        field: 'general',
        message: 'Amount, payment method, and client ID are required',
      });
      return { valid: false, errors };
    }

    // Collect all validation errors
    const [amountErrors, dailyLimitErrors, methodErrors, businessRuleErrors] =
      await Promise.all([
        this.validateAmountLimits(payment.amount, payment.method, config),
        this.validateDailyLimits(payment.clientId, payment.amount, config),
        Promise.resolve(this.validateMethodSpecificRules(payment)),
        Promise.resolve(this.validateBusinessRules(payment, config)),
      ]);

    errors = [
      ...errors,
      ...amountErrors,
      ...dailyLimitErrors,
      ...methodErrors,
      ...businessRuleErrors,
    ];

    return {
      valid: errors.length === 0,
      errors,
      warnings: errors.filter((e) => e.type === 'warning'),
      requiresApproval:
        errors.some((e) => e.field === 'approval') ||
        (payment.amount || 0) > config.maxTransactionLimit / 2,
    };
  }
}

export const paymentValidationService = new PaymentValidationService();
