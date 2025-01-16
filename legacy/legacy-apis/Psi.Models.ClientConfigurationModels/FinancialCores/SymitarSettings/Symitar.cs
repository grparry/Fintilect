using System.Collections.Generic;

namespace Psi.Data.Models.ClientConfigurationModels.FinancialCores.SymitarSettings
{
    public class Symitar : SettingsBaseHelper
    {
        private RemoteDepositCheckHoldSettings _remoteDepositCheckHold;

        public Symitar(ISettingsBase settingsBase) : base(settingsBase)
        {
        }
        //TODO:  We might need this time zone config to determine hold end dates.
//        [SettingKey("FinancialCore.Symitar.TimeZone")]
//        public string TimeZone
//        {
//            get => GetValue();
//            set => SetValue(value);
//        }

        public RemoteDepositCheckHoldSettings RemoteDepositCheckHold
        {
            get => _remoteDepositCheckHold ?? (_remoteDepositCheckHold = new RemoteDepositCheckHoldSettings(SettingsBase));
            set => _remoteDepositCheckHold = value;
        }

        [SettingKey("FinancialCore.Symitar.Transfers.IsTransferWithoutVirtualCardsEnabled")]
        public bool IsTransferWithoutVirtualCardsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Symitar.UserField.SuccessfulLoginOLBTrackingRecordType")]
        public int SuccessfulLoginOLBTrackingRecordType
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinancialCore.Symitar.UserField.SuccessfulLoginOLBTrackingRecordField")]
        public TrackingRecordFieldName SuccessfulLoginOLBTrackingRecordField
        {
            get { return GetTrackingRecordFieldName(GetValue()); }
        }

        [SettingKey("FinancialCore.Symitar.UserField.SuccessfulLoginMobileTrackingRecordType")]
        public int SuccessfulLoginMobileTrackingRecordType
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinancialCore.Symitar.UserField.SuccessfulLoginMobileTrackingRecordField")]
        public TrackingRecordFieldName SuccessfulLoginMobileTrackingRecordField
        {
            get { return GetTrackingRecordFieldName(GetValue()); }
        }

        [SettingKey("FinancialCore.Symitar.ExternalLoans.ExternalLoanTrackingRecordInterestField")]
        public TrackingRecordFieldName ExternalLoanTrackingRecordInterestField
        {
            get => GetTrackingRecordFieldName(GetValue());
            set => SetValue(value);

        }

