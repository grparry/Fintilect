// Generated imports

export interface BillPay2 {
    /** @settingKey Billpay.BillPay2.Enabled */
    enabled: boolean;
    /** @settingKey BillPay.BillPay2.MinimumVersion */
    minimumVersion: number;
    /** @settingKey BillPay.BillPay2.MaximumPaymentAmountInDollars */
    maximumPaymentAmountInDollars: number;
    /** @settingKey BillPay.BillPay2.BillPayeeNameRegex */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Regex for the 'Name' field when adding or editing a payee.
     * /// /// </summary>
     * /// </summary>
     */
    billPayeeNameRegex: string;
    /** @settingKey BillPay.BillPay2.CustomHelpEnabled */
    customHelpEnabled: boolean;
    /** @settingKey BillPay.BillPay2.InactivePayeesEnabled */
    inactivePayeesEnabled: boolean;
    /** @settingKey BillPay.BillPay2.ShouldShowPayeePaymentType */
    shouldShowPayeePaymentType: boolean;
}
