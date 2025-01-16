using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Psi.Data.Models.Domain.RestrictedWords;

namespace Psi.Data.Models.ClientConfigurationModels.RestrictedWords
{
    public class RestrictedWordSettings : SettingsBaseHelper
    {
        public RestrictedWordSettings(ISettingsBase settingsBase) : base(settingsBase)
        { }

        [SettingKey("RestrictedWords.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("RestrictedWords.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("RestrictedWords.ControlAreas")]
        public List<RestrictedWordControlAreas> ControlAreas
        {
            get
            {
                var rawFields = GetListValue();

                var result = new List<RestrictedWordControlAreas>();
                if (rawFields?.Any() != true)
                {
                    return result;
                }

                foreach (var rawField in rawFields)
                {
                    if (Enum.TryParse(rawField, true, out RestrictedWordControlAreas field))
                    {
                        result.Add(field);
                    }
                }

                return result;
            }
            set => SetValue(value);
        }

        [SettingKey("RestrictedWords.RestrictedWordList")]
        public string RestrictedWordListEncrypted
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}
