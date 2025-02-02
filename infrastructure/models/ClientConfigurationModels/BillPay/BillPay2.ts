import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface BillPay2Config {
    Enabled: boolean;
    MinimumVersion: number;
    MaximumPaymentAmountInDollars: number;
    BillPayeeNameRegex: string;
    CustomHelpEnabled: boolean;
    InactivePayeesEnabled: boolean;
    ShouldShowPayeePaymentType: boolean;
}

export class BillPay2 implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'BillPay2'
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

            private _maximumPaymentAmountInDollars: number;
            get maximumPaymentAmountInDollars(): number {
                return this._maximumPaymentAmountInDollars;
            }
            set maximumPaymentAmountInDollars(value: number) {
                this._maximumPaymentAmountInDollars = value;
            }

            private _billPayeeNameRegex: string;
            get billPayeeNameRegex(): string {
                return this._billPayeeNameRegex;
            }
            set billPayeeNameRegex(value: string) {
                this._billPayeeNameRegex = value;
            }

            private _customHelpEnabled: boolean;
            get customHelpEnabled(): boolean {
                return this._customHelpEnabled;
            }
            set customHelpEnabled(value: boolean) {
                this._customHelpEnabled = value;
            }

            private _inactivePayeesEnabled: boolean;
            get inactivePayeesEnabled(): boolean {
                return this._inactivePayeesEnabled;
            }
            set inactivePayeesEnabled(value: boolean) {
                this._inactivePayeesEnabled = value;
            }

            private _shouldShowPayeePaymentType: boolean;
            get shouldShowPayeePaymentType(): boolean {
                return this._shouldShowPayeePaymentType;
            }
            set shouldShowPayeePaymentType(value: boolean) {
                this._shouldShowPayeePaymentType = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "BillPay2.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "BillPay2.MinimumVersion", value: this._minimumVersion, dataType: 'number', label: "Minimum Version" },
                { key: "BillPay2.MaximumPaymentAmountInDollars", value: this._maximumPaymentAmountInDollars, dataType: 'number', label: "Maximum Payment Amount In Dollars" },
                { key: "BillPay2.BillPayeeNameRegex", value: this._billPayeeNameRegex, dataType: 'string', label: "Bill Payee Name Regex" },
                { key: "BillPay2.CustomHelpEnabled", value: this._customHelpEnabled, dataType: 'boolean', label: "Custom Help Enabled" },
                { key: "BillPay2.InactivePayeesEnabled", value: this._inactivePayeesEnabled, dataType: 'boolean', label: "Inactive Payees Enabled" },
                { key: "BillPay2.ShouldShowPayeePaymentType", value: this._shouldShowPayeePaymentType, dataType: 'boolean', label: "Should Show Payee Payment Type" },
            ];
        }

}