using System;
using System.Collections.Generic;
using Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.CardControl.Locations;
using Psi.Data.Models.Domain.CardControl;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.CardControl
{
    public class CardControl : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private CardControlLocations _locations;
        private OndotDxSettings _ondotDxSettings;
        private OnDotSdkSettings _onDotSdkSettings;
        private CreditCardSettings _creditCardSettings;
        private DebitCardSettings _debitCardSettings;
        private LostOrStolenCardSettings _lostOrStolenCardSettings;
        private Authentication.Authentication _authentication;

        public CardControl(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        public OndotDxSettings OndotDxSettings
        {
            get => _ondotDxSettings ?? (_ondotDxSettings = new OndotDxSettings(_settingsBase));
            set => _ondotDxSettings = value;
        }

        public OnDotSdkSettings OnDotSdk
        {
            get => _onDotSdkSettings ?? (_onDotSdkSettings = new OnDotSdkSettings(_settingsBase));
            set => _onDotSdkSettings = value;
        }

        public CardControlLocations Locations
        {
            get => _locations ?? (_locations = new CardControlLocations(_settingsBase));
            set => _locations = value;
        }

        public CreditCardSettings CreditCard
        {
            get => _creditCardSettings ?? (_creditCardSettings = new CreditCardSettings(_settingsBase));
            set => _creditCardSettings = value;
        }

        public DebitCardSettings DebitCard
        {
            get => _debitCardSettings ?? (_debitCardSettings = new DebitCardSettings(_settingsBase));
            set => _debitCardSettings = value;
        }

        public LostOrStolenCardSettings LostOrStolenCard
        {
            get => _lostOrStolenCardSettings ?? (_lostOrStolenCardSettings = new LostOrStolenCardSettings(_settingsBase));
            set => _lostOrStolenCardSettings = value;
        }

        [SettingKey("Mobile.CardControl.MinimumVersion")]
        public string MinimumVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.SpendingLimitsEnabled")]
        public bool SpendingLimitsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.TransactionTypesEnabled")]
        public bool TransactionTypesEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.ManagePermissionsEnabled")]
        public bool ManagePermissionsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.UserDeviceSetupEnabled")]
        public bool UserDeviceSetupEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.AlertPreferencesEnabled")]
        public bool AlertPreferencesEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.MerchantTypesEnabled")]
        public bool MerchantTypesEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.CardOffFixedTimeEnabled")]
        public bool CardOffFixedTimeEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.CardOffUserDefinedTimeEnabled")]
        public bool CardOffUserDefinedTimeEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.LargeTransactionControlEnabled")]
        public bool LargeTransactionControlEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.InternationalTransactionControlEnabled")]
        public bool InternationalTransactionControlEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.MerchantStateListControlEnabled")]
        public bool MerchantStateListControlEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.InternetTransactionControlEnabled")]
        public bool InternetTransactionControlEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.TimeOfDayRangeControlEnabled")]
        public bool TimeOfDayRangeControlEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.ActiveCardStateCommonCode")]
        public string ActiveCardStateCommonCode
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.ClosedCardStateCommonCode")]
        public string ClosedCardStateCommonCode
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.RestrictedCardStateCommonCode")]
        public string RestrictedCardStateCommonCode
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.CardControlTypeIdentifierByCategory")]
        public List<CardControlTypeIdentifierByCategorySetting> CardControlTypeIdentifierByCategory
        {
            get => GetJsonValueOrNull<List<CardControlTypeIdentifierByCategorySetting>>();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.Vendor")]
        public CardControlVendor Vendor
        {
            get
            {
                Enum.TryParse(GetValue(), true, out CardControlVendor type);
                return type;
            }
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.DebitCardVendor")]
        public CardControlVendor DebitCardVendor
        {
            get
            {
                Enum.TryParse(GetValue(), true, out CardControlVendor type);
                return type;
            }
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.CreditCardVendor")]
        public CardControlVendor CreditCardVendor
        {
            get
            {
                Enum.TryParse(GetValue(), true, out CardControlVendor type);
                return type;
            }
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.DeleteClosedCards")]
        public bool DeleteClosedCards
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.AddPendingCards")]
        public bool AddPendingCards
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.HideCardNicknames")]
        public bool HideCardNicknames
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        // ReSharper disable once InconsistentNaming
        /// <summary>
        /// ID from PSCUConfig Table
        /// </summary>
        [SettingKey("Mobile.CardControl.PscuClientID")]
        public long PscuClientID
        {
            get => GetLongValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.CorelationLockReasonSerial")]
        public string CorelationLockReasonSerial
        {
            get => GetValue();
            set => SetValue(value);
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get => _authentication ?? (_authentication = new Authentication.Authentication(new Guid("62204794-77DC-4915-9D87-AAB025C45C89")));
            set => _authentication = value;
        }

        [SettingKey("Mobile.CardControl.IgnoreReferenceIds")]
        public bool IgnoreReferenceIds
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.HashKey")]
        public string HashKey
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.ShowRegisterCardOption")]
        public bool ShowRegisterCardOption
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.ConnectNative.Enabled")]
        public bool ConnectNativeEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.Alerts.MemberControlOfAlertsEnabled")]
        public bool MemberControlOfAlertsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.Alerts.AllAlertsOnOffEnabled")]
        public bool AllAlertsOnOffEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.Alerts.SpendingLimitAlertsEnabled")]
        public bool SpendingLimitAlertsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.Alerts.TransactionAmountAlertEnabled")]
        public bool TransactionAmountAlertEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.Alerts.MonthlyTransactionAmountAlertEnabled")]
        public bool MonthlyTransactionAmountAlertEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.AlertsDelivery.TransactionAmountAlertEnabled")]
        public bool AlertsDeliveryTransactionAmountAlertEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.AlertsDelivery.AnyTransactionAlertEnabled")]
        public bool AlertsDeliveryAnyTransactionAlertEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.AlertsDelivery.ShouldUseMessageText")]
        public bool AlertsDeliveryShouldUseMessageText
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.AlertsDelivery.MonthlySpendingAlertEnabled")]
        public bool AlertsDeliveryMonthlySpendingAlertEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.ReplaceCardEnabled")]
        public bool ReplaceCardEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.Symitar.DebitCardTypeIds")]
        public string SymitarDebitCardTypeIds
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.AtmCashWithdrawal.LimitEnabled")]
        public bool AtmCashWithdrawalLimitEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.AtmCashWithdrawal.MaximumAmount")]
        public long AtmCashWithdrawalMaximumAmount
        {
            get => GetLongValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.AtmCashWithdrawal.LimitFeeAmount")]
        public long AtmCashWithdrawalLimitFeeAmount
        {
            get => GetLongValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.RequestTypesRequiringCredentials")]
        public List<string> RequestTypesRequiringCredentials
        {
            get => GetListValue() ?? new List<string>();
            set => SetValue(value);
        }

        [SettingKey("Moblie.CardControl.Ondot.SendAmountAsDollars")]
        public bool SendAmountAsDollars
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.ShouldShowMemberNameFromCardRecord")]
        public bool ShouldShowMemberNameFromCardRecord
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CardControl.Alerts.UseCardNumberToDeriveSubscriptionAlerts")]
        public bool UseCardNumberToDeriveSubscriptionAlerts
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}