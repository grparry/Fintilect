import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface LiveChatSettingsConfig {
    LiveChatEnabled: boolean;
    MinVersion: number;
    LiveChatUrl: string;
    StartLiveChatUrl: string;
    LiveChatServiceId: string;
}

export class LiveChatSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'LiveChatSettings'
    };


            private _liveChatEnabled: boolean;
            get liveChatEnabled(): boolean {
                return this._liveChatEnabled;
            }
            set liveChatEnabled(value: boolean) {
                this._liveChatEnabled = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _liveChatUrl: string;
            get liveChatUrl(): string {
                return this._liveChatUrl;
            }
            set liveChatUrl(value: string) {
                this._liveChatUrl = value;
            }

            private _startLiveChatUrl: string;
            get startLiveChatUrl(): string {
                return this._startLiveChatUrl;
            }
            set startLiveChatUrl(value: string) {
                this._startLiveChatUrl = value;
            }

            private _liveChatServiceId: string;
            get liveChatServiceId(): string {
                return this._liveChatServiceId;
            }
            set liveChatServiceId(value: string) {
                this._liveChatServiceId = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "LiveChatSettings.LiveChatEnabled", value: this._liveChatEnabled, dataType: 'boolean', label: "Live Chat Enabled" },
                { key: "LiveChatSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "LiveChatSettings.LiveChatUrl", value: this._liveChatUrl, dataType: 'string', label: "Live Chat Url" },
                { key: "LiveChatSettings.StartLiveChatUrl", value: this._startLiveChatUrl, dataType: 'string', label: "Start Live Chat Url" },
                { key: "LiveChatSettings.LiveChatServiceId", value: this._liveChatServiceId, dataType: 'string', label: "Live Chat Service Id" },
            ];
        }

}