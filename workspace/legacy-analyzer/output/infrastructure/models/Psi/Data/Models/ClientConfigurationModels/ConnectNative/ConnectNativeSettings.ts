import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { ConnectNativeTransfers } from '@infrastructure/ConnectNativeTransfers';
import { ConnectNativeAccountHistory } from '@infrastructure/ConnectNativeAccountHistory';
import { ConnectNativeMenuType } from '@infrastructure/ConnectNativeMenuType';
import { RoundedCornersOptions } from '@infrastructure/RoundedCornersOptions';
export interface ConnectNativeSettingsConfig {
    ConnectNativeTransfers: ConnectNativeTransfers;
    AccountHistory: ConnectNativeAccountHistory;
    ContentContainerBackgroundColor: string;
    PanelMainBackgroundColor: string;
    SideMenu: string;
    TopMenu: string;
    MobileMenu: string;
    MenuType: ConnectNativeMenuType;
    MenuEnabled: boolean;
    TargetedMarketingMaxWidth: number;
    LogoAction: string;
    ShowBackgroundImageOnlyOnLegacyLoginScreen: boolean;
    RoundedCornersEnabled: boolean;
    RoundedCornersBorderRadiusSizesContainers: RoundedCornersOptions;
    RoundedCornersBorderRadiusSizesComponents: RoundedCornersOptions;
    MultipleDataFieldsPerLineEnabled: boolean;
    exportTypes: string;
}

