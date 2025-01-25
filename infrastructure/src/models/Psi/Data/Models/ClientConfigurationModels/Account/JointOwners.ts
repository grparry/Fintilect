import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface JointOwnersConfig {
    Enabled: boolean;
    MinVersion: number;
    ShouldShowJointOwners: boolean;
    AssociationCodesToShow: string[];
}

export class JointOwners implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'JointOwners'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _shouldShowJointOwners: boolean;
            get shouldShowJointOwners(): boolean {
                return this._shouldShowJointOwners;
            }
            set shouldShowJointOwners(value: boolean) {
                this._shouldShowJointOwners = value;
            }

            private _associationCodesToShow: string[];
            get associationCodesToShow(): string[] {
                return this._associationCodesToShow;
            }
            set associationCodesToShow(value: string[]) {
                this._associationCodesToShow = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "JointOwners.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "JointOwners.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "JointOwners.ShouldShowJointOwners", value: this._shouldShowJointOwners, dataType: 'boolean', label: "Should Show Joint Owners" },
                { key: "JointOwners.AssociationCodesToShow", value: this._associationCodesToShow, dataType: 'string[]', label: "Association Codes To Show" },
            ];
        }

}