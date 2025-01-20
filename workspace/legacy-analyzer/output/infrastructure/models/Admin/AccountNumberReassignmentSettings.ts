// Generated imports

export interface AccountNumberReassignmentSettings {
    /** @settingKey Admin.Account.AccountNumberReassignment.ChangeUuidWhenAccountNumberMatches */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If the Uuid should be changed during an account number reassignment
     * /// /// </summary>
     * /// </summary>
     */
    changeUuidWhenAccountNumberMatches: boolean;
    /** @settingKey Admin.Account.AccountNumberReassignment.RemoveMfaQuestion */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If Mfa questions should be removed upon account number reassignment
     * /// /// </summary>
     * /// </summary>
     */
    removeMfaQuestion: boolean;
    /** @settingKey Admin.Account.AccountNumberReassignment.DisableScheduledTransfersUsingAccount */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If scheduled transfers using account number should be disabled
     * /// /// </summary>
     * /// </summary>
     */
    disableScheduledTransfersUsingAccount: boolean;
}
