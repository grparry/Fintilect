// Generated imports
import { BillPayMethod } from '../BillPayMethod';
import { SameDayPaymentCutOffTimeUtc } from '../SameDayPaymentCutOffTimeUtc';
import { AddPayee } from '../MobileConfigurations/BillPay/AddPayee/AddPayee';
import { PhotoBillPay } from '../PhotoBillPay';
import { RecurringBillPay } from './RecurringBillPay';
import { MakePayment } from '../MakePayment';
import { NewBillPayInterface } from '../NewBillPayInterface';
import { CheckFree } from './CheckFree';
import { BillMatrix } from '../MobileConfigurations/BillPay/BillMatrix';
import { SymmetryBillPay } from './SymmetryBillPay';
import { Authentication } from '../MobileConfigurations/Authentication/Authentication';

export interface BillPay {
    /** @settingKey Mobile.BillPay.MinimumVersion */
    minimumVersion: string;
    /** @settingKey Mobile.BillPay.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.BillPay.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.BillPay.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.BillPay.IsNextPaymentDayEnabled */
    isNextPaymentDayEnabled: boolean;
    /** @settingKey Mobile.BillPay.ExcludeHolidaysFromCalendar */
    excludeHolidaysFromCalendar: boolean;
    /** @settingKey Mobile.BillPay.HidePayeePaymentType */
    hidePayeePaymentType: boolean;
    /** @settingKey Mobile.BillPay.Method */
    billPayMethod: BillPayMethod;
    /** @settingKey Mobile.BillPay.IpayCanCalculatePaymentDates */
    ipayCanCalculatePaymentDates: boolean;
    /** @settingKey Mobile.BillPay.SameDayPaymentCutOffTimeUtc */
    dateTime: SameDayPaymentCutOffTimeUtc | null;
    /** @settingKey Mobile.BillPay.GetPayeesBillPay2Interface.Enabled */
    getPayeesBillPay2InterfaceEnabled: boolean;
    /** @settingKey Mobile.BillPay.MobileEnrollmentEnabled */
    mobileEnrollmentEnabled: boolean;
    addPayee: AddPayee;
    photoBillPay: PhotoBillPay;
    recurringBillPay: RecurringBillPay;
    makePayment: MakePayment;
    newBillPayInterface: NewBillPayInterface;
    checkFree: CheckFree;
    billMatrix: BillMatrix;
    symmetryBillPay: SymmetryBillPay;
    authentication: Authentication;
}
