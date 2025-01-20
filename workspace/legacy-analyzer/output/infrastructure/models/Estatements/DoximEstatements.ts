// Generated imports

export interface DoximEstatements {
    /** @settingKey Estatements.DoximEstatements.Enabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Doxim Estatements enabled as bool
     * /// /// </summary>
     * /// </summary>
     */
    enabled: boolean;
    /** @settingKey Estatements.DoximEstatements.EndpointAddress */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Doxim Estatements endpoint address (url) as string. Provided by Doxim.
     * /// /// </summary>
     * /// </summary>
     */
    endpointAddress: string;
    /** @settingKey Estatements.DoximEstatements.Identifier */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Doxim Estatements Institution Identifier as string
     * /// /// </summary>
     * /// /// <remarks>This will be like "connectfss". Provided by Doxim.
     * /// /// This is how their system knows who is making the request.</remarks>
     * /// </summary>
     */
    identifier: string;
    /** @settingKey Estatements.DoximEstatements.SecretKey */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Doxim Estatements Secret Key as string
     * /// /// </summary>
     * /// /// <remarks>Secret key for HMAC-SHA-256 encryption. Provided by agreement between connect and Doxim.
     * /// /// This is the key we use to encrypt the .hmac property on the request object.</remarks>
     * /// </summary>
     */
    secretKey: string;
}
