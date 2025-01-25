import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface PullCreditSettingsConfig {
    ProductValue: string;
    BureauValue: string;
    TypeSerialValue: string;
}

export class PullCreditSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PullCreditSettings'
    };


            private _productValue: string;
            get productValue(): string {
                return this._productValue;
            }
            set productValue(value: string) {
                this._productValue = value;
            }

            private _bureauValue: string;
            get bureauValue(): string {
                return this._bureauValue;
            }
            set bureauValue(value: string) {
                this._bureauValue = value;
            }

            private _typeSerialValue: string;
            get typeSerialValue(): string {
                return this._typeSerialValue;
            }
            set typeSerialValue(value: string) {
                this._typeSerialValue = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "PullCreditSettings.ProductValue", value: this._productValue, dataType: 'string', label: "Product Value" },
                { key: "PullCreditSettings.BureauValue", value: this._bureauValue, dataType: 'string', label: "Bureau Value" },
                { key: "PullCreditSettings.TypeSerialValue", value: this._typeSerialValue, dataType: 'string', label: "Type Serial Value" },
            ];
        }

}