        [SettingKey("FinancialCore.Symitar.ExternalLoans.GetInterestRateFromExternalLoanTrackingRecordIsEnabled")]
        public bool GetInterestRateFromExternalLoanTrackingRecordIsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Symitar.DebitCardTypeCodes")]
        public List<string> DebitCardTypeCodes
        {
            get { return GetListValue() ?? new List<string>(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// For most symitar credit unions, The apartment/unit number should go in addressLine1 on the core and the street address should go in address line2.  
        /// If there is no apartment number, then the street address will go in the addressLine1 field.  That is the default behavior.  Some credit unions
        /// opt for a simpler method where street address always goes to addressLine1 and apartment/unit number always goes to address line2.  When this setting
        /// is enabled, the address lines 1 and 2 will be flipped in the way that works for most Symitar credit unions.  When disabled, the address lines will be mapped
        /// straight across.  The default value is true.
        /// </summary>
        [SettingKey("FinancialCore.Symitar.ShouldReverseAddressLine1And2")]
        public bool ShouldReverseAddressLine1And2
        {
            get => GetBoolValue(true);
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.SymitarExternalLoanRecordMortgageTypes")]
        public string SymitarExternalLoanRecordMortgageTypes
        {
            get => GetValue();
            set => SetValue(value);
        }

        public TrackingRecordFieldName GetTrackingRecordFieldName(string fieldSetting)
        {
            switch (fieldSetting.ToUpper())
            {
                case "USERNUMBER1":
                    return TrackingRecordFieldName.UserNumber1;
                case "USERNUMBER2":
                    return TrackingRecordFieldName.UserNumber2;
                case "USERNUMBER3":
                    return TrackingRecordFieldName.UserNumber3;
                case "USERNUMBER4":
                    return TrackingRecordFieldName.UserNumber4;
                case "USERNUMBER5":
                    return TrackingRecordFieldName.UserNumber5;
                case "USERNUMBER6":
                    return TrackingRecordFieldName.UserNumber6;
                case "USERNUMBER7":
                    return TrackingRecordFieldName.UserNumber7;
                case "USERNUMBER8":
                    return TrackingRecordFieldName.UserNumber8;
                case "USERNUMBER9":
                    return TrackingRecordFieldName.UserNumber9;
                case "USERNUMBER10":
                    return TrackingRecordFieldName.UserNumber10;
                case "USERNUMBER11":
                    return TrackingRecordFieldName.UserNumber11;
                case "USERNUMBER12":
                    return TrackingRecordFieldName.UserNumber12;
                case "USERNUMBER13":
                    return TrackingRecordFieldName.UserNumber13;
                case "USERNUMBER14":
                    return TrackingRecordFieldName.UserNumber14;
                case "USERNUMBER15":
                    return TrackingRecordFieldName.UserNumber15;
                case "USERNUMBER16":
                    return TrackingRecordFieldName.UserNumber16;
                case "USERNUMBER17":
                    return TrackingRecordFieldName.UserNumber17;
                case "USERNUMBER18":
                    return TrackingRecordFieldName.UserNumber18;
                case "USERNUMBER19":
                    return TrackingRecordFieldName.UserNumber19;
                case "USERNUMBER20":
                    return TrackingRecordFieldName.UserNumber20;
                case "USERCHAR1":
                    return TrackingRecordFieldName.UserChar1;
                case "USERCHAR2":
                    return TrackingRecordFieldName.UserChar2;
                case "USERCHAR3":
                    return TrackingRecordFieldName.UserChar3;
                case "USERCHAR4":
                    return TrackingRecordFieldName.UserChar4;
                case "USERCHAR5":
                    return TrackingRecordFieldName.UserChar5;
                case "USERCHAR6":
                    return TrackingRecordFieldName.UserChar6;
                case "USERCHAR7":
                    return TrackingRecordFieldName.UserChar7;
                case "USERCHAR8":
                    return TrackingRecordFieldName.UserChar8;
                case "USERCHAR9":
                    return TrackingRecordFieldName.UserChar9;
                case "USERCHAR10":
                    return TrackingRecordFieldName.UserChar10;
                case "USERCHAR11":
                    return TrackingRecordFieldName.UserChar11;
                case "USERCHAR12":
                    return TrackingRecordFieldName.UserChar12;
                case "USERCHAR13":
                    return TrackingRecordFieldName.UserChar13;
                case "USERCHAR14":
                    return TrackingRecordFieldName.UserChar14;
                case "USERCHAR15":
                    return TrackingRecordFieldName.UserChar15;
                case "USERCHAR16":
                    return TrackingRecordFieldName.UserChar16;
                case "USERCHAR17":
                    return TrackingRecordFieldName.UserChar17;
                case "USERCHAR18":
                    return TrackingRecordFieldName.UserChar18;
                case "USERCHAR19":
                    return TrackingRecordFieldName.UserChar19;
                case "USERCHAR20":
                    return TrackingRecordFieldName.UserChar20;
                case "USERAMOUNT1":
                    return TrackingRecordFieldName.UserAmount1;
                case "USERAMOUNT2":
                    return TrackingRecordFieldName.UserAmount2;
                case "USERAMOUNT3":
                    return TrackingRecordFieldName.UserAmount3;
                case "USERAMOUNT4":
                    return TrackingRecordFieldName.UserAmount4;
                case "USERAMOUNT5":
                    return TrackingRecordFieldName.UserAmount5;
                case "USERAMOUNT6":
                    return TrackingRecordFieldName.UserAmount6;
                case "USERAMOUNT7":
                    return TrackingRecordFieldName.UserAmount7;
                case "USERAMOUNT8":
                    return TrackingRecordFieldName.UserAmount8;
                case "USERAMOUNT9":
                    return TrackingRecordFieldName.UserAmount9;
                case "USERAMOUNT10":
                    return TrackingRecordFieldName.UserAmount10;
                case "USERAMOUNT11":
                    return TrackingRecordFieldName.UserAmount11;
                case "USERAMOUNT12":
                    return TrackingRecordFieldName.UserAmount12;
                case "USERAMOUNT13":
                    return TrackingRecordFieldName.UserAmount13;
                case "USERAMOUNT14":
                    return TrackingRecordFieldName.UserAmount14;
                case "USERAMOUNT15":
                    return TrackingRecordFieldName.UserAmount15;
                case "USERAMOUNT16":
                    return TrackingRecordFieldName.UserAmount16;
                case "USERAMOUNT17":
                    return TrackingRecordFieldName.UserAmount17;
                case "USERAMOUNT18":
                    return TrackingRecordFieldName.UserAmount18;
                case "USERAMOUNT19":
                    return TrackingRecordFieldName.UserAmount19;
                case "USERAMOUNT20":
                    return TrackingRecordFieldName.UserAmount20;
                case "USERCODE1":
                    return TrackingRecordFieldName.UserCode1;
                case "USERCODE2":
                    return TrackingRecordFieldName.UserCode2;
                case "USERCODE3":
                    return TrackingRecordFieldName.UserCode3;
                case "USERCODE4":
                    return TrackingRecordFieldName.UserCode4;
                case "USERCODE5":
                    return TrackingRecordFieldName.UserCode5;
                case "USERCODE6":
                    return TrackingRecordFieldName.UserCode6;
                case "USERCODE7":
                    return TrackingRecordFieldName.UserCode7;
                case "USERCODE8":
                    return TrackingRecordFieldName.UserCode8;
                case "USERCODE9":
                    return TrackingRecordFieldName.UserCode9;
                case "USERCODE10":
                    return TrackingRecordFieldName.UserCode10;
                case "USERCODE11":
                    return TrackingRecordFieldName.UserCode11;
                case "USERCODE12":
                    return TrackingRecordFieldName.UserCode12;
                case "USERCODE13":
                    return TrackingRecordFieldName.UserCode13;
                case "USERCODE14":
                    return TrackingRecordFieldName.UserCode14;
                case "USERCODE15":
                    return TrackingRecordFieldName.UserCode15;
                case "USERCODE16":
                    return TrackingRecordFieldName.UserCode16;
                case "USERCODE17":
                    return TrackingRecordFieldName.UserCode17;
                case "USERCODE18":
                    return TrackingRecordFieldName.UserCode18;
                case "USERCODE19":
                    return TrackingRecordFieldName.UserCode19;
                case "USERCODE20":
                    return TrackingRecordFieldName.UserCode20;
                case "USERDATE1":
                    return TrackingRecordFieldName.UserDate1;
                case "USERDATE2":
                    return TrackingRecordFieldName.UserDate2;
                case "USERDATE3":
                    return TrackingRecordFieldName.UserDate3;
                case "USERDATE4":
                    return TrackingRecordFieldName.UserDate4;
                case "USERDATE5":
                    return TrackingRecordFieldName.UserDate5;
                case "USERDATE6":
                    return TrackingRecordFieldName.UserDate6;
                case "USERDATE7":
                    return TrackingRecordFieldName.UserDate7;
                case "USERDATE8":
                    return TrackingRecordFieldName.UserDate8;
                case "USERDATE9":
                    return TrackingRecordFieldName.UserDate9;
                case "USERDATE10":
                    return TrackingRecordFieldName.UserDate10;
                case "USERDATE11":
                    return TrackingRecordFieldName.UserDate11;
                case "USERDATE12":
                    return TrackingRecordFieldName.UserDate12;
                case "USERDATE13":
                    return TrackingRecordFieldName.UserDate13;
                case "USERDATE14":
                    return TrackingRecordFieldName.UserDate14;
                case "USERDATE15":
                    return TrackingRecordFieldName.UserDate15;
                case "USERDATE16":
                    return TrackingRecordFieldName.UserDate16;
                case "USERDATE17":
                    return TrackingRecordFieldName.UserDate17;
                case "USERDATE18":
                    return TrackingRecordFieldName.UserDate18;
                case "USERDATE19":
                    return TrackingRecordFieldName.UserDate19;
                case "USERDATE20":
                    return TrackingRecordFieldName.UserDate20;
                case "USERRATE1":
                    return TrackingRecordFieldName.UserRate1;
                case "USERRATE2":
                    return TrackingRecordFieldName.UserRate2;
                case "USERRATE3":
                    return TrackingRecordFieldName.UserRate3;
                case "USERRATE4":
                    return TrackingRecordFieldName.UserRate4;
                case "USERRATE5":
                    return TrackingRecordFieldName.UserRate5;
                case "USERRATE6":
                    return TrackingRecordFieldName.UserRate6;
                case "USERRATE7":
                    return TrackingRecordFieldName.UserRate7;
                case "USERRATE8":
                    return TrackingRecordFieldName.UserRate8;
                case "USERRATE9":
                    return TrackingRecordFieldName.UserRate9;
                case "USERRATE10":
                    return TrackingRecordFieldName.UserRate10;
                case "USERRATE11":
                    return TrackingRecordFieldName.UserRate11;
                case "USERRATE12":
                    return TrackingRecordFieldName.UserRate12;
                case "USERRATE13":
                    return TrackingRecordFieldName.UserRate13;
                case "USERRATE14":
                    return TrackingRecordFieldName.UserRate14;
                case "USERRATE15":
                    return TrackingRecordFieldName.UserRate15;
                case "USERRATE16":
                    return TrackingRecordFieldName.UserRate16;
                case "USERRATE17":
                    return TrackingRecordFieldName.UserRate17;
                case "USERRATE18":
                    return TrackingRecordFieldName.UserRate18;
                case "USERRATE19":
                    return TrackingRecordFieldName.UserRate19;
                case "USERRATE20":
                    return TrackingRecordFieldName.UserRate20;
                default:
                    return TrackingRecordFieldName.UserNumber1;
            }   // end switch
        }


        [SettingKey("FinancialCore.Symitar.AccountInquiry.GetAlternateMicr")]
        public bool GetAlternateMicr
        {
            get => GetBoolValue(true);
            set => SetValue(value);
        }

        public bool AccountInquiryIncludesRegD
        {
            get { return AccountInquiryPowerOnVersion == "V2"; }
        }

        [SettingKey("FinancialCore.Symitar.AccountInquiry.ScriptVersion")]
        public string AccountInquiryPowerOnVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Symitar.AccountInquiry.ScriptName")]
        public string AccountInquiryScriptName
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Symitar.AccountInquiry.WarningCodes.BlockInquiry.Share")]
        public string WarningCodesBlockInquiryShare
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Symitar.AccountInquiry.WarningCodes.BlockInquiry.Loan")]
        public string WarningCodesBlockInquiryLoan
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Symitar.UserField.SkipPayQualifyingTrackingRecordType")]
        public int SkipPayQualifyingTrackingRecordType
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Symitar.AlternateAddressType")]
        public int SymitarAlternateAddressType
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Symitar.AccountHistory.CheckHoldsShowPostDate")]
        public bool ShowPostDate
        {
            get => GetBoolValue(true);
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Symitar.ShouldLoadMortgageFromTrackingRecord")]
        public bool ShouldLoadMortgageFromTrackingRecord
        {
            get => GetBoolValue(true);
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Symitar.ShouldLoadCardsFromTrackingRecords")]
        public bool ShouldLoadCardsFromTrackingRecords
        {
            get => GetBoolValue(true);
            set => SetValue(value);
        }
    }

    public enum TrackingRecordFieldName
    {
        UserNumber1,
        UserNumber2,
        UserNumber3,
        UserNumber4,
        UserNumber5,
        UserNumber6,
        UserNumber7,
        UserNumber8,
        UserNumber9,
        UserNumber10,
        UserNumber11,
        UserNumber12,
        UserNumber13,
        UserNumber14,
        UserNumber15,
        UserNumber16,
        UserNumber17,
        UserNumber18,
        UserNumber19,
        UserNumber20,
        UserChar1,
        UserChar2,
        UserChar3,
        UserChar4,
        UserChar5,
        UserChar6,
        UserChar7,
        UserChar8,
        UserChar9,
        UserChar10,
        UserChar11,
        UserChar12,
        UserChar13,
        UserChar14,
        UserChar15,
        UserChar16,
        UserChar17,
        UserChar18,
        UserChar19,
        UserChar20,
        UserAmount1,
        UserAmount2,
        UserAmount3,
        UserAmount4,
        UserAmount5,
        UserAmount6,
        UserAmount7,
        UserAmount8,
        UserAmount9,
        UserAmount10,
        UserAmount11,
        UserAmount12,
        UserAmount13,
        UserAmount14,
        UserAmount15,
        UserAmount16,
        UserAmount17,
        UserAmount18,
        UserAmount19,
        UserAmount20,
        UserCode1,
        UserCode2,
        UserCode3,
        UserCode4,
        UserCode5,
        UserCode6,
        UserCode7,
        UserCode8,
        UserCode9,
        UserCode10,
        UserCode11,
        UserCode12,
        UserCode13,
        UserCode14,
        UserCode15,
        UserCode16,
        UserCode17,
        UserCode18,
        UserCode19,
        UserCode20,
        UserDate1,
        UserDate2,
        UserDate3,
        UserDate4,
        UserDate5,
        UserDate6,
        UserDate7,
        UserDate8,
        UserDate9,
        UserDate10,
        UserDate11,
        UserDate12,
        UserDate13,
        UserDate14,
        UserDate15,
        UserDate16,
        UserDate17,
        UserDate18,
        UserDate19,
        UserDate20,
        UserRate1,
        UserRate2,
        UserRate3,
        UserRate4,
        UserRate5,
        UserRate6,
        UserRate7,
        UserRate8,
        UserRate9,
        UserRate10,
        UserRate11,
        UserRate12,
        UserRate13,
        UserRate14,
        UserRate15,
        UserRate16,
        UserRate17,
        UserRate18,
        UserRate19,
        UserRate20
    }
}

