using SymitarShareDepositConfiguration;

namespace Psi.Data.Models.ClientConfigurationModels.FinancialCores.SymitarSettings
{
    public class RemoteDepositCheckHoldSettings : SettingsBaseHelper
    {
        public RemoteDepositCheckHoldSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("FinancialCore.Symitar.RemoteDepositCheckHold")]
        public RemoteDepositCheckHold RemoteDepositCheckHold
        {
            get => GetJsonValueOrNull<RemoteDepositCheckHold>();
            set => SetValue(value);
        }
    }
}