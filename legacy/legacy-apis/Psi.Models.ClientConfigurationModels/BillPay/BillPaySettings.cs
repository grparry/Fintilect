using System;
using System.Collections.Generic;
using System.Linq;

namespace Psi.Data.Models.ClientConfigurationModels.BillPay
{
    public class BillPaySettings : SettingsBaseHelper
    {
        private RecurringBillPay _recurringBillPay;
        private OutOfBand _outOfBand;
        private GoodFunds _goodFunds;
        private BillPay2 _billPay2;
        private CheckFree _checkFree;
        private Help _help;
        private Metavante _metavante;
        private BillMatrix _billMatrix;
        private SymmetryBillPay _symmetry;

        public BillPaySettings(ISettingsBase settingsBase) : base(settingsBase)
        {

        }

        [SettingKey("Billpay.BillPaySettings.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Whether or not MicrNumbers should should be considered equivalent even if the have different numbers of leading zeros.
        /// </summary>
        [SettingKey("Billpay.BillPaySettings.ShouldIgnoreLeadingZerosOnMicr")]
        public bool ShouldIgnoreLeadingZerosOnMicr
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [Obsolete]
        [SettingKey("Billpay.BillPaySettings.HomeBanking.DisplayNewMockUp")]
        public bool DisplayNewMockUp
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Billpay.BillPaySettings.UseMicrAsDraftAccountNumber")]
        public bool UseMicrAsDraftAccountNumber
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("billpay.EnableMultiFundingAccount")]
        public bool EnableMultiFundingAccount
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Billpay.DefaultLeadDays")]
        public int DefaultLeadDays
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Billpay.DeliverByDatesToCalculate")]
        public int DeliverByDatesToCalculate
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Billpay.CalculateBillPayPaymentDates.MinVersion")]
        public double CalculateBillPayPaymentDatesMinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.CalculateBillPayPaymentDates.Enabled")]
        public bool CalculateBillPayPaymentDatesEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.GetPaymentOptions")]
        public bool GetPaymentOptions
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.BillPayEnabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.CanChangeBillPayAmount")]
        public bool CanChangeBillPayAmount
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.CanChangeBillPayDeliverByDate")]
        public bool CanChangeBillPayDeliverByDate
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Billpay.ShowHelpTab")]
        public bool ShowHelpTab
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.IpayCanUpdateSubscriberAddress")]
        public bool IpayCanUpdateSubscriberAddress
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.ShouldSetIpayLoginIdAsGuid")]
        public bool ShouldSetIpayLoginIdAsGuid
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.BillPayFlagNumber")]
        public string X_AppBolBillPayFlagNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.BillPayAccounts")]
        public List<string> BillPayAccounts
        {
            get
            {
                var categories = GetListValue();
                
                return categories?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>(); //strip out all null and string.empty values
            }
            set => SetValue(string.Join(",", value));
        }

        [SettingKey("BillPay.BusinessBillPay.ShouldShowAccountSelector")]
        public bool ShouldShowAccountSelector
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.Ipay.BusinessBillPayUrl")]
        public string IpayBusinessBillPayUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.Ipay.IpayMaxReceivedMessageSize")]
        public int IpayMaxReceivedMessageSize
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.Ipay.IpayMaxBufferSize")]
        public int IpayMaxBufferSize
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        public RecurringBillPay RecurringBillPay
        {
            get => _recurringBillPay ?? (_recurringBillPay = new RecurringBillPay(SettingsBase));
            set => _recurringBillPay = value;
        }

        public OutOfBand OutOfBand
        {
            get => _outOfBand ?? (_outOfBand = new OutOfBand(SettingsBase));
            set => _outOfBand = value;
        }

        public GoodFunds GoodFunds
        {
            get => _goodFunds ?? (_goodFunds = new GoodFunds(SettingsBase));
            set => _goodFunds = value;
        }

        public BillPay2 BillPay2
        {
            get => _billPay2 ?? (_billPay2 = new BillPay2(SettingsBase));
            set => _billPay2 = value;
        }

        public CheckFree CheckFree
        {
            get => _checkFree ?? (_checkFree = new CheckFree(SettingsBase));
            set => _checkFree = value;
        }

        public Help Help
        {
            get => _help ?? (_help = new Help(SettingsBase));
            set => _help = value;
        }

        public Metavante Metavante
        {
            get => _metavante ?? (_metavante = new Metavante(SettingsBase));
            set => _metavante = value;
        }

        public BillMatrix BillMatrix
        {
            get => _billMatrix ?? (_billMatrix = new BillMatrix(SettingsBase));
            set => _billMatrix = value;
        }

        public SymmetryBillPay Symmetry
        {
            get => _symmetry ?? (_symmetry = new SymmetryBillPay(SettingsBase));
            set => _symmetry = value;
        }
    }
}
