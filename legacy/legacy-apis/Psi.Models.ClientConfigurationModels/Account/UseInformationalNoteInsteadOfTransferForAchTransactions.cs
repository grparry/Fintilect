namespace Psi.Data.Models.ClientConfigurationModels.Account
{
    /// <summary>
    /// Allows credit unions to place informational notes (known as memos in Summit) on accounts instead of transferring funds to a holding account for ACH processing.
    /// </summary>
    public class UseInformationalNoteInsteadOfTransferForAchTransactions : SettingsBaseHelper
    {
        public UseInformationalNoteInsteadOfTransferForAchTransactions(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// A number that indicates whether the minimum allowed Online Banking version that can use the Use Informational NoteInstead Of Transfer For Ach Transactions feature.
        /// </summary>
        [SettingKey("Transfers.Ach.UseInformationalNoteInsteadOfTransferForAchTransactions.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        /// <summary>
        /// A boolean that indicates whether or not the Use Informational NoteInstead Of Transfer For Ach Transactions feature is enabled.
        /// </summary>
        [SettingKey("Transfers.Ach.UseInformationalNoteInsteadOfTransferForAchTransactions.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// The min value in the memo number range that will be used for creating guaranteed funds memos for ACH transactions..
        /// </summary>
        [SettingKey("Transfers.Ach.UseInformationalNoteInsteadOfTransferForAchTransactions.InformationalNoteRangeMinimum")]
        public string InformationalNoteRangeMinimum
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// The max value in the memo number range that will be used for creating guaranteed funds memos for ACH transactions.
        /// </summary>
        [SettingKey("Transfers.Ach.UseInformationalNoteInsteadOfTransferForAchTransactions.InformationalNoteRangeMaximum")]
        public string InformationalNoteRangeMaximum
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// The life of the Guaranteed funds note in days.
        /// </summary>
        [SettingKey("Transfers.Ach.UseInformationalNoteInsteadOfTransferForAchTransactions.NoteExpirationTimeInDays")]
        public double NoteExpirationTimeInDays
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        /// <summary>
        /// The transaction description for pending outgoing ACH transactions (Guaranteed funds memos/informational notes) that will be displayed to users when viewing account history.
        /// </summary>
        [SettingKey("Transfers.Ach.UseInformationalNoteInsteadOfTransferForAchTransactions.TransactionDescription")]
        public string TransactionDescription { get => GetValue(); set => SetValue(value); }

        [SettingKey("Transfers.Ach.UseInformationalNoteInsteadOfTransferForAchTransactions.ByPassNote")]
        public bool ByPassNote
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}