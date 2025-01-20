// Generated imports
import { Authentication } from '../MobileConfigurations/Authentication/Authentication';

export interface LoanPayment {
    /** @settingKey Mobile.Loan.MakePayment.MinimumVersion */
    minimumVersion: string;
    /** @settingKey Mobile.Loan.MakePayment.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.Loan.MakePayment.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.Loan.MakePayment.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.Loan.MakePayment.Url */
    url: string;
    authentication: Authentication;
}
