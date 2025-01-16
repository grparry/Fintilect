using System;
using System.Collections.Generic;
using System.Linq;
using Psi.Data.Models.ClientConfigurationModels.FinancialCores;

namespace Psi.Data.Models.ClientConfigurationModels.FinancialCores
{
    public class PsiCore : SettingsBaseHelper
    {
        public PsiCore(ISettingsBase settingsBase) : base(settingsBase){}

        [SettingKey("FinancialCore.PSICore.SetDateOfBirth")]
        public bool SetDateOfBirth
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }



}


