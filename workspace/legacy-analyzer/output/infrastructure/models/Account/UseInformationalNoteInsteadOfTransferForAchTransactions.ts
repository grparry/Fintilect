// Generated imports

export interface UseInformationalNoteInsteadOfTransferForAchTransactions {
    /** @settingKey Transfers.Ach.UseInformationalNoteInsteadOfTransferForAchTransactions.MinVersion */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// A number that indicates whether the minimum allowed Online Banking version that can use the Use Informational NoteInstead Of Transfer For Ach Transactions feature.
     * /// /// </summary>
     * /// </summary>
     */
    minVersion: number;
    /** @settingKey Transfers.Ach.UseInformationalNoteInsteadOfTransferForAchTransactions.Enabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// A boolean that indicates whether or not the Use Informational NoteInstead Of Transfer For Ach Transactions feature is enabled.
     * /// /// </summary>
     * /// </summary>
     */
    enabled: boolean;
    /** @settingKey Transfers.Ach.UseInformationalNoteInsteadOfTransferForAchTransactions.InformationalNoteRangeMinimum */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// The min value in the memo number range that will be used for creating guaranteed funds memos for ACH transactions..
     * /// /// </summary>
     * /// </summary>
     */
    informationalNoteRangeMinimum: string;
    /** @settingKey Transfers.Ach.UseInformationalNoteInsteadOfTransferForAchTransactions.InformationalNoteRangeMaximum */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// The max value in the memo number range that will be used for creating guaranteed funds memos for ACH transactions.
     * /// /// </summary>
     * /// </summary>
     */
    informationalNoteRangeMaximum: string;
    /** @settingKey Transfers.Ach.UseInformationalNoteInsteadOfTransferForAchTransactions.NoteExpirationTimeInDays */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// The life of the Guaranteed funds note in days.
     * /// /// </summary>
     * /// </summary>
     */
    noteExpirationTimeInDays: number;
    /** @settingKey Transfers.Ach.UseInformationalNoteInsteadOfTransferForAchTransactions.TransactionDescription */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// The transaction description for pending outgoing ACH transactions (Guaranteed funds memos/informational notes) that will be displayed to users when viewing account history.
     * /// /// </summary>
     * /// </summary>
     */
    transactionDescription: string;
    /** @settingKey Transfers.Ach.UseInformationalNoteInsteadOfTransferForAchTransactions.ByPassNote */
    byPassNote: boolean;
}
