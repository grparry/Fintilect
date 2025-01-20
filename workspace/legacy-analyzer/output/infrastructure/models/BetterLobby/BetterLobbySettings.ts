// Generated imports
import { Uri } from '../Uri';
import { Authentication } from '../Authentication';

export interface BetterLobbySettings {
    /** @settingKey BetterLobby.Enabled */
    enabled: boolean;
    /** @settingKey BetterLobby.SsoBaseUrl */
    uri: Uri;
    /** @settingKey BetterLobby.ClientId */
    clientId: string;
    /** @settingKey BetterLobby.SecretKey */
    secretKey: string;
    /** @settingKey BetterLobby.KeySize */
    keySize: number;
    /** @settingKey BetterLobby.DerivationIterations */
    derivationIterations: number;
    mobileConfigurations: Authentication;
}
