import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface DoximEstatementsConfig {
    Enabled: boolean;
    EndpointAddress: string;
    Identifier: string;
    SecretKey: string;
}

export class DoximEstatements implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'DoximEstatements'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _endpointAddress: string;
            get endpointAddress(): string {
                return this._endpointAddress;
            }
            set endpointAddress(value: string) {
                this._endpointAddress = value;
            }

            private _identifier: string;
            get identifier(): string {
                return this._identifier;
            }
            set identifier(value: string) {
                this._identifier = value;
            }

            private _secretKey: string;
            get secretKey(): string {
                return this._secretKey;
            }
            set secretKey(value: string) {
                this._secretKey = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "DoximEstatements.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "DoximEstatements.EndpointAddress", value: this._endpointAddress, dataType: 'string', label: "Endpoint Address" },
                { key: "DoximEstatements.Identifier", value: this._identifier, dataType: 'string', label: "Identifier" },
                { key: "DoximEstatements.SecretKey", value: this._secretKey, dataType: 'string', label: "Secret Key" },
            ];
        }

}