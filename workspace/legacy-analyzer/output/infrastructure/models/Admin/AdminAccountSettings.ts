// Generated imports
import { AccountNumberReassignmentSettings } from './AccountNumberReassignmentSettings';

export interface AdminAccountSettings {
    accountNumberReassignmentSettings: AccountNumberReassignmentSettings;
    /** @settingKey Admin.Account.AllowAccountNumberReassignment.Enabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Enable Account Number Reassignment feature in Admin
     * /// /// </summary>
     * /// </summary>
     */
    allowAccountNumberReassignmentEnabled: boolean;
    /** @settingKey Admin.Account.AllowAccountNumberReassignment.PromptDeactivateExternalScheduledTransfers */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, prompt Admin user to disable or to reassign external scheduled transfers
     * /// /// </summary>
     * /// </summary>
     */
    promptDeactivateExternalScheduledTransfers: boolean;
    /** @settingKey Admin.AccountNumberReassignment.ShouldConvertHouseholding */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true replace old account number with new account number
     * /// /// If false delete records in HouseHoldingUsers and HouseHolding permissions
     * /// /// also mark cross account scheduled transfers as inactive
     * /// /// </summary>
     * /// </summary>
     */
    shouldConvertHouseholding: boolean;
}
