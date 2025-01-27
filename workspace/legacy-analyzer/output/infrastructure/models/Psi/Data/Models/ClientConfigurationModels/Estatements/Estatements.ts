import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { EplEstatements } from '@infrastructure/EplEstatements';
import { DoximEstatements } from '@infrastructure/DoximEstatements';
import { BitEstatements } from '@infrastructure/BitEstatements';
import { NcpEstatements } from '@infrastructure/NcpEstatements';
import { InfoImageEstatementsSettings } from '@infrastructure/InfoImageEstatementsSettings';
import { WebApiEstatementsSettings } from '@infrastructure/WebApiEstatementsSettings';
export interface EstatementsConfig {
    Enabled: boolean;
    MinVersion: number;
    RedirectStatementsAndNoticesToEstatementsPageAndReturn: boolean;
    OpenInNewWindow: boolean;
    WillOpenInNewWindowOnMobileDevices: boolean;
    WillOpenInIFrameInMobileApp: boolean;
    DisclosureUrl: string;
    ShouldShowAllStatementAccountsOrgs: boolean;
    IgnoreDisclosure: string;
    DefaultSearchRange: number;
    ShouldShowEstatementsWhenMemberHasInquireRightsOnAllShares: boolean;
    UseBITFormPostOnIFrame: boolean;
    CheckCoreAccountAccessEnabled: boolean;
    EplEstatements: EplEstatements;
    DoximEstatements: DoximEstatements;
    BitEstatements: BitEstatements;
    NcpEstatements: NcpEstatements;
    InfoImageEstatements: InfoImageEstatementsSettings;
    WebApiEstatements: WebApiEstatementsSettings;
}

