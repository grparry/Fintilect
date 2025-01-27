import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Version } from '@infrastructure/Version';
export interface ThemeDeploymentConfig {
    LatestIosVersion: Version;
    LatestAndroidVersion: Version;
}

export class ThemeDeployment implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ThemeDeployment'
    };


            private _latestIosVersion: Version;
            get latestIosVersion(): Version {
                return this._latestIosVersion;
            }
            set latestIosVersion(value: Version) {
                this._latestIosVersion = value;
            }

            private _latestAndroidVersion: Version;
            get latestAndroidVersion(): Version {
                return this._latestAndroidVersion;
            }
            set latestAndroidVersion(value: Version) {
                this._latestAndroidVersion = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ThemeDeployment.LatestIosVersion", value: this._latestIosVersion, dataType: 'version', label: "Latest Ios Version" },
                { key: "ThemeDeployment.LatestAndroidVersion", value: this._latestAndroidVersion, dataType: 'version', label: "Latest Android Version" },
            ];
        }

}