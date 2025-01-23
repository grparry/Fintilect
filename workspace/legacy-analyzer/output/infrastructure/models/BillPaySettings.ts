import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { RecurringBillPay } from './RecurringBillPay';
import { OutOfBand } from './OutOfBand';
import { GoodFunds } from './GoodFunds';
import { BillPay2 } from './BillPay2';
import { CheckFree } from './CheckFree';
import { Help } from './Help';
import { Metavante } from './Metavante';
import { BillMatrix } from './BillMatrix';
import { SymmetryBillPay } from './SymmetryBillPay';
export interface BillPaySettingsConfig {
    MinVersion: number;
    ShouldIgnoreLeadingZerosOnMicr: boolean;
    DisplayNewMockUp: boolean;
    UseMicrAsDraftAccountNumber: boolean;
    EnableMultiFundingAccount: boolean;
    DefaultLeadDays: number;
    DeliverByDatesToCalculate: number;
    CalculateBillPayPaymentDatesMinVersion: number;
    CalculateBillPayPaymentDatesEnabled: boolean;
    GetPaymentOptions: boolean;
    Enabled: boolean;
    CanChangeBillPayAmount: boolean;
    CanChangeBillPayDeliverByDate: boolean;
    ShowHelpTab: boolean;
    IpayCanUpdateSubscriberAddress: boolean;
    ShouldSetIpayLoginIdAsGuid: boolean;
    X_AppBolBillPayFlagNumber: string;
    BillPayAccounts: string[];
    ShouldShowAccountSelector: boolean;
    IpayBusinessBillPayUrl: string;
    IpayMaxReceivedMessageSize: number;
    IpayMaxBufferSize: number;
    RecurringBillPay: RecurringBillPay;
    OutOfBand: OutOfBand;
    GoodFunds: GoodFunds;
    BillPay2: BillPay2;
    CheckFree: CheckFree;
    Help: Help;
    Metavante: Metavante;
    BillMatrix: BillMatrix;
    Symmetry: SymmetryBillPay;
}

