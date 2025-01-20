// Generated imports
import { BillPayAccounts } from '../BillPayAccounts';
import { RecurringBillPay } from '../RecurringBillPay';
import { OutOfBand } from '../OutOfBand';
import { GoodFunds } from '../GoodFunds';
import { BillPay2 } from './BillPay2';
import { CheckFree } from '../CheckFree';
import { Help } from '../Help';
import { Metavante } from '../Metavante';
import { BillMatrix } from './BillMatrix';
import { SymmetryBillPay } from '../SymmetryBillPay';

export interface BillPaySettings {
    /** @settingKey Billpay.BillPaySettings.MinVersion */
    minVersion: number;
    /** @settingKey Billpay.BillPaySettings.ShouldIgnoreLeadingZerosOnMicr */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Whether or not MicrNumbers should should be considered equivalent even if the have different numbers of leading zeros.
     * /// /// </summary>
     * /// </summary>
     */
    shouldIgnoreLeadingZerosOnMicr: boolean;
    /** @settingKey Billpay.BillPaySettings.HomeBanking.DisplayNewMockUp */
    displayNewMockUp: boolean;
    /** @settingKey Billpay.BillPaySettings.UseMicrAsDraftAccountNumber */
    useMicrAsDraftAccountNumber: boolean;
    /** @settingKey billpay.EnableMultiFundingAccount */
    enableMultiFundingAccount: boolean;
    /** @settingKey Billpay.DefaultLeadDays */
    defaultLeadDays: number;
    /** @settingKey Billpay.DeliverByDatesToCalculate */
    deliverByDatesToCalculate: number;
    /** @settingKey Billpay.CalculateBillPayPaymentDates.MinVersion */
    calculateBillPayPaymentDatesMinVersion: number;
    /** @settingKey BillPay.CalculateBillPayPaymentDates.Enabled */
    calculateBillPayPaymentDatesEnabled: boolean;
    /** @settingKey BillPay.GetPaymentOptions */
    getPaymentOptions: boolean;
    /** @settingKey BillPay.BillPayEnabled */
    enabled: boolean;
    /** @settingKey BillPay.CanChangeBillPayAmount */
    canChangeBillPayAmount: boolean;
    /** @settingKey BillPay.CanChangeBillPayDeliverByDate */
    canChangeBillPayDeliverByDate: boolean;
    /** @settingKey Billpay.ShowHelpTab */
    showHelpTab: boolean;
    /** @settingKey BillPay.IpayCanUpdateSubscriberAddress */
    ipayCanUpdateSubscriberAddress: boolean;
    /** @settingKey BillPay.ShouldSetIpayLoginIdAsGuid */
    shouldSetIpayLoginIdAsGuid: boolean;
    /** @settingKey X.App.HBBOL.BillPayFlagNumber */
    x_AppBolBillPayFlagNumber: string;
    /** @settingKey X.App.HBBOL.BillPayAccounts */
    list: BillPayAccounts;
    /** @settingKey BillPay.BusinessBillPay.ShouldShowAccountSelector */
    shouldShowAccountSelector: boolean;
    /** @settingKey BillPay.Ipay.BusinessBillPayUrl */
    ipayBusinessBillPayUrl: string;
    /** @settingKey BillPay.Ipay.IpayMaxReceivedMessageSize */
    ipayMaxReceivedMessageSize: number;
    /** @settingKey BillPay.Ipay.IpayMaxBufferSize */
    ipayMaxBufferSize: number;
    recurringBillPay: RecurringBillPay;
    outOfBand: OutOfBand;
    goodFunds: GoodFunds;
    billPay2: BillPay2;
    checkFree: CheckFree;
    help: Help;
    metavante: Metavante;
    billMatrix: BillMatrix;
    symmetryBillPay: SymmetryBillPay;
}
