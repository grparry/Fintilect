import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface OutOfBandConfig {
    Enabled: boolean;
    MinimumVersion: number;
    RequireWhenAddingPayee: boolean;
    RequireWhenUpdatingPayee: boolean;
    RequireWhenMakingLargePayment: boolean;
    LargePaymentThreshold: number;
    RequireWhenAddingFundingAccount: boolean;
    RequireWhenUpdatingFundingAccount: boolean;
}

export class OutOfBand implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'OutOfBand'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _minimumVersion: number;
            get minimumVersion(): number {
                return this._minimumVersion;
            }
            set minimumVersion(value: number) {
                this._minimumVersion = value;
            }

            private _requireWhenAddingPayee: boolean;
            get requireWhenAddingPayee(): boolean {
                return this._requireWhenAddingPayee;
            }
            set requireWhenAddingPayee(value: boolean) {
                this._requireWhenAddingPayee = value;
            }

            private _requireWhenUpdatingPayee: boolean;
            get requireWhenUpdatingPayee(): boolean {
                return this._requireWhenUpdatingPayee;
            }
            set requireWhenUpdatingPayee(value: boolean) {
                this._requireWhenUpdatingPayee = value;
            }

            private _requireWhenMakingLargePayment: boolean;
            get requireWhenMakingLargePayment(): boolean {
                return this._requireWhenMakingLargePayment;
            }
            set requireWhenMakingLargePayment(value: boolean) {
                this._requireWhenMakingLargePayment = value;
            }

            private _largePaymentThreshold: number;
            get largePaymentThreshold(): number {
                return this._largePaymentThreshold;
            }
            set largePaymentThreshold(value: number) {
                this._largePaymentThreshold = value;
            }

            private _requireWhenAddingFundingAccount: boolean;
            get requireWhenAddingFundingAccount(): boolean {
                return this._requireWhenAddingFundingAccount;
            }
            set requireWhenAddingFundingAccount(value: boolean) {
                this._requireWhenAddingFundingAccount = value;
            }

            private _requireWhenUpdatingFundingAccount: boolean;
            get requireWhenUpdatingFundingAccount(): boolean {
                return this._requireWhenUpdatingFundingAccount;
            }
            set requireWhenUpdatingFundingAccount(value: boolean) {
                this._requireWhenUpdatingFundingAccount = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "OutOfBand.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "OutOfBand.MinimumVersion", value: this._minimumVersion, dataType: 'number', label: "Minimum Version" },
                { key: "OutOfBand.RequireWhenAddingPayee", value: this._requireWhenAddingPayee, dataType: 'boolean', label: "Require When Adding Payee" },
                { key: "OutOfBand.RequireWhenUpdatingPayee", value: this._requireWhenUpdatingPayee, dataType: 'boolean', label: "Require When Updating Payee" },
                { key: "OutOfBand.RequireWhenMakingLargePayment", value: this._requireWhenMakingLargePayment, dataType: 'boolean', label: "Require When Making Large Payment" },
                { key: "OutOfBand.LargePaymentThreshold", value: this._largePaymentThreshold, dataType: 'number', label: "Large Payment Threshold" },
                { key: "OutOfBand.RequireWhenAddingFundingAccount", value: this._requireWhenAddingFundingAccount, dataType: 'boolean', label: "Require When Adding Funding Account" },
                { key: "OutOfBand.RequireWhenUpdatingFundingAccount", value: this._requireWhenUpdatingFundingAccount, dataType: 'boolean', label: "Require When Updating Funding Account" },
            ];
        }

}