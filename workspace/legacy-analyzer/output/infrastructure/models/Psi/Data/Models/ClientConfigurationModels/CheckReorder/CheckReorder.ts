import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { HarlandCheckReorder } from '@infrastructure/HarlandCheckReorder';
import { MainStreetCheckReorder } from '@infrastructure/MainStreetCheckReorder';
export interface CheckReorderConfig {
    HarlandCheckReorder: HarlandCheckReorder;
    MainStreetCheckReorder: MainStreetCheckReorder;
    AccountInfoCacheExpirationTimeInHours: number;
    JointOwnerOnChecksIsEnabled: boolean;
}

export class CheckReorder implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CheckReorder'
    };


            private _harlandCheckReorder: HarlandCheckReorder;
            get harlandCheckReorder(): HarlandCheckReorder {
                return this._harlandCheckReorder;
            }
            set harlandCheckReorder(value: HarlandCheckReorder) {
                this._harlandCheckReorder = value;
            }

            private _mainStreetCheckReorder: MainStreetCheckReorder;
            get mainStreetCheckReorder(): MainStreetCheckReorder {
                return this._mainStreetCheckReorder;
            }
            set mainStreetCheckReorder(value: MainStreetCheckReorder) {
                this._mainStreetCheckReorder = value;
            }

            private _accountInfoCacheExpirationTimeInHours: number;
            get accountInfoCacheExpirationTimeInHours(): number {
                return this._accountInfoCacheExpirationTimeInHours;
            }
            set accountInfoCacheExpirationTimeInHours(value: number) {
                this._accountInfoCacheExpirationTimeInHours = value;
            }

            private _jointOwnerOnChecksIsEnabled: boolean;
            get jointOwnerOnChecksIsEnabled(): boolean {
                return this._jointOwnerOnChecksIsEnabled;
            }
            set jointOwnerOnChecksIsEnabled(value: boolean) {
                this._jointOwnerOnChecksIsEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CheckReorder.HarlandCheckReorder", value: this._harlandCheckReorder, dataType: 'harlandcheckreorder', label: "Harland Check Reorder" },
                { key: "CheckReorder.MainStreetCheckReorder", value: this._mainStreetCheckReorder, dataType: 'mainstreetcheckreorder', label: "Main Street Check Reorder" },
                { key: "CheckReorder.AccountInfoCacheExpirationTimeInHours", value: this._accountInfoCacheExpirationTimeInHours, dataType: 'number', label: "Account Info Cache Expiration Time In Hours" },
                { key: "CheckReorder.JointOwnerOnChecksIsEnabled", value: this._jointOwnerOnChecksIsEnabled, dataType: 'boolean', label: "Joint Owner On Checks Is Enabled" },
            ];
        }

}