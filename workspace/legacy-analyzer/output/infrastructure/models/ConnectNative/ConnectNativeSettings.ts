// Generated imports
import { ConnectNativeTransfers } from '../ConnectNativeTransfers';
import { ConnectNativeAccountHistory } from './ConnectNativeAccountHistory';
import { ConnectNativeMenuType } from '../ConnectNativeMenuType';
import { RoundedCornersOptions } from '../RoundedCornersOptions';

export interface ConnectNativeSettings {
    connectNativeTransfers: ConnectNativeTransfers;
    connectNativeAccountHistory: ConnectNativeAccountHistory;
    /** @settingKey ConnectNative.Browser.ContentContainerBackgroundColor */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Value for content container's background color in iFrame. should be rgba eg: rgba(255, 255, 255, 0.5)
     * /// /// </summary>
     * /// </summary>
     */
    contentContainerBackgroundColor: string;
    /** @settingKey ConnectNative.Browser.PanelMainBackgroundColor */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Value for panel-main's background color in iFrame. should be rgba eg: rgba(255, 255, 255, 0.9)
     * /// /// </summary>
     * /// </summary>
     */
    panelMainBackgroundColor: string;
    /** @settingKey ConnectNative.Menus.SideMenu */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Connect Native Json menu object for Side Menu
     * /// /// </summary>
     * /// </summary>
     */
    sideMenu: string;
    /** @settingKey ConnectNative.Menus.TopMenu */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Connect Native Json menu object for Top Menu
     * /// /// </summary>
     * /// </summary>
     */
    topMenu: string;
    /** @settingKey ConnectNative.Menus.MobileMenu */
    mobileMenu: string;
    /** @settingKey ConnectNative.Menus.Type */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Determines connect native menu to be used
     * /// /// </summary>
     * /// </summary>
     */
    connectNativeMenuType: ConnectNativeMenuType;
    /** @settingKey ConnectNative.Menus.Enabled */
    menuEnabled: boolean;
    /** @settingKey ConnectNative.Marketing.TargetedMarketingBannerMaxWidth */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Determines max width of the targeted marketing banner
     * /// /// </summary>
     * /// </summary>
     */
    targetedMarketingMaxWidth: number;
    /** @settingKey ConnectNative.Menus.LogoAction */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Determines Logo Action
     * /// /// </summary>
     * /// </summary>
     */
    logoAction: string;
    /** @settingKey ConnectNative.Browser.ShowBackgroundImageOnlyOnLegacyLoginScreen */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Determines if a background image should only show on the login screen, and not on internal pages.
     * /// /// </summary>
     * /// </summary>
     */
    showBackgroundImageOnlyOnLegacyLoginScreen: boolean;
    /** @settingKey ConnectNative.Browser.RoundedCorners.Enabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Enables Rounded Corners feature on Connect Native browser.
     * /// /// </summary>
     * /// </summary>
     */
    roundedCornersEnabled: boolean;
    /** @settingKey ConnectNative.Browser.RoundedCorners.BorderRadiusSizes.Containers */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Size options for the border radius of containers (e.g. widgets) using the Rounded Corners feature on Connect Native browser
     * /// /// </summary>
     * /// </summary>
     */
    roundedCornersOptions: RoundedCornersOptions;
    /** @settingKey ConnectNative.Browser.RoundedCorners.BorderRadiusSizes.Components */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Size options for the border radius of components (e.g. buttons) using the Rounded Corners feature on Connect Native browser
     * /// /// </summary>
     * /// </summary>
     */
    roundedCornersOptions: RoundedCornersOptions;
    /** @settingKey ConnectNative.MultipleDataFieldsPerLine.Enabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Allows an alternate styling of transaction history line items
     * /// /// </summary>
     * /// </summary>
     */
    multipleDataFieldsPerLineEnabled: boolean;
    /** @settingKey ConnectNative.exportTypes */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Determines What Type of Files Can Export History from Transaction History Screen
     * /// /// </summary>
     * /// </summary>
     */
    exportTypes: string;
}
