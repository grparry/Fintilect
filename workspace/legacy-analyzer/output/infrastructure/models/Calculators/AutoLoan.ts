// Generated imports
import { Authentication } from '../MobileConfigurations/Authentication/Authentication';

export interface AutoLoan {
    /** @settingKey Mobile.Loan.Calculator.AutoLoan.MinimumVersion */
    minimumVersion: string;
    /** @settingKey Mobile.Loan.Calculator.AutoLoan.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.Loan.Calculator.AutoLoan.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.Loan.Calculator.AutoLoan.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.Loan.Calculator.AutoLoan.Url */
    url: string;
    authentication: Authentication;
}
