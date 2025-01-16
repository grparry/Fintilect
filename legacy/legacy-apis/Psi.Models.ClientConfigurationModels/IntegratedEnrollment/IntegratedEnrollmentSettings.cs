using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Psi.Data.Models.Domain.IntegratedEnrollment;

namespace Psi.Data.Models.ClientConfigurationModels.IntegratedEnrollment
{
    public class IntegratedEnrollmentSettings : SettingsBaseHelper
    {
        public IntegratedEnrollmentSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// If true will make a call to OAO to get ACH accounts during OAO Integrated Enrollment
        /// </summary>
        /// <remarks>Default Value is True</remarks>
        [SettingKey("IntegratedEnrollment.Ach.Enabled")]
        public bool AchEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("IntegratedEnrollment.SSO.ShouldStoreUserIdAndPassword")]
        public bool ShouldStoreUserIdAndPassword
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("IntegratedEnrollment.ThirdPartyOao.Enabled")]
        public bool ThirdPartyOaoEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("IntegratedEnrollment.ThirdPartyOao.MinVersion")]
        public double ThirdPartyOaoMinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("IntegratedEnrollment.SSO.SkippedEnrollmentSteps")]
        public Dictionary<EnrollmentSteps, bool> SkippedEnrollmentSteps
        {
            get
            {
                var fields = Enum.GetValues(typeof(EnrollmentSteps))
                    .Cast<EnrollmentSteps>()
                    .ToDictionary(key => key, value => false);

                var list = GetListValue();

                list?.ForEach((x) =>
                {
                    if (Enum.TryParse(x, out EnrollmentSteps field))
                    {
                        fields[field] = true;
                    }
                });

                return fields;
            }
            set => SetValue(value);
        }
    }
}
