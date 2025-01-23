import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface StopPaymentConfig {
    ShowStopPaymentReason: boolean;
    ShowTimeOnConfirmationScreen: boolean;
    StopPayRequireAmountField: boolean;
    StopPayEnableAmountField: boolean;
}

export class StopPayment implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'StopPayment'
    };


            private _showStopPaymentReason: boolean;
            get showStopPaymentReason(): boolean {
                return this._showStopPaymentReason;
            }
            set showStopPaymentReason(value: boolean) {
                this._showStopPaymentReason = value;
            }

            private _showTimeOnConfirmationScreen: boolean;
            get showTimeOnConfirmationScreen(): boolean {
                return this._showTimeOnConfirmationScreen;
            }
            set showTimeOnConfirmationScreen(value: boolean) {
                this._showTimeOnConfirmationScreen = value;
            }

            private _stopPayRequireAmountField: boolean;
            get stopPayRequireAmountField(): boolean {
                return this._stopPayRequireAmountField;
            }
            set stopPayRequireAmountField(value: boolean) {
                this._stopPayRequireAmountField = value;
            }

            private _stopPayEnableAmountField: boolean;
            get stopPayEnableAmountField(): boolean {
                return this._stopPayEnableAmountField;
            }
            set stopPayEnableAmountField(value: boolean) {
                this._stopPayEnableAmountField = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "StopPayment.ShowStopPaymentReason", value: this._showStopPaymentReason, dataType: 'boolean', label: "Show Stop Payment Reason" },
                { key: "StopPayment.ShowTimeOnConfirmationScreen", value: this._showTimeOnConfirmationScreen, dataType: 'boolean', label: "Show Time On Confirmation Screen" },
                { key: "StopPayment.StopPayRequireAmountField", value: this._stopPayRequireAmountField, dataType: 'boolean', label: "Stop Pay Require Amount Field" },
                { key: "StopPayment.StopPayEnableAmountField", value: this._stopPayEnableAmountField, dataType: 'boolean', label: "Stop Pay Enable Amount Field" },
            ];
        }

}