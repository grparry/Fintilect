import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ActivationConfig {
    MaximumActivationAttempsAllowed: string;
    AndroidIosMinimumVersionsEnabled: boolean;
    OutOfWalletEnabled: boolean;
}

export class Activation implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Activation'
    };


            private _maximumActivationAttempsAllowed: string;
            get maximumActivationAttempsAllowed(): string {
                return this._maximumActivationAttempsAllowed;
            }
            set maximumActivationAttempsAllowed(value: string) {
                this._maximumActivationAttempsAllowed = value;
            }

            private _androidIosMinimumVersionsEnabled: boolean;
            get androidIosMinimumVersionsEnabled(): boolean {
                return this._androidIosMinimumVersionsEnabled;
            }
            set androidIosMinimumVersionsEnabled(value: boolean) {
                this._androidIosMinimumVersionsEnabled = value;
            }

            private _outOfWalletEnabled: boolean;
            get outOfWalletEnabled(): boolean {
                return this._outOfWalletEnabled;
            }
            set outOfWalletEnabled(value: boolean) {
                this._outOfWalletEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Activation.MaximumActivationAttempsAllowed", value: this._maximumActivationAttempsAllowed, dataType: 'string', label: "Maximum Activation Attemps Allowed" },
                { key: "Activation.AndroidIosMinimumVersionsEnabled", value: this._androidIosMinimumVersionsEnabled, dataType: 'boolean', label: "Android Ios Minimum Versions Enabled" },
                { key: "Activation.OutOfWalletEnabled", value: this._outOfWalletEnabled, dataType: 'boolean', label: "Out Of Wallet Enabled" },
            ];
        }

}