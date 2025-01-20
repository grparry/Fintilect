// Generated imports
import { DeployedThemes } from '../DeployedThemes';
import { BrowserThemes } from '../BrowserThemes';

export interface ConnectNative {
    /** @settingKey Themes.ConnectNative.Enabled */
    enabled: boolean;
    /** @settingKey Themes.ConnectNative.MinVersion */
    minVersion: number;
    /** @settingKey Themes.ConnectNative.DeployedThemes */
    list: DeployedThemes;
    /** @settingKey Themes.ConnectNative.UseVersionBundles */
    useVersionBundles: boolean;
    /** @settingKey Themes.ConnectNative.BrowserThemes */
    list: BrowserThemes;
    /** @settingKey Themes.ConnectNative.UseRelativeSitePathForThemesFiles */
    useRelativeSitePathForThemesFiles: boolean;
    /** @settingKey Themes.ConnectNative.ThemesFilesPath */
    themesFilesPath: string;
    /** @settingKey Themes.ConnectNative.BaseThemeSubThemesFilesPath */
    baseThemeSubThemesFilesPath: string;
    /** @settingKey Themes.ConnectNative.CoreAttributeTheme.MemoNumber */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// The field on the core where the credit union may set a default Connect Native theme name for a user
     * /// /// </summary>
     * /// </summary>
     */
    coreAttributeThemeMemoNumber: string;
    deployedThemesWithTitles: string;
    browserThemesWithTitles: string;
}
