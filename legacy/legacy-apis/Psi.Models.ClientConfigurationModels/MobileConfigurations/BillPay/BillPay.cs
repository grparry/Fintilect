using System;
using System.Linq;
using NLog;
using Psi.Data.Models.ClientConfigurationModels.BillPay;
using Psi.Data.Models.Domain;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.BillPay
{
    public class BillPay : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private AddPayee.AddPayee _addPayee;
        private PhotoBillPay.PhotoBillPay _photoBillPay;
        private Authentication.Authentication _authentication;
        private RecurringBillPay _recurringBillPay;
        private MakePayment _makePayment;
        private NewBillPayInterface _newBillPayInterface;
        private CheckFree _checkFree;
        private BillMatrix _billMatrix;
        private SymmetryBillPay _symmetry;

        public BillPay(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        [SettingKey("Mobile.BillPay.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.IsNextPaymentDayEnabled")]
        public bool IsNextPaymentDayEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.ExcludeHolidaysFromCalendar")]
        public bool ExcludeHolidaysFromCalendar
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.HidePayeePaymentType")]
        public bool HidePayeePaymentType
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.Method")]
        public BillPayMethod Method
        {
            get
            {
                BillPayMethod type;
                Enum.TryParse(GetValue(), true, out type);
                return type;
            }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.IpayCanCalculatePaymentDates")]
        public bool IpayCanCalculatePaymentDates
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.SameDayPaymentCutOffTimeUtc")]
        public DateTime? SameDayPaymentCutOffTimeUtc
        {
            get
            {
                var utcNow = DateTime.UtcNow;
                var timeOfDay = GetValue();
                try
                {
                    if (timeOfDay.IsNullOrEmpty() || timeOfDay.Split(':').Length != 2)
                    {
                        return null;
                    }

                    var temp = timeOfDay.Split(':');

                    return new DateTime(utcNow.Year, utcNow.Month, utcNow.Day, temp.First().ToInt(0), temp[1].ToInt(0), 0);
                }
                catch (Exception ex)
                {
                    LogManager.GetCurrentClassLogger().Error(ex, $"{timeOfDay} is not a valid value for Mobile.BillPay.SameDayPaymentCutOffTimeUtc. Format should be HH:mm");
                    return null;
                }
            }
            set => SetValue(value);
        }

        [SettingKey("Mobile.BillPay.GetPayeesBillPay2Interface.Enabled")]
        public bool GetPayeesBillPay2InterfaceEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.BillPay.MobileEnrollmentEnabled")]
        public bool MobileEnrollmentEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        public AddPayee.AddPayee AddPayee
        {
            get { return _addPayee ?? (_addPayee = new AddPayee.AddPayee(_settingsBase)); }
            set { _addPayee = value; }
        }

        public PhotoBillPay.PhotoBillPay PhotoBillPay
        {
            get { return _photoBillPay ?? (_photoBillPay = new PhotoBillPay.PhotoBillPay(_settingsBase)); }
            set { _photoBillPay = value; }
        }

        public RecurringBillPay RecurringBillPay
        {
            get { return _recurringBillPay ?? (_recurringBillPay = new RecurringBillPay(_settingsBase)); }
            set { _recurringBillPay = value; }
        }

        public MakePayment MakePayment
        {
            get { return _makePayment ?? (_makePayment = new MakePayment(_settingsBase)); }
            set { _makePayment = value; }
        }

        public NewBillPayInterface NewBillPayInterface
        {
            get { return _newBillPayInterface ?? (_newBillPayInterface = new NewBillPayInterface(_settingsBase)); }
            set { _newBillPayInterface = value; }
        }

        public CheckFree CheckFree
        {
            get { return _checkFree ?? (_checkFree = new CheckFree(_settingsBase)); }
            set { _checkFree = value; }
        }

        public BillMatrix BillMatrix
        {
            get { return _billMatrix ?? (_billMatrix = new BillMatrix(_settingsBase)); }
            set { _billMatrix = value; }
        }

        public SymmetryBillPay Symmetry
        {
            get { return _symmetry ?? (_symmetry = new SymmetryBillPay(_settingsBase)); }
            set { _symmetry = value; }
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get { return _authentication ?? (_authentication = new Authentication.Authentication(new Guid("10686981-BEBC-440F-B6D5-C8DEC4EEF210"))); }
            set { _authentication = value; }
        }
    }
}
