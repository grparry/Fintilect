import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface WireTransferConfig {
    RoutingNumberRegex: string;
    AddressRegex: string;
    RecipientNameRegex: string;
    HideAvailableBalance: boolean;
    SignatureRegex: string;
}

export class WireTransfer implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'WireTransfer'
    };


            private _routingNumberRegex: string;
            get routingNumberRegex(): string {
                return this._routingNumberRegex;
            }
            set routingNumberRegex(value: string) {
                this._routingNumberRegex = value;
            }

            private _addressRegex: string;
            get addressRegex(): string {
                return this._addressRegex;
            }
            set addressRegex(value: string) {
                this._addressRegex = value;
            }

            private _recipientNameRegex: string;
            get recipientNameRegex(): string {
                return this._recipientNameRegex;
            }
            set recipientNameRegex(value: string) {
                this._recipientNameRegex = value;
            }

            private _hideAvailableBalance: boolean;
            get hideAvailableBalance(): boolean {
                return this._hideAvailableBalance;
            }
            set hideAvailableBalance(value: boolean) {
                this._hideAvailableBalance = value;
            }

            private _signatureRegex: string;
            get signatureRegex(): string {
                return this._signatureRegex;
            }
            set signatureRegex(value: string) {
                this._signatureRegex = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "WireTransfer.RoutingNumberRegex", value: this._routingNumberRegex, dataType: 'string', label: "Routing Number Regex" },
                { key: "WireTransfer.AddressRegex", value: this._addressRegex, dataType: 'string', label: "Address Regex" },
                { key: "WireTransfer.RecipientNameRegex", value: this._recipientNameRegex, dataType: 'string', label: "Recipient Name Regex" },
                { key: "WireTransfer.HideAvailableBalance", value: this._hideAvailableBalance, dataType: 'boolean', label: "Hide Available Balance" },
                { key: "WireTransfer.SignatureRegex", value: this._signatureRegex, dataType: 'string', label: "Signature Regex" },
            ];
        }

}