export class Estatements implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Estatements'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _redirectStatementsAndNoticesToEstatementsPageAndReturn: boolean;
            get redirectStatementsAndNoticesToEstatementsPageAndReturn(): boolean {
                return this._redirectStatementsAndNoticesToEstatementsPageAndReturn;
            }
            set redirectStatementsAndNoticesToEstatementsPageAndReturn(value: boolean) {
                this._redirectStatementsAndNoticesToEstatementsPageAndReturn = value;
            }

            private _openInNewWindow: boolean;
            get openInNewWindow(): boolean {
                return this._openInNewWindow;
            }
            set openInNewWindow(value: boolean) {
                this._openInNewWindow = value;
            }

            private _willOpenInNewWindowOnMobileDevices: boolean;
            get willOpenInNewWindowOnMobileDevices(): boolean {
                return this._willOpenInNewWindowOnMobileDevices;
            }
            set willOpenInNewWindowOnMobileDevices(value: boolean) {
                this._willOpenInNewWindowOnMobileDevices = value;
            }

            private _willOpenInIFrameInMobileApp: boolean;
            get willOpenInIFrameInMobileApp(): boolean {
                return this._willOpenInIFrameInMobileApp;
            }
            set willOpenInIFrameInMobileApp(value: boolean) {
                this._willOpenInIFrameInMobileApp = value;
            }

            private _disclosureUrl: string;
            get disclosureUrl(): string {
                return this._disclosureUrl;
            }
            set disclosureUrl(value: string) {
                this._disclosureUrl = value;
            }

            private _shouldShowAllStatementAccountsOrgs: boolean;
            get shouldShowAllStatementAccountsOrgs(): boolean {
                return this._shouldShowAllStatementAccountsOrgs;
            }
            set shouldShowAllStatementAccountsOrgs(value: boolean) {
                this._shouldShowAllStatementAccountsOrgs = value;
            }

            private _ignoreDisclosure: string;
            get ignoreDisclosure(): string {
                return this._ignoreDisclosure;
            }
            set ignoreDisclosure(value: string) {
                this._ignoreDisclosure = value;
            }

            private _defaultSearchRange: number;
            get defaultSearchRange(): number {
                return this._defaultSearchRange;
            }
            set defaultSearchRange(value: number) {
                this._defaultSearchRange = value;
            }

            private _shouldShowEstatementsWhenMemberHasInquireRightsOnAllShares: boolean;
            get shouldShowEstatementsWhenMemberHasInquireRightsOnAllShares(): boolean {
                return this._shouldShowEstatementsWhenMemberHasInquireRightsOnAllShares;
            }
            set shouldShowEstatementsWhenMemberHasInquireRightsOnAllShares(value: boolean) {
                this._shouldShowEstatementsWhenMemberHasInquireRightsOnAllShares = value;
            }

            private _useBITFormPostOnIFrame: boolean;
            get useBITFormPostOnIFrame(): boolean {
                return this._useBITFormPostOnIFrame;
            }
            set useBITFormPostOnIFrame(value: boolean) {
                this._useBITFormPostOnIFrame = value;
            }

            private _checkCoreAccountAccessEnabled: boolean;
            get checkCoreAccountAccessEnabled(): boolean {
                return this._checkCoreAccountAccessEnabled;
            }
            set checkCoreAccountAccessEnabled(value: boolean) {
                this._checkCoreAccountAccessEnabled = value;
            }

            private _eplEstatements: EplEstatements;
            get eplEstatements(): EplEstatements {
                return this._eplEstatements;
            }
            set eplEstatements(value: EplEstatements) {
                this._eplEstatements = value;
            }

            private _doximEstatements: DoximEstatements;
            get doximEstatements(): DoximEstatements {
                return this._doximEstatements;
            }
            set doximEstatements(value: DoximEstatements) {
                this._doximEstatements = value;
            }

            private _bitEstatements: BitEstatements;
            get bitEstatements(): BitEstatements {
                return this._bitEstatements;
            }
            set bitEstatements(value: BitEstatements) {
                this._bitEstatements = value;
            }

            private _ncpEstatements: NcpEstatements;
            get ncpEstatements(): NcpEstatements {
                return this._ncpEstatements;
            }
            set ncpEstatements(value: NcpEstatements) {
                this._ncpEstatements = value;
            }

            private _infoImageEstatements: InfoImageEstatementsSettings;
            get infoImageEstatements(): InfoImageEstatementsSettings {
                return this._infoImageEstatements;
            }
            set infoImageEstatements(value: InfoImageEstatementsSettings) {
                this._infoImageEstatements = value;
            }

            private _webApiEstatements: WebApiEstatementsSettings;
            get webApiEstatements(): WebApiEstatementsSettings {
                return this._webApiEstatements;
            }
            set webApiEstatements(value: WebApiEstatementsSettings) {
                this._webApiEstatements = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Estatements.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "Estatements.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "Estatements.RedirectStatementsAndNoticesToEstatementsPageAndReturn", value: this._redirectStatementsAndNoticesToEstatementsPageAndReturn, dataType: 'boolean', label: "Redirect Statements And Notices To Estatements Page And Return" },
                { key: "Estatements.OpenInNewWindow", value: this._openInNewWindow, dataType: 'boolean', label: "Open In New Window" },
                { key: "Estatements.WillOpenInNewWindowOnMobileDevices", value: this._willOpenInNewWindowOnMobileDevices, dataType: 'boolean', label: "Will Open In New Window On Mobile Devices" },
                { key: "Estatements.WillOpenInIFrameInMobileApp", value: this._willOpenInIFrameInMobileApp, dataType: 'boolean', label: "Will Open In I Frame In Mobile App" },
                { key: "Estatements.DisclosureUrl", value: this._disclosureUrl, dataType: 'string', label: "Disclosure Url" },
                { key: "Estatements.ShouldShowAllStatementAccountsOrgs", value: this._shouldShowAllStatementAccountsOrgs, dataType: 'boolean', label: "Should Show All Statement Accounts Orgs" },
                { key: "Estatements.IgnoreDisclosure", value: this._ignoreDisclosure, dataType: 'string', label: "Ignore Disclosure" },
                { key: "Estatements.DefaultSearchRange", value: this._defaultSearchRange, dataType: 'number', label: "Default Search Range" },
                { key: "Estatements.ShouldShowEstatementsWhenMemberHasInquireRightsOnAllShares", value: this._shouldShowEstatementsWhenMemberHasInquireRightsOnAllShares, dataType: 'boolean', label: "Should Show Estatements When Member Has Inquire Rights On All Shares" },
                { key: "Estatements.UseBITFormPostOnIFrame", value: this._useBITFormPostOnIFrame, dataType: 'boolean', label: "Use B I T Form Post On I Frame" },
                { key: "Estatements.CheckCoreAccountAccessEnabled", value: this._checkCoreAccountAccessEnabled, dataType: 'boolean', label: "Check Core Account Access Enabled" },
                { key: "Estatements.EplEstatements", value: this._eplEstatements, dataType: 'eplestatements', label: "Epl Estatements" },
                { key: "Estatements.DoximEstatements", value: this._doximEstatements, dataType: 'doximestatements', label: "Doxim Estatements" },
                { key: "Estatements.BitEstatements", value: this._bitEstatements, dataType: 'bitestatements', label: "Bit Estatements" },
                { key: "Estatements.NcpEstatements", value: this._ncpEstatements, dataType: 'ncpestatements', label: "Ncp Estatements" },
                { key: "Estatements.InfoImageEstatements", value: this._infoImageEstatements, dataType: 'infoimageestatementssettings', label: "Info Image Estatements" },
                { key: "Estatements.WebApiEstatements", value: this._webApiEstatements, dataType: 'webapiestatementssettings', label: "Web Api Estatements" },
            ];
        }

}