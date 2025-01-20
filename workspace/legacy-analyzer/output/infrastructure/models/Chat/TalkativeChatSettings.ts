// Generated imports
import { Authentication } from '../Authentication';

export interface TalkativeChatSettings {
    mobileConfigurations: Authentication;
    /** @settingKey Chat.Talkative.Enabled */
    enabled: boolean;
    /** @settingKey Chat.Talkative.MinVersion */
    minVersion: number;
    /** @settingKey Chat.Talkative.MinIosVersion */
    minIosVersion: string;
    /** @settingKey Chat.Talkative.MinAndroidVersion */
    minAndroidVersion: string;
    /** @settingKey Chat.Talkative.MenuItemEnabled */
    menuItemEnabled: boolean;
    /** @settingKey Chat.Talkative.Url */
    url: string;
    /** @settingKey Chat.Talkative.HelpOptionEnabled */
    helpOptionEnabled: boolean;
    /** @settingKey Chat.Talkative.Javascript */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Javascript to inject onto page. Provided by Talkative.
     * /// /// </summary>
     * /// </summary>
     */
    javascript: string;
}
