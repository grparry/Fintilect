// Generated imports

export interface DNA {
    /** @settingKey FinancialCore.DNA.UserField.SuccessfulLoginCoreField */
    successfulLoginCoreField: string;
    /** @settingKey FinancialCore.DNA.UserField.ExtraStatementAccounts */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// The name of the user field in DNA where a comma separated list of statement accounts is stored.  The account numbers stored in that user field
     * /// /// will be available when the user wishes to view eStatements.
     * /// ///
     * /// /// This config setting is used in DNAAccountInquiry.vb
     * /// /// </summary>
     * /// </summary>
     */
    extraStatementAccountsCoreUserField: string;
    /** @settingKey FinancialCore.DNA.MapDormantAccounts */
    mapDormantAccounts: boolean;
    /** @settingKey FinancialCore.Dna.ValidDebitCardStatusCodes */
    validDebitCardStatusCodes: string;
}
