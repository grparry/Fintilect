// Generated imports
import { [Feature](../../../Feature.md) } from '../[Feature](../../../Feature.md)';
import { DocumentArchitectSso } from '../Application/Omega/DocumentArchitectSso';

export interface OmegaConfiguration {
    /** @settingKey Omega.ConfigurationComparison.EnvironmentConnections */
    environmentConnections: string;
    /** @settingKey Omega.Homebanking.ResetConfig */
    homeBankingResetConfigUrl: string;
    /** @settingKey Omega.User.DaysUntilPasswordExpires */
    daysUntilPasswordExpires: number;
    /** @settingKey Omega.User.MaxLoginRetryCount */
    maxLoginRetryCount: number;
    /** @settingKey Omega.User.MonthsToRestrictPasswordReuse */
    monthsToRestrictPasswordReuse: number;
    /** @settingKey Omega.User.OmegaBaseUrl */
    omegaBaseUrl: string;
    feature: [Feature](../../../Feature.md);
    documentArchitectSso: DocumentArchitectSso;
}
