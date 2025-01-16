using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Psi.Data.Models.ClientConfigurationModels.BillPay
{
    public class SymmetryBillPay : SettingsBaseHelper
    {
        public SymmetryBillPay(ISettingsBase settingsBase) : base(settingsBase)
        {

        }

        [SettingKey("BillPay.Symmetry.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.Symmetry.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.Symmetry.MinIosVersion")]
        public string MinIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.Symmetry.MinAndroidVersion")]
        public string MinAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.Symmetry.CustomerGuid")]
        public Guid CustomerGuid
        {
            get => Guid.Parse(GetValue());
            set => SetValue(value.ToString());
        }

        [SettingKey("BillPay.Symmetry.ServiceUserId")]
        public string ServiceUserId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.Symmetry.ServicePassword")]
        public string ServicePassword
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.Symmetry.StatusServiceUrl")]
        public string StatusServiceUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.Symmetry.BreakoutInterfaceUrl")]
        public string BreakoutInterfaceUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("BillPay.Symmetry.LandingPageURL")]
        public string LandingPageUrl
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}
