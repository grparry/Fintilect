import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface LostOrStolenCardSettingsConfig {
    Enabled: boolean;
    SendSecureMessageEnabled: boolean;
    EligibleCardTypes: string[];
    Locations: string[];
}

export class LostOrStolenCardSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'LostOrStolenCardSettings'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _sendSecureMessageEnabled: boolean;
            get sendSecureMessageEnabled(): boolean {
                return this._sendSecureMessageEnabled;
            }
            set sendSecureMessageEnabled(value: boolean) {
                this._sendSecureMessageEnabled = value;
            }

            private _eligibleCardTypes: string[];
            get eligibleCardTypes(): string[] {
                return this._eligibleCardTypes;
            }
            set eligibleCardTypes(value: string[]) {
                this._eligibleCardTypes = value;
            }

            private _locations: string[];
            get locations(): string[] {
                return this._locations;
            }
            set locations(value: string[]) {
                this._locations = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "LostOrStolenCardSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "LostOrStolenCardSettings.SendSecureMessageEnabled", value: this._sendSecureMessageEnabled, dataType: 'boolean', label: "Send Secure Message Enabled" },
                { key: "LostOrStolenCardSettings.EligibleCardTypes", value: this._eligibleCardTypes, dataType: 'list<string>', label: "Eligible Card Types" },
                { key: "LostOrStolenCardSettings.Locations", value: this._locations, dataType: 'list<string>', label: "Locations" },
            ];
        }

}