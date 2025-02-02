import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { BillPayMethod } from '../BillPayMethod';
import { DateTime? } from '../DateTime?';
import { AddPayee } from '../AddPayee.AddPayee';
import { PhotoBillPay } from '../PhotoBillPay.PhotoBillPay';
import { RecurringBillPay } from '../RecurringBillPay';
import { MakePayment } from '../MakePayment';
import { NewBillPayInterface } from '../NewBillPayInterface';
import { CheckFree } from '../CheckFree';
import { BillMatrix } from '../BillMatrix';
import { SymmetryBillPay } from '../SymmetryBillPay';
import { Authentication } from '../Authentication.Authentication';
export interface BillPayConfig {
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    IsNextPaymentDayEnabled: boolean;
    ExcludeHolidaysFromCalendar: boolean;
    HidePayeePaymentType: boolean;
    Method: BillPayMethod;
    IpayCanCalculatePaymentDates: boolean;
    SameDayPaymentCutOffTimeUtc?: Date | null;
    GetPayeesBillPay2InterfaceEnabled: boolean;
    MobileEnrollmentEnabled: boolean;
    AddPayee: AddPayee;
    PhotoBillPay: PhotoBillPay;
    RecurringBillPay: RecurringBillPay;
    MakePayment: MakePayment;
    NewBillPayInterface: NewBillPayInterface;
    CheckFree: CheckFree;
    BillMatrix: BillMatrix;
    Symmetry: SymmetryBillPay;
    Authentication: Authentication;
}

