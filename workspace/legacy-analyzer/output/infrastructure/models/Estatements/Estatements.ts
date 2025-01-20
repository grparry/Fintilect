// Generated imports
import { EplEstatements } from './EplEstatements';
import { DoximEstatements } from './DoximEstatements';
import { BitEstatements } from './BitEstatements';
import { NcpEstatements } from '../NcpEstatements';
import { InfoImageEstatementsSettings } from '../InfoImageEstatementsSettings';
import { WebApiEstatementsSettings } from '../WebApiEstatementsSettings';

export interface Estatements {
    /** @settingKey Estatements.EstatementsEnabled */
    enabled: boolean;
    /** @settingKey Estatements.MinVersion */
    minVersion: number;
    /** @settingKey Estatements.RedirectStatementsAndNoticesToEstatementsPageAndReturn */
    redirectStatementsAndNoticesToEstatementsPageAndReturn: boolean;
    /** @settingKey Estatements.OpenInNewWindow */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// When this setting is on, the Estatements page will pop up in a new window rather than be loaded
     * /// /// in an iFrame.  This will apply to Mobile devices in mobile web as well
     * /// /// as desktops in web, but not the mobile app.
     * /// /// </summary>
     * /// </summary>
     */
    openInNewWindow: boolean;
    /** @settingKey Estatements.WillOpenInNewWindowOnMobileDevices */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// When this setting is on, the eStatements page will pop up in a new window rather than be loaded
     * /// /// in an iFrame.  This will apply to Mobile web, but not the mobile app, nor desktop web
     * /// /// If eStatements.OpenInNewWindow is turned on,
     * /// /// EStatements will open in a new window in all cases but the mobile app, and this setting will effectively be ignored.
     * /// /// </summary>
     * /// </summary>
     */
    willOpenInNewWindowOnMobileDevices: boolean;
    /** @settingKey Estatements.WillOpenInIFrameInMobileApp */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If this setting is true, third party eStatements will open in target = _self rather than in an iFrame.  For BIT Statements, setting this to false helps with problems
     * /// /// in iOS with displaying eStatements in the mobile app.  By default, this setting will be set to true by default, even if the config setting has not been
     * /// /// added to  the meta database.
     * /// /// </summary>
     * /// </summary>
     */
    willOpenInIFrameInMobileApp: boolean;
    /** @settingKey Estatements.DisclosureUrl */
    disclosureUrl: string;
    /** @settingKey Estatements.ShouldShowAllStatementAccountsOrgs */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, estatements will be visible for organizations as well, and not just when the currently logged in user is the owner.
     * /// /// </summary>
     * /// </summary>
     */
    shouldShowAllStatementAccountsOrgs: boolean;
    /** @settingKey Estatements.IgnoreDisclosure */
    ignoreDisclosure: string;
    /** @settingKey Estatements.DefaultSearchRange */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// The Default Search Range in Days
     * /// /// </summary>
     * /// /// <remarks>returned value is negative so that we go back x day, i.e. DateTime.Now.AddDays(Estatements.DefaultSearchRange). but value in Omega will be positive</remarks>
     * /// </summary>
     */
    defaultSearchRange: number;
    /** @settingKey Estatements.ShowEstatementsWhenMemberHasInquireRightsOnAllShares */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, an owner can see statements for accounts if they have inquire access to all shares, so more than the primary owner can see the statements
     * /// /// </summary>
     * /// </summary>
     */
    shouldShowEstatementsWhenMemberHasInquireRightsOnAllShares: boolean;
    /** @settingKey Estatements.UseBITFormPostOnIFrame */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, BIT Estatements will use a form post rather than the querystring when loading the data for the IFrame.  It is recommended to use this feature as it is more secure.
     * /// /// </summary>
     * /// </summary>
     */
    useBITFormPostOnIFrame: boolean;
    /** @settingKey Estatements.CheckCoreAccountAccess.Enabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, we will check if the member has access to all sub accounts for each account we show in the estatements account selector.
     * /// /// This is only wired up for Corelation clients currently.
     * /// /// </summary>
     * /// </summary>
     */
    checkCoreAccountAccessEnabled: boolean;
    /**
     * // reference to epl estatements
     */
    eplEstatements: EplEstatements;
    /**
     * // reference to Doxim estatements
     */
    doximEstatements: DoximEstatements;
    bitEstatements: BitEstatements;
    ncpEstatements: NcpEstatements;
    infoImageEstatementsSettings: InfoImageEstatementsSettings;
    webApiEstatementsSettings: WebApiEstatementsSettings;
}
