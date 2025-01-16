using System.Linq;
using Psi.Data.Models.Domain.AccountManagement.Configuration;

namespace Psi.Data.Models.ClientConfigurationModels.Account
{
    public class TransferLimits : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;

        public TransferLimits(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Transfers.TransferLimits")]
        public TransferLimitsSettings Limits
        {
            // This is not a pattern to be followed.
            get
            {
                var settings = GetJsonValueOrNull<TransferLimitsSettings>() ?? new TransferLimitsSettings();
                settings.LimitGroups = settings.LimitGroups?.OrderBy(x => x.NumberOfDays).ToArray() ?? new TransferLimitGroupSettings[0]; // resort the settings in number of day order.  That's important.
                foreach (var x in settings.LimitGroups)
                {
                    foreach (var y in x?.TransferLimits ?? new TransferLimitKindAmountSettings[0])
                    {
                        y.TransferKinds = y.TransferKinds?.OrderBy(z => z).ToArray();
                    }
                }

                return settings;
            }
            set
            {
                SetValue(value);
            }
        }

        [SettingKey("Transfers.CustomTransferLimitMessagesEnabled")]
        public bool CustomTransferLimitMessagesEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}