export class BillPay implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'BillPay'
    };


            private _minimumVersion: string;
            get minimumVersion(): string {
                return this._minimumVersion;
            }
            set minimumVersion(value: string) {
                this._minimumVersion = value;
            }

            private _minimumAndroidVersion: string;
            get minimumAndroidVersion(): string {
                return this._minimumAndroidVersion;
            }
            set minimumAndroidVersion(value: string) {
                this._minimumAndroidVersion = value;
            }

            private _minimumIosVersion: string;
            get minimumIosVersion(): string {
                return this._minimumIosVersion;
            }
            set minimumIosVersion(value: string) {
                this._minimumIosVersion = value;
            }

            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _isNextPaymentDayEnabled: boolean;
            get isNextPaymentDayEnabled(): boolean {
                return this._isNextPaymentDayEnabled;
            }
            set isNextPaymentDayEnabled(value: boolean) {
                this._isNextPaymentDayEnabled = value;
            }

            private _excludeHolidaysFromCalendar: boolean;
            get excludeHolidaysFromCalendar(): boolean {
                return this._excludeHolidaysFromCalendar;
            }
            set excludeHolidaysFromCalendar(value: boolean) {
                this._excludeHolidaysFromCalendar = value;
            }

            private _hidePayeePaymentType: boolean;
            get hidePayeePaymentType(): boolean {
                return this._hidePayeePaymentType;
            }
            set hidePayeePaymentType(value: boolean) {
                this._hidePayeePaymentType = value;
            }

            private _method: BillPayMethod;
            get method(): BillPayMethod {
                return this._method;
            }
            set method(value: BillPayMethod) {
                this._method = value;
            }

            private _ipayCanCalculatePaymentDates: boolean;
            get ipayCanCalculatePaymentDates(): boolean {
                return this._ipayCanCalculatePaymentDates;
            }
            set ipayCanCalculatePaymentDates(value: boolean) {
                this._ipayCanCalculatePaymentDates = value;
            }

            private _sameDayPaymentCutOffTimeUtc: Date | null;
            get sameDayPaymentCutOffTimeUtc(): Date | null {
                return this._sameDayPaymentCutOffTimeUtc;
            }
            set sameDayPaymentCutOffTimeUtc(value: Date | null) {
                this._sameDayPaymentCutOffTimeUtc = value;
            }

            private _getPayeesBillPay2InterfaceEnabled: boolean;
            get getPayeesBillPay2InterfaceEnabled(): boolean {
                return this._getPayeesBillPay2InterfaceEnabled;
            }
            set getPayeesBillPay2InterfaceEnabled(value: boolean) {
                this._getPayeesBillPay2InterfaceEnabled = value;
            }

            private _mobileEnrollmentEnabled: boolean;
            get mobileEnrollmentEnabled(): boolean {
                return this._mobileEnrollmentEnabled;
            }
            set mobileEnrollmentEnabled(value: boolean) {
                this._mobileEnrollmentEnabled = value;
            }

            private _addPayee: AddPayee;
            get addPayee(): AddPayee {
                return this._addPayee;
            }
            set addPayee(value: AddPayee) {
                this._addPayee = value;
            }

            private _photoBillPay: PhotoBillPay;
            get photoBillPay(): PhotoBillPay {
                return this._photoBillPay;
            }
            set photoBillPay(value: PhotoBillPay) {
                this._photoBillPay = value;
            }

            private _recurringBillPay: RecurringBillPay;
            get recurringBillPay(): RecurringBillPay {
                return this._recurringBillPay;
            }
            set recurringBillPay(value: RecurringBillPay) {
                this._recurringBillPay = value;
            }

            private _makePayment: MakePayment;
            get makePayment(): MakePayment {
                return this._makePayment;
            }
            set makePayment(value: MakePayment) {
                this._makePayment = value;
            }

            private _newBillPayInterface: NewBillPayInterface;
            get newBillPayInterface(): NewBillPayInterface {
                return this._newBillPayInterface;
            }
            set newBillPayInterface(value: NewBillPayInterface) {
                this._newBillPayInterface = value;
            }

            private _checkFree: CheckFree;
            get checkFree(): CheckFree {
                return this._checkFree;
            }
            set checkFree(value: CheckFree) {
                this._checkFree = value;
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

            private _authentication: Authentication;
            get authentication(): Authentication {
                return this._authentication;
            }
            set authentication(value: Authentication) {
                this._authentication = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "BillPay.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "BillPay.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "BillPay.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "BillPay.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "BillPay.IsNextPaymentDayEnabled", value: this._isNextPaymentDayEnabled, dataType: 'boolean', label: "Is Next Payment Day Enabled" },
                { key: "BillPay.ExcludeHolidaysFromCalendar", value: this._excludeHolidaysFromCalendar, dataType: 'boolean', label: "Exclude Holidays From Calendar" },
                { key: "BillPay.HidePayeePaymentType", value: this._hidePayeePaymentType, dataType: 'boolean', label: "Hide Payee Payment Type" },
                { key: "BillPay.Method", value: this._method, dataType: 'billpaymethod', label: "Method" },
                { key: "BillPay.IpayCanCalculatePaymentDates", value: this._ipayCanCalculatePaymentDates, dataType: 'boolean', label: "Ipay Can Calculate Payment Dates" },
                { key: "BillPay.SameDayPaymentCutOffTimeUtc", value: this._sameDayPaymentCutOffTimeUtc, dataType: 'date | null', label: "Same Day Payment Cut Off Time Utc" },
                { key: "BillPay.GetPayeesBillPay2InterfaceEnabled", value: this._getPayeesBillPay2InterfaceEnabled, dataType: 'boolean', label: "Get Payees Bill Pay2 Interface Enabled" },
                { key: "BillPay.MobileEnrollmentEnabled", value: this._mobileEnrollmentEnabled, dataType: 'boolean', label: "Mobile Enrollment Enabled" },
                { key: "BillPay.AddPayee", value: this._addPayee, dataType: 'addpayee.addpayee', label: "Add Payee" },
                { key: "BillPay.PhotoBillPay", value: this._photoBillPay, dataType: 'photobillpay.photobillpay', label: "Photo Bill Pay" },
                { key: "BillPay.RecurringBillPay", value: this._recurringBillPay, dataType: 'recurringbillpay', label: "Recurring Bill Pay" },
                { key: "BillPay.MakePayment", value: this._makePayment, dataType: 'makepayment', label: "Make Payment" },
                { key: "BillPay.NewBillPayInterface", value: this._newBillPayInterface, dataType: 'newbillpayinterface', label: "New Bill Pay Interface" },
                { key: "BillPay.CheckFree", value: this._checkFree, dataType: 'checkfree', label: "Check Free" },
                { key: "BillPay.BillMatrix", value: this._billMatrix, dataType: 'billmatrix', label: "Bill Matrix" },
                { key: "BillPay.Symmetry", value: this._symmetry, dataType: 'symmetrybillpay', label: "Symmetry" },
                { key: "BillPay.Authentication", value: this._authentication, dataType: 'authentication.authentication', label: "Authentication" },
            ];
        }

}