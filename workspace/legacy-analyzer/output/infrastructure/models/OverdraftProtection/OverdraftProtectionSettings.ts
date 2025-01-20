// Generated imports
import { SerialTypesForCourtesyPay } from '../SerialTypesForCourtesyPay';

export interface OverdraftProtectionSettings {
    /** @settingKey OverdraftProtection.Enabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// enabled bool
     * /// /// </summary>
     * /// </summary>
     */
    enabled: boolean;
    /** @settingKey OverdraftProtection.MinVersion */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// minversion
     * /// /// </summary>
     * /// </summary>
     */
    minVersion: number;
    /** @settingKey OverdraftProtection.UseSerialTypesForCourtesyPay */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// if true, use serial types (Corelation) for courtesy pay
     * /// /// </summary>
     * /// </summary>
     */
    shouldUseSerialTypesForCourtesyPay: boolean;
    /** @settingKey OverdraftProtection.SerialTypesForCourtesyPay */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// comma-delimited string of courtesy pay eligible serial types returned as a list of strings
     * /// /// </summary>
     * /// </summary>
     */
    list: SerialTypesForCourtesyPay;
    /** @settingKey OverdraftProtection.CourtesyPay.Enabled */
    courtesyPayEnabled: boolean;
}
