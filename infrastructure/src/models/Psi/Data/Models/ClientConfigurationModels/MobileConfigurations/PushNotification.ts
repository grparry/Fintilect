import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface PushNotificationConfig {
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    AvailableDeepLinks: Record<string, string>;
}

export class PushNotification implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PushNotification'
    };


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

            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _availableDeepLinks: Record<string, string>;
            get availableDeepLinks(): Record<string, string> {
                return this._availableDeepLinks;
            }
            set availableDeepLinks(value: Record<string, string>) {
                this._availableDeepLinks = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "PushNotification.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "PushNotification.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "PushNotification.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "PushNotification.AvailableDeepLinks", value: this._availableDeepLinks, dataType: 'record<string, string>', label: "Available Deep Links" },
            ];
        }

}