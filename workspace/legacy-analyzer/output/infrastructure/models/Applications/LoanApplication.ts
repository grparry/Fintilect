// Generated imports
import { Authentication } from '../MobileConfigurations/Authentication/Authentication';

export interface LoanApplication {
    /** @settingKey Mobile.Loan.ApplyForLoan.MinimumVersion */
    minimumVersion: string;
    /** @settingKey Mobile.Loan.ApplyForLoan.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.Loan.ApplyForLoan.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.Loan.ApplyForLoan.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.Loan.ApplyForLoan.Url */
    url: string;
    /** @settingKey Mobile.Loan.ApplyForLoan.MeridianLink.ShouldGetLegacySsoUrl */
    shouldGetMeridianLinkLegacySsoUrl: boolean;
    /** @settingKey Mobile.Loan.LoanApplication.MortgageLoanEnabled */
    mortgageLoanEnabled: boolean;
    /** @settingKey Mobile.Loan.LoanApplication.MortgageLoanUrl */
    mortgageLoanUrl: string;
    authentication: Authentication;
}
