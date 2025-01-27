import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface PscuLogFileTransformServiceSettingsConfig {
    Filters: string;
    InputFileFields: string;
    OutputFileFields: string;
    PathConfiguration: string;
}

export class PscuLogFileTransformServiceSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PscuLogFileTransformServiceSettings'
    };


            private _filters: string;
            get filters(): string {
                return this._filters;
            }
            set filters(value: string) {
                this._filters = value;
            }

            private _inputFileFields: string;
            get inputFileFields(): string {
                return this._inputFileFields;
            }
            set inputFileFields(value: string) {
                this._inputFileFields = value;
            }

            private _outputFileFields: string;
            get outputFileFields(): string {
                return this._outputFileFields;
            }
            set outputFileFields(value: string) {
                this._outputFileFields = value;
            }

            private _pathConfiguration: string;
            get pathConfiguration(): string {
                return this._pathConfiguration;
            }
            set pathConfiguration(value: string) {
                this._pathConfiguration = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "PscuLogFileTransformServiceSettings.Filters", value: this._filters, dataType: 'string', label: "Filters" },
                { key: "PscuLogFileTransformServiceSettings.InputFileFields", value: this._inputFileFields, dataType: 'string', label: "Input File Fields" },
                { key: "PscuLogFileTransformServiceSettings.OutputFileFields", value: this._outputFileFields, dataType: 'string', label: "Output File Fields" },
                { key: "PscuLogFileTransformServiceSettings.PathConfiguration", value: this._pathConfiguration, dataType: 'string', label: "Path Configuration" },
            ];
        }

}