export class BillPaySettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'BillPaySettings'
    };


            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _shouldIgnoreLeadingZerosOnMicr: boolean;
            get shouldIgnoreLeadingZerosOnMicr(): boolean {
                return this._shouldIgnoreLeadingZerosOnMicr;
            }
            set shouldIgnoreLeadingZerosOnMicr(value: boolean) {
                this._shouldIgnoreLeadingZerosOnMicr = value;
            }

            private _displayNewMockUp: boolean;
            get displayNewMockUp(): boolean {
                return this._displayNewMockUp;
            }
            set displayNewMockUp(value: boolean) {
                this._displayNewMockUp = value;
            }

            private _useMicrAsDraftAccountNumber: boolean;
            get useMicrAsDraftAccountNumber(): boolean {
                return this._useMicrAsDraftAccountNumber;
            }
            set useMicrAsDraftAccountNumber(value: boolean) {
                this._useMicrAsDraftAccountNumber = value;
            }

            private _enableMultiFundingAccount: boolean;
            get enableMultiFundingAccount(): boolean {
                return this._enableMultiFundingAccount;
            }
            set enableMultiFundingAccount(value: boolean) {
                this._enableMultiFundingAccount = value;
            }

            private _defaultLeadDays: number;
            get defaultLeadDays(): number {
                return this._defaultLeadDays;
            }
            set defaultLeadDays(value: number) {
                this._defaultLeadDays = value;
            }

            private _deliverByDatesToCalculate: number;
            get deliverByDatesToCalculate(): number {
                return this._deliverByDatesToCalculate;
            }
            set deliverByDatesToCalculate(value: number) {
                this._deliverByDatesToCalculate = value;
            }

            private _calculateBillPayPaymentDatesMinVersion: number;
            get calculateBillPayPaymentDatesMinVersion(): number {
                return this._calculateBillPayPaymentDatesMinVersion;
            }
            set calculateBillPayPaymentDatesMinVersion(value: number) {
                this._calculateBillPayPaymentDatesMinVersion = value;
            }

            private _calculateBillPayPaymentDatesEnabled: boolean;
            get calculateBillPayPaymentDatesEnabled(): boolean {
                return this._calculateBillPayPaymentDatesEnabled;
            }
            set calculateBillPayPaymentDatesEnabled(value: boolean) {
                this._calculateBillPayPaymentDatesEnabled = value;
            }

            private _getPaymentOptions: boolean;
            get getPaymentOptions(): boolean {
                return this._getPaymentOptions;
            }
            set getPaymentOptions(value: boolean) {
                this._getPaymentOptions = value;
            }

            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _canChangeBillPayAmount: boolean;
            get canChangeBillPayAmount(): boolean {
                return this._canChangeBillPayAmount;
            }
            set canChangeBillPayAmount(value: boolean) {
                this._canChangeBillPayAmount = value;
            }

            private _canChangeBillPayDeliverByDate: boolean;
            get canChangeBillPayDeliverByDate(): boolean {
                return this._canChangeBillPayDeliverByDate;
            }
            set canChangeBillPayDeliverByDate(value: boolean) {
                this._canChangeBillPayDeliverByDate = value;
            }

            private _showHelpTab: boolean;
            get showHelpTab(): boolean {
                return this._showHelpTab;
            }
            set showHelpTab(value: boolean) {
                this._showHelpTab = value;
            }

            private _ipayCanUpdateSubscriberAddress: boolean;
            get ipayCanUpdateSubscriberAddress(): boolean {
                return this._ipayCanUpdateSubscriberAddress;
            }
            set ipayCanUpdateSubscriberAddress(value: boolean) {
                this._ipayCanUpdateSubscriberAddress = value;
            }

            private _shouldSetIpayLoginIdAsGuid: boolean;
            get shouldSetIpayLoginIdAsGuid(): boolean {
                return this._shouldSetIpayLoginIdAsGuid;
            }
            set shouldSetIpayLoginIdAsGuid(value: boolean) {
                this._shouldSetIpayLoginIdAsGuid = value;
            }

            private _x_AppBolBillPayFlagNumber: string;
            get x_AppBolBillPayFlagNumber(): string {
                return this._x_AppBolBillPayFlagNumber;
            }
            set x_AppBolBillPayFlagNumber(value: string) {
                this._x_AppBolBillPayFlagNumber = value;
            }

            private _billPayAccounts: string[];
            get billPayAccounts(): string[] {
                return this._billPayAccounts;
            }
            set billPayAccounts(value: string[]) {
                this._billPayAccounts = value;
            }

            private _shouldShowAccountSelector: boolean;
            get shouldShowAccountSelector(): boolean {
                return this._shouldShowAccountSelector;
            }
            set shouldShowAccountSelector(value: boolean) {
                this._shouldShowAccountSelector = value;
            }

            private _ipayBusinessBillPayUrl: string;
            get ipayBusinessBillPayUrl(): string {
                return this._ipayBusinessBillPayUrl;
            }
            set ipayBusinessBillPayUrl(value: string) {
                this._ipayBusinessBillPayUrl = value;
            }

            private _ipayMaxReceivedMessageSize: number;
            get ipayMaxReceivedMessageSize(): number {
                return this._ipayMaxReceivedMessageSize;
            }
            set ipayMaxReceivedMessageSize(value: number) {
                this._ipayMaxReceivedMessageSize = value;
            }

            private _ipayMaxBufferSize: number;
            get ipayMaxBufferSize(): number {
                return this._ipayMaxBufferSize;
            }
            set ipayMaxBufferSize(value: number) {
                this._ipayMaxBufferSize = value;
            }

            private _recurringBillPay: RecurringBillPay;
            get recurringBillPay(): RecurringBillPay {
                return this._recurringBillPay;
            }
            set recurringBillPay(value: RecurringBillPay) {
                this._recurringBillPay = value;
            }

            private _outOfBand: OutOfBand;
            get outOfBand(): OutOfBand {
                return this._outOfBand;
            }
            set outOfBand(value: OutOfBand) {
                this._outOfBand = value;
            }

            private _goodFunds: GoodFunds;
            get goodFunds(): GoodFunds {
                return this._goodFunds;
            }
            set goodFunds(value: GoodFunds) {
                this._goodFunds = value;
            }

            private _billPay2: BillPay2;
            get billPay2(): BillPay2 {
                return this._billPay2;
            }
            set billPay2(value: BillPay2) {
                this._billPay2 = value;
            }

            private _checkFree: CheckFree;
            get checkFree(): CheckFree {
                return this._checkFree;
            }
            set checkFree(value: CheckFree) {
                this._checkFree = value;
            }

            private _help: Help;
            get help(): Help {
                return this._help;
            }
            set help(value: Help) {
                this._help = value;
            }

            private _metavante: Metavante;
            get metavante(): Metavante {
                return this._metavante;
            }
            set metavante(value: Metavante) {
                this._metavante = value;
            }

            private _billMatrix: BillMatrix;
            get billMatrix(): BillMatrix {
                return this._billMatrix;
            }
            set billMatrix(value: BillMatrix) {
                this._billMatrix = value;
            }

            private _symmetry: SymmetryBillPay;
            get symmetry(): SymmetryBillPay {
                return this._symmetry;
            }
            set symmetry(value: SymmetryBillPay) {
                this._symmetry = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "BillPaySettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "BillPaySettings.ShouldIgnoreLeadingZerosOnMicr", value: this._shouldIgnoreLeadingZerosOnMicr, dataType: 'boolean', label: "Should Ignore Leading Zeros On Micr" },
                { key: "BillPaySettings.DisplayNewMockUp", value: this._displayNewMockUp, dataType: 'boolean', label: "Display New Mock Up" },
                { key: "BillPaySettings.UseMicrAsDraftAccountNumber", value: this._useMicrAsDraftAccountNumber, dataType: 'boolean', label: "Use Micr As Draft Account Number" },
                { key: "BillPaySettings.EnableMultiFundingAccount", value: this._enableMultiFundingAccount, dataType: 'boolean', label: "Enable Multi Funding Account" },
                { key: "BillPaySettings.DefaultLeadDays", value: this._defaultLeadDays, dataType: 'number', label: "Default Lead Days" },
                { key: "BillPaySettings.DeliverByDatesToCalculate", value: this._deliverByDatesToCalculate, dataType: 'number', label: "Deliver By Dates To Calculate" },
                { key: "BillPaySettings.CalculateBillPayPaymentDatesMinVersion", value: this._calculateBillPayPaymentDatesMinVersion, dataType: 'number', label: "Calculate Bill Pay Payment Dates Min Version" },
                { key: "BillPaySettings.CalculateBillPayPaymentDatesEnabled", value: this._calculateBillPayPaymentDatesEnabled, dataType: 'boolean', label: "Calculate Bill Pay Payment Dates Enabled" },
                { key: "BillPaySettings.GetPaymentOptions", value: this._getPaymentOptions, dataType: 'boolean', label: "Get Payment Options" },
                { key: "BillPaySettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "BillPaySettings.CanChangeBillPayAmount", value: this._canChangeBillPayAmount, dataType: 'boolean', label: "Can Change Bill Pay Amount" },
                { key: "BillPaySettings.CanChangeBillPayDeliverByDate", value: this._canChangeBillPayDeliverByDate, dataType: 'boolean', label: "Can Change Bill Pay Deliver By Date" },
                { key: "BillPaySettings.ShowHelpTab", value: this._showHelpTab, dataType: 'boolean', label: "Show Help Tab" },
                { key: "BillPaySettings.IpayCanUpdateSubscriberAddress", value: this._ipayCanUpdateSubscriberAddress, dataType: 'boolean', label: "Ipay Can Update Subscriber Address" },
                { key: "BillPaySettings.ShouldSetIpayLoginIdAsGuid", value: this._shouldSetIpayLoginIdAsGuid, dataType: 'boolean', label: "Should Set Ipay Login Id As Guid" },
                { key: "BillPaySettings.X_AppBolBillPayFlagNumber", value: this._x_AppBolBillPayFlagNumber, dataType: 'string', label: "X_ App Bol Bill Pay Flag Number" },
                { key: "BillPaySettings.BillPayAccounts", value: this._billPayAccounts, dataType: 'list<string>', label: "Bill Pay Accounts" },
                { key: "BillPaySettings.ShouldShowAccountSelector", value: this._shouldShowAccountSelector, dataType: 'boolean', label: "Should Show Account Selector" },
                { key: "BillPaySettings.IpayBusinessBillPayUrl", value: this._ipayBusinessBillPayUrl, dataType: 'string', label: "Ipay Business Bill Pay Url" },
                { key: "BillPaySettings.IpayMaxReceivedMessageSize", value: this._ipayMaxReceivedMessageSize, dataType: 'number', label: "Ipay Max Received Message Size" },
                { key: "BillPaySettings.IpayMaxBufferSize", value: this._ipayMaxBufferSize, dataType: 'number', label: "Ipay Max Buffer Size" },
                { key: "BillPaySettings.RecurringBillPay", value: this._recurringBillPay, dataType: 'recurringbillpay', label: "Recurring Bill Pay" },
                { key: "BillPaySettings.OutOfBand", value: this._outOfBand, dataType: 'outofband', label: "Out Of Band" },
                { key: "BillPaySettings.GoodFunds", value: this._goodFunds, dataType: 'goodfunds', label: "Good Funds" },
                { key: "BillPaySettings.BillPay2", value: this._billPay2, dataType: 'billpay2', label: "Bill Pay2" },
                { key: "BillPaySettings.CheckFree", value: this._checkFree, dataType: 'checkfree', label: "Check Free" },
                { key: "BillPaySettings.Help", value: this._help, dataType: 'help', label: "Help" },
                { key: "BillPaySettings.Metavante", value: this._metavante, dataType: 'metavante', label: "Metavante" },
                { key: "BillPaySettings.BillMatrix", value: this._billMatrix, dataType: 'billmatrix', label: "Bill Matrix" },
                { key: "BillPaySettings.Symmetry", value: this._symmetry, dataType: 'symmetrybillpay', label: "Symmetry" },
            ];
        }

}