using System;

namespace Psi.Data.Models.ClientConfigurationModels.Account
{
    public class PlaceHoldsOnAchTransactions : SettingsBaseHelper
    {
        public PlaceHoldsOnAchTransactions(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Transfers.Ach.PlaceHoldsOnAchTransactions.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Transfers.Ach.PlaceHoldsOnAchTransactions.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Transfers.Ach.PlaceHoldsOnAchTransactions.StartMemoNumber")]
        public string StartMemoNumber
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Transfers.Ach.PlaceHoldsOnAchTransactions.StopMemoNumber")]
        public string StopMemoNumber
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Transfers.Ach.PlaceHoldsOnAchTransactions.DaysTillHoldExpires")]
        public uint DaysTillHoldExpires
        {
            get => GetUIntValue();
            set => SetValue(value);
        }

        [Obsolete("This config setting is no longer used.")]
        [SettingKey("Transfers.Ach.PlaceHoldsOnAchTransactions.AmountToReleaseImmediately")]
        public long AmountToReleaseImmediately
        {
            get { return GetLongValue(); }
            set { SetValue(value); }
        }
    }
}