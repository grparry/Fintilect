// Generated imports

export interface EplEstatements {
    /** @settingKey Estatements.EplEstatements.Enabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// EPL Estatements enabled
     * /// /// </summary>
     * /// </summary>
     */
    enabled: boolean;
    /** @settingKey Estatements.EplEstatements.EndpointAddress */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// EPL Estatements endpoint address (url)
     * /// /// </summary>
     * /// </summary>
     */
    endpointAddress: string;
    /** @settingKey Estatements.EplEstatements.GroupName */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// EPL Estatements GroupName
     * /// /// </summary>
     * /// /// <remarks>Should be "Connect Online Banking"</remarks>
     * /// </summary>
     */
    groupName: string;
    /** @settingKey Estatements.EplEstatements.Identifier */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// EPL Estatements Identifier
     * /// /// </summary>
     * /// /// <remarks>Should be "a9fa7ae9-a818-4b5f-a1aa-2e691f2dcbbc"
     * /// /// This is how their system knows who is making the request.</remarks>
     * /// </summary>
     */
    identifier: string;
    /** @settingKey Estatements.EplEstatements.PrivateKey */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// EPL Estatements Private Key
     * /// /// </summary>
     * /// /// <remarks>Should be "%!PgvG=m-GWW6#J7!!O1g&J4"
     * /// /// This is the key they use to encrypt requests.</remarks>
     * /// </summary>
     */
    privateKey: string;
    /** @settingKey Estatements.EplEstatements.EncryptionInitializationVector */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// EPL Estatements Encryption initialization vector (Encryption IV)
     * /// /// </summary>
     * /// /// <remarks>Should be "S0s@6iKF"
     * /// /// This is the Initialization Vector we use to encrypt requests. This should not change.</remarks>
     * /// </summary>
     */
    encryptionInitializationVector: string;
}
