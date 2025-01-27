import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Authentication } from '@infrastructure/MobileConfigurations.Authentication.Authentication';
export interface GliaSettingsConfig {
    Authentication: Authentication;
    Enabled: boolean;
    MinVersion: number;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Javascript: string;
    MemberProperties: string[];
    ChatIconEnabled: boolean;
    HelpChatEnabled: boolean;
    ScreenShareEnabled: boolean;
    Username: string;
    ApiKey: string;
    ApiToken: string;
    ApplicationToken: string;
    SiteId: string;
    PastChatHistoryToDisplayInHours: number;
    MobileQueueName: string;
}

export class GliaSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'GliaSettings'
    };


            private _authentication: Authentication;
            get authentication(): Authentication {
                return this._authentication;
            }
            set authentication(value: Authentication) {
                this._authentication = value;
            }

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

            private _minimumAndroidVersion: string;
            get minimumAndroidVersion(): string {
                return this._minimumAndroidVersion;
            }
            set minimumAndroidVersion(value: string) {
                this._minimumAndroidVersion = value;
            }

            private _minimumIosVersion: string;
            get minimumIosVersion(): string {
                return this._minimumIosVersion;
            }
            set minimumIosVersion(value: string) {
                this._minimumIosVersion = value;
            }

            private _javascript: string;
            get javascript(): string {
                return this._javascript;
            }
            set javascript(value: string) {
                this._javascript = value;
            }

            private _memberProperties: string[];
            get memberProperties(): string[] {
                return this._memberProperties;
            }
            set memberProperties(value: string[]) {
                this._memberProperties = value;
            }

            private _chatIconEnabled: boolean;
            get chatIconEnabled(): boolean {
                return this._chatIconEnabled;
            }
            set chatIconEnabled(value: boolean) {
                this._chatIconEnabled = value;
            }

            private _helpChatEnabled: boolean;
            get helpChatEnabled(): boolean {
                return this._helpChatEnabled;
            }
            set helpChatEnabled(value: boolean) {
                this._helpChatEnabled = value;
            }

            private _screenShareEnabled: boolean;
            get screenShareEnabled(): boolean {
                return this._screenShareEnabled;
            }
            set screenShareEnabled(value: boolean) {
                this._screenShareEnabled = value;
            }

            private _username: string;
            get username(): string {
                return this._username;
            }
            set username(value: string) {
                this._username = value;
            }

            private _apiKey: string;
            get apiKey(): string {
                return this._apiKey;
            }
            set apiKey(value: string) {
                this._apiKey = value;
            }

            private _apiToken: string;
            get apiToken(): string {
                return this._apiToken;
            }
            set apiToken(value: string) {
                this._apiToken = value;
            }

            private _applicationToken: string;
            get applicationToken(): string {
                return this._applicationToken;
            }
            set applicationToken(value: string) {
                this._applicationToken = value;
            }

            private _siteId: string;
            get siteId(): string {
                return this._siteId;
            }
            set siteId(value: string) {
                this._siteId = value;
            }

            private _pastChatHistoryToDisplayInHours: number;
            get pastChatHistoryToDisplayInHours(): number {
                return this._pastChatHistoryToDisplayInHours;
            }
            set pastChatHistoryToDisplayInHours(value: number) {
                this._pastChatHistoryToDisplayInHours = value;
            }

            private _mobileQueueName: string;
            get mobileQueueName(): string {
                return this._mobileQueueName;
            }
            set mobileQueueName(value: string) {
                this._mobileQueueName = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "GliaSettings.Authentication", value: this._authentication, dataType: 'mobileconfigurations.authentication.authentication', label: "Authentication" },
                { key: "GliaSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "GliaSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "GliaSettings.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "GliaSettings.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "GliaSettings.Javascript", value: this._javascript, dataType: 'string', label: "Javascript" },
                { key: "GliaSettings.MemberProperties", value: this._memberProperties, dataType: 'list<string>', label: "Member Properties" },
                { key: "GliaSettings.ChatIconEnabled", value: this._chatIconEnabled, dataType: 'boolean', label: "Chat Icon Enabled" },
                { key: "GliaSettings.HelpChatEnabled", value: this._helpChatEnabled, dataType: 'boolean', label: "Help Chat Enabled" },
                { key: "GliaSettings.ScreenShareEnabled", value: this._screenShareEnabled, dataType: 'boolean', label: "Screen Share Enabled" },
                { key: "GliaSettings.Username", value: this._username, dataType: 'string', label: "Username" },
                { key: "GliaSettings.ApiKey", value: this._apiKey, dataType: 'string', label: "Api Key" },
                { key: "GliaSettings.ApiToken", value: this._apiToken, dataType: 'string', label: "Api Token" },
                { key: "GliaSettings.ApplicationToken", value: this._applicationToken, dataType: 'string', label: "Application Token" },
                { key: "GliaSettings.SiteId", value: this._siteId, dataType: 'string', label: "Site Id" },
                { key: "GliaSettings.PastChatHistoryToDisplayInHours", value: this._pastChatHistoryToDisplayInHours, dataType: 'number', label: "Past Chat History To Display In Hours" },
                { key: "GliaSettings.MobileQueueName", value: this._mobileQueueName, dataType: 'string', label: "Mobile Queue Name" },
            ];
        }

}