export class ConnectNativeSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ConnectNativeSettings'
    };


            private _connectNativeTransfers: ConnectNativeTransfers;
            get connectNativeTransfers(): ConnectNativeTransfers {
                return this._connectNativeTransfers;
            }
            set connectNativeTransfers(value: ConnectNativeTransfers) {
                this._connectNativeTransfers = value;
            }

            private _accountHistory: ConnectNativeAccountHistory;
            get accountHistory(): ConnectNativeAccountHistory {
                return this._accountHistory;
            }
            set accountHistory(value: ConnectNativeAccountHistory) {
                this._accountHistory = value;
            }

            private _contentContainerBackgroundColor: string;
            get contentContainerBackgroundColor(): string {
                return this._contentContainerBackgroundColor;
            }
            set contentContainerBackgroundColor(value: string) {
                this._contentContainerBackgroundColor = value;
            }

            private _panelMainBackgroundColor: string;
            get panelMainBackgroundColor(): string {
                return this._panelMainBackgroundColor;
            }
            set panelMainBackgroundColor(value: string) {
                this._panelMainBackgroundColor = value;
            }

            private _sideMenu: string;
            get sideMenu(): string {
                return this._sideMenu;
            }
            set sideMenu(value: string) {
                this._sideMenu = value;
            }

            private _topMenu: string;
            get topMenu(): string {
                return this._topMenu;
            }
            set topMenu(value: string) {
                this._topMenu = value;
            }

            private _mobileMenu: string;
            get mobileMenu(): string {
                return this._mobileMenu;
            }
            set mobileMenu(value: string) {
                this._mobileMenu = value;
            }

            private _menuType: ConnectNativeMenuType;
            get menuType(): ConnectNativeMenuType {
                return this._menuType;
            }
            set menuType(value: ConnectNativeMenuType) {
                this._menuType = value;
            }

            private _menuEnabled: boolean;
            get menuEnabled(): boolean {
                return this._menuEnabled;
            }
            set menuEnabled(value: boolean) {
                this._menuEnabled = value;
            }

            private _targetedMarketingMaxWidth: number;
            get targetedMarketingMaxWidth(): number {
                return this._targetedMarketingMaxWidth;
            }
            set targetedMarketingMaxWidth(value: number) {
                this._targetedMarketingMaxWidth = value;
            }

            private _logoAction: string;
            get logoAction(): string {
                return this._logoAction;
            }
            set logoAction(value: string) {
                this._logoAction = value;
            }

            private _showBackgroundImageOnlyOnLegacyLoginScreen: boolean;
            get showBackgroundImageOnlyOnLegacyLoginScreen(): boolean {
                return this._showBackgroundImageOnlyOnLegacyLoginScreen;
            }
            set showBackgroundImageOnlyOnLegacyLoginScreen(value: boolean) {
                this._showBackgroundImageOnlyOnLegacyLoginScreen = value;
            }

            private _roundedCornersEnabled: boolean;
            get roundedCornersEnabled(): boolean {
                return this._roundedCornersEnabled;
            }
            set roundedCornersEnabled(value: boolean) {
                this._roundedCornersEnabled = value;
            }

            private _roundedCornersBorderRadiusSizesContainers: RoundedCornersOptions;
            get roundedCornersBorderRadiusSizesContainers(): RoundedCornersOptions {
                return this._roundedCornersBorderRadiusSizesContainers;
            }
            set roundedCornersBorderRadiusSizesContainers(value: RoundedCornersOptions) {
                this._roundedCornersBorderRadiusSizesContainers = value;
            }

            private _roundedCornersBorderRadiusSizesComponents: RoundedCornersOptions;
            get roundedCornersBorderRadiusSizesComponents(): RoundedCornersOptions {
                return this._roundedCornersBorderRadiusSizesComponents;
            }
            set roundedCornersBorderRadiusSizesComponents(value: RoundedCornersOptions) {
                this._roundedCornersBorderRadiusSizesComponents = value;
            }

            private _multipleDataFieldsPerLineEnabled: boolean;
            get multipleDataFieldsPerLineEnabled(): boolean {
                return this._multipleDataFieldsPerLineEnabled;
            }
            set multipleDataFieldsPerLineEnabled(value: boolean) {
                this._multipleDataFieldsPerLineEnabled = value;
            }

            private _exportTypes: string;
            get exportTypes(): string {
                return this._exportTypes;
            }
            set exportTypes(value: string) {
                this._exportTypes = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ConnectNativeSettings.ConnectNativeTransfers", value: this._connectNativeTransfers, dataType: 'connectnativetransfers', label: "Connect Native Transfers" },
                { key: "ConnectNativeSettings.AccountHistory", value: this._accountHistory, dataType: 'connectnativeaccounthistory', label: "Account History" },
                { key: "ConnectNativeSettings.ContentContainerBackgroundColor", value: this._contentContainerBackgroundColor, dataType: 'string', label: "Content Container Background Color" },
                { key: "ConnectNativeSettings.PanelMainBackgroundColor", value: this._panelMainBackgroundColor, dataType: 'string', label: "Panel Main Background Color" },
                { key: "ConnectNativeSettings.SideMenu", value: this._sideMenu, dataType: 'string', label: "Side Menu" },
                { key: "ConnectNativeSettings.TopMenu", value: this._topMenu, dataType: 'string', label: "Top Menu" },
                { key: "ConnectNativeSettings.MobileMenu", value: this._mobileMenu, dataType: 'string', label: "Mobile Menu" },
                { key: "ConnectNativeSettings.MenuType", value: this._menuType, dataType: 'connectnativemenutype', label: "Menu Type" },
                { key: "ConnectNativeSettings.MenuEnabled", value: this._menuEnabled, dataType: 'boolean', label: "Menu Enabled" },
                { key: "ConnectNativeSettings.TargetedMarketingMaxWidth", value: this._targetedMarketingMaxWidth, dataType: 'number', label: "Targeted Marketing Max Width" },
                { key: "ConnectNativeSettings.LogoAction", value: this._logoAction, dataType: 'string', label: "Logo Action" },
                { key: "ConnectNativeSettings.ShowBackgroundImageOnlyOnLegacyLoginScreen", value: this._showBackgroundImageOnlyOnLegacyLoginScreen, dataType: 'boolean', label: "Show Background Image Only On Legacy Login Screen" },
                { key: "ConnectNativeSettings.RoundedCornersEnabled", value: this._roundedCornersEnabled, dataType: 'boolean', label: "Rounded Corners Enabled" },
                { key: "ConnectNativeSettings.RoundedCornersBorderRadiusSizesContainers", value: this._roundedCornersBorderRadiusSizesContainers, dataType: 'roundedcornersoptions', label: "Rounded Corners Border Radius Sizes Containers" },
                { key: "ConnectNativeSettings.RoundedCornersBorderRadiusSizesComponents", value: this._roundedCornersBorderRadiusSizesComponents, dataType: 'roundedcornersoptions', label: "Rounded Corners Border Radius Sizes Components" },
                { key: "ConnectNativeSettings.MultipleDataFieldsPerLineEnabled", value: this._multipleDataFieldsPerLineEnabled, dataType: 'boolean', label: "Multiple Data Fields Per Line Enabled" },
                { key: "ConnectNativeSettings.exportTypes", value: this._exportTypes, dataType: 'string', label: "Export Types" },
            ];
        }

}