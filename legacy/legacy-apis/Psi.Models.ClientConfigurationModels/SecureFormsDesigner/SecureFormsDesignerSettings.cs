using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Psi.Data.Models.ClientConfigurationModels.SecureFormsDesigner
{
    public class SecureFormsDesignerSettings : SettingsBaseHelper
    {
        public SecureFormsDesignerSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("SecureFormsDesigner.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("SecureFormsDesigner.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("SecureFormsDesigner.SecureFormsDesignerUrl")]
        public string SecureFormsDesignerUrl
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}
