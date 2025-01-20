// Generated imports
import { Authentication } from '../Authentication';
import { MemberProperties } from '../MemberProperties';

export interface GliaSettings {
    mobileConfigurations: Authentication;
    /** @settingKey Chat.Glia.Enabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Enabled setting
     * /// /// </summary>
     * /// </summary>
     */
    enabled: boolean;
    /** @settingKey Chat.Glia.MinVersion */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Minimum Version to run
     * /// /// </summary>
     * /// </summary>
     */
    minVersion: number;
    /** @settingKey Chat.Glia.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Chat.Glia.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Chat.Glia.Javascript */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Javascript to inject onto page. Provided by Glia.
     * /// /// </summary>
     * /// </summary>
     */
    javascript: string;
    /** @settingKey Chat.Glia.MemberProperties */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Properties to inject into javascript. comma separated list ie: 'Phone,Email,Name'
     * /// /// </summary>
     * /// </summary>
     */
    list: MemberProperties;
    /** @settingKey Chat.Glia.ChatIconEnabled */
    chatIconEnabled: boolean;
    /** @settingKey Chat.Glia.HelpChatEnabled */
    helpChatEnabled: boolean;
    /** @settingKey Chat.Glia.ScreenShareEnabled */
    screenShareEnabled: boolean;
    /** @settingKey Chat.Glia.Username */
    username: string;
    /** @settingKey Chat.Glia.ApiKey */
    apiKey: string;
    /** @settingKey Chat.Glia.ApiToken */
    apiToken: string;
    /** @settingKey Chat.Glia.ApplicationToken */
    applicationToken: string;
    /** @settingKey Chat.Glia.SiteId */
    siteId: string;
    /** @settingKey Chat.Glia.PastChatHistoryToDisplayInHours */
    pastChatHistoryToDisplayInHours: number;
    /** @settingKey Chat.Glia.MobileQueueName */
    mobileQueueName: string;
}
