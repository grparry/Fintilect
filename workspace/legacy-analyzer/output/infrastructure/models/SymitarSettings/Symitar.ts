// Generated imports
import { RemoteDepositCheckHoldSettings } from '../FinancialCores/SymitarSettings/RemoteDepositCheckHoldSettings';
import { [TrackingRecordFieldName](../../../TrackingRecordFieldName.md) } from '../[TrackingRecordFieldName](../../../TrackingRecordFieldName.md)';
import { DebitCardTypeCodes } from '../DebitCardTypeCodes';

export interface Symitar {
    /**
     * /// <summary>
     * /// //TODO:  We might need this time zone config to determine hold end dates.
     * /// //        [SettingKey("FinancialCore.Symitar.TimeZone")]
     * /// //        public string TimeZone
     * /// //        {
     * /// //            get => GetValue();
     * /// //            set => SetValue(value);
     * /// //        }
     * /// </summary>
     */
    remoteDepositCheckHoldSettings: RemoteDepositCheckHoldSettings;
    /** @settingKey FinancialCore.Symitar.Transfers.IsTransferWithoutVirtualCardsEnabled */
    isTransferWithoutVirtualCardsEnabled: boolean;
    /** @settingKey FinancialCore.Symitar.UserField.SuccessfulLoginOLBTrackingRecordType */
    successfulLoginOLBTrackingRecordType: number;
    /** @settingKey FinancialCore.Symitar.UserField.SuccessfulLoginOLBTrackingRecordField */
    trackingRecordFieldName: [TrackingRecordFieldName](../../../TrackingRecordFieldName.md);
    /** @settingKey FinancialCore.Symitar.UserField.SuccessfulLoginMobileTrackingRecordType */
    successfulLoginMobileTrackingRecordType: number;
    /** @settingKey FinancialCore.Symitar.UserField.SuccessfulLoginMobileTrackingRecordField */
    trackingRecordFieldName: [TrackingRecordFieldName](../../../TrackingRecordFieldName.md);
    /** @settingKey FinancialCore.Symitar.ExternalLoans.ExternalLoanTrackingRecordInterestField */
    trackingRecordFieldName: [TrackingRecordFieldName](../../../TrackingRecordFieldName.md);
    /** @settingKey FinancialCore.Symitar.ExternalLoans.GetInterestRateFromExternalLoanTrackingRecordIsEnabled */
    getInterestRateFromExternalLoanTrackingRecordIsEnabled: boolean;
    /** @settingKey FinancialCore.Symitar.DebitCardTypeCodes */
    list: DebitCardTypeCodes;
    /** @settingKey FinancialCore.Symitar.ShouldReverseAddressLine1And2 */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// For most symitar credit unions, The apartment/unit number should go in addressLine1 on the core and the street address should go in address line2.
     * /// /// If there is no apartment number, then the street address will go in the addressLine1 field.  That is the default behavior.  Some credit unions
     * /// /// opt for a simpler method where street address always goes to addressLine1 and apartment/unit number always goes to address line2.  When this setting
     * /// /// is enabled, the address lines 1 and 2 will be flipped in the way that works for most Symitar credit unions.  When disabled, the address lines will be mapped
     * /// /// straight across.  The default value is true.
     * /// /// </summary>
     * /// </summary>
     */
    shouldReverseAddressLine1And2: boolean;
    /** @settingKey X.App.HBBOL.SymitarExternalLoanRecordMortgageTypes */
    symitarExternalLoanRecordMortgageTypes: string;
    /** @settingKey FinancialCore.Symitar.AccountInquiry.GetAlternateMicr */
    getAlternateMicr: boolean;
    accountInquiryIncludesRegD: boolean;
    /** @settingKey FinancialCore.Symitar.AccountInquiry.ScriptVersion */
    accountInquiryPowerOnVersion: string;
    /** @settingKey FinancialCore.Symitar.AccountInquiry.ScriptName */
    accountInquiryScriptName: string;
    /** @settingKey FinancialCore.Symitar.AccountInquiry.WarningCodes.BlockInquiry.Share */
    warningCodesBlockInquiryShare: string;
    /** @settingKey FinancialCore.Symitar.AccountInquiry.WarningCodes.BlockInquiry.Loan */
    warningCodesBlockInquiryLoan: string;
    /** @settingKey FinancialCore.Symitar.UserField.SkipPayQualifyingTrackingRecordType */
    skipPayQualifyingTrackingRecordType: number;
    /** @settingKey FinancialCore.Symitar.AlternateAddressType */
    symitarAlternateAddressType: number;
    /** @settingKey FinancialCore.Symitar.AccountHistory.CheckHoldsShowPostDate */
    showPostDate: boolean;
    /** @settingKey FinancialCore.Symitar.ShouldLoadMortgageFromTrackingRecord */
    shouldLoadMortgageFromTrackingRecord: boolean;
    /** @settingKey FinancialCore.Symitar.ShouldLoadCardsFromTrackingRecords */
    shouldLoadCardsFromTrackingRecords: boolean;
}
