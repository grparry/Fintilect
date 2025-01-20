// Generated imports
import { CardlyticsAccountTypes } from '../CardlyticsAccountTypes';

export interface CardlyticsSettings {
    /** @settingKey X.App.HomeBanking.CardlyticsEnabled */
    cardlyticsEnabled: boolean;
    /** @settingKey X.App.HBAdminBOL.CardlyticsEnabled */
    adminCardlyticsEnabled: boolean;
    /** @settingKey X.App.HomeBanking.CardlyticsAccountTypes */
    list: CardlyticsAccountTypes;
    /** @settingKey Cardlytics.Admin.ShowSuffixUpdateRowInAdmin */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, then show the 'update redemption suffix' row in the get Member view in Admin
     * /// /// </summary>
     * /// </summary>
     */
    shouldShowSuffixUpdateRowInAdmin: boolean;
    /** @settingKey Cardlytics.jQuery.Version */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Specifies the version of jQuery to use with the Cardlytics provided javascript.
     * /// /// </summary>
     * /// </summary>
     */
    jQueryVersion: string;
    /** @settingKey Cardlytics.DomInjectionVersion.Enabled */
    domInjectionVersionEnabled: boolean;
    /** @settingKey Cardlytics.DomInjectionVersion.MainScriptName */
    mainScriptName: string;
    /** @settingKey Cardlytics.DomInjectionVersion.ConfigScriptName */
    configScriptName: string;
    /** @settingKey Cardlytics.DomInjectionVersion.InitScriptName */
    initScriptName: string;
    /** @settingKey Cardlytics.DomInjectionVersion.FiFolder */
    fiFolder: string;
    /** @settingKey Cardlytics.DomInjectionVersion.OpsServerUrl */
    opsServerUrl: string;
    /** @settingKey Cardlytics.DomInjectionVersion.JQueryVersion */
    domInjectionVersionJQueryVersion: string;
    /** @settingKey Cardlytics.DomInjectionVersion.VueVersion */
    vueVersion: string;
}
