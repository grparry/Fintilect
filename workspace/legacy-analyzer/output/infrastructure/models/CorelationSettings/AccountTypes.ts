// Generated imports
import { MoneyMarketShareCategorySerial } from '../MoneyMarketShareCategorySerial';
import { PrimarySavingsShareCategorySerial } from '../PrimarySavingsShareCategorySerial';
import { CheckingShareCategorySerial } from '../CheckingShareCategorySerial';
import { InvestmentShareCategorySerial } from '../InvestmentShareCategorySerial';
import { CertificateShareCategorySerial } from '../CertificateShareCategorySerial';
import { LineOfCreditLoanCategorySerial } from '../LineOfCreditLoanCategorySerial';
import { CreditCardLoanCategorySerial } from '../CreditCardLoanCategorySerial';
import { AutoLoanCategorySerial } from '../AutoLoanCategorySerial';
import { MortgageLoanCategorySerial } from '../MortgageLoanCategorySerial';
import { LoanCategorySerial } from '../LoanCategorySerial';
import { BusinessSavingsShareCategorySerial } from '../BusinessSavingsShareCategorySerial';
import { DepositShareCategorySerial } from '../DepositShareCategorySerial';
import { ExternalMortgageLoanCategorySerial } from '../ExternalMortgageLoanCategorySerial';
import { DebitCardCategorySerial } from '../DebitCardCategorySerial';
import { BusinessSavingsShareCategorySerialForCategoryMapping } from '../BusinessSavingsShareCategorySerialForCategoryMapping';

export interface AccountTypes {
    /** @settingKey FinacialCore.Corelation.AccountTypes.MoneyMarketShareCategorySerial */
    list: MoneyMarketShareCategorySerial;
    /** @settingKey FinacialCore.Corelation.AccountTypes.PrimarySavingsShareCategorySerial */
    list: PrimarySavingsShareCategorySerial;
    /** @settingKey FinacialCore.Corelation.AccountTypes.CheckingShareCategorySerial */
    list: CheckingShareCategorySerial;
    /** @settingKey FinacialCore.Corelation.AccountTypes.InvestmentShareCategorySerial */
    list: InvestmentShareCategorySerial;
    /** @settingKey FinacialCore.Corelation.AccountTypes.CertificateShareCategorySerial */
    list: CertificateShareCategorySerial;
    /** @settingKey FinacialCore.Corelation.AccountTypes.LineOfCreditLoanCategorySerial */
    list: LineOfCreditLoanCategorySerial;
    /** @settingKey FinacialCore.Corelation.AccountTypes.CreditCardLoanCategorySerial */
    list: CreditCardLoanCategorySerial;
    /** @settingKey FinacialCore.Corelation.AccountTypes.AutoLoanCategorySerial */
    list: AutoLoanCategorySerial;
    /** @settingKey FinacialCore.Corelation.AccountTypes.MortgageLoanCategorySerial */
    list: MortgageLoanCategorySerial;
    /** @settingKey FinacialCore.Corelation.AccountTypes.LoanCategorySerial */
    list: LoanCategorySerial;
    /** @settingKey FinacialCore.Corelation.AccountTypes.BusinessSavingsShareCategorySerial */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// This identifies if a share is a business account. Do not use this to set account category.
     * /// /// Use BusinessSavingsShareCategorySerialForCategoryMapping instead.
     * /// /// </summary>
     * /// </summary>
     */
    list: BusinessSavingsShareCategorySerial;
    /** @settingKey FinacialCore.Corelation.AccountTypes.DepositShareCategorySerial */
    list: DepositShareCategorySerial;
    /** @settingKey FinacialCore.Corelation.AccountTypes.ExternalMortgageLoanCategorySerial */
    list: ExternalMortgageLoanCategorySerial;
    /** @settingKey FinacialCore.Corelation.AccountTypes.DebitCardCategorySerial */
    list: DebitCardCategorySerial;
    /** @settingKey FinacialCore.Corelation.AccountTypes.BusinessSavingsShareCategorySerialForCategoryMapping */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// We needed to add this setting so we can use this to change the category returned from the core
     * /// /// because BusinessSavingsShareCategorySerial is only used to indicate if a share is a business account.
     * /// /// </summary>
     * /// </summary>
     */
    list: BusinessSavingsShareCategorySerialForCategoryMapping;
}
