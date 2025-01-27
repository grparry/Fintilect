import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { EyeScan } from '@infrastructure/EyeScan';
import { FaceUnlock } from '@infrastructure/FaceUnlock';
export interface BiometricsConfig {
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    ShouldAutoPrompt: boolean;
    EyeScan: EyeScan;
    FaceUnlock: FaceUnlock;
}

export class Biometrics implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Biometrics'
    };


            private _minimumVersion: string;
            get minimumVersion(): string {
                return this._minimumVersion;
            }
            set minimumVersion(value: string) {
                this._minimumVersion = value;
            }

            private _minimumAndroidVersion: string;
            get minimumAndroidVersion(): string {
                return this._minimumAndroidVersion;
            }
            set minimumAndroidVersion(value: string) {
                this._minimumAndroidVersion = value;
            }

            private _minimumIosVersion: string;
            get minimumIosVersion(): string {
                return this._minimumIosVersion;
            }
            set minimumIosVersion(value: string) {
                this._minimumIosVersion = value;
            }

            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _shouldAutoPrompt: boolean;
            get shouldAutoPrompt(): boolean {
                return this._shouldAutoPrompt;
            }
            set shouldAutoPrompt(value: boolean) {
                this._shouldAutoPrompt = value;
            }

            private _eyeScan: EyeScan;
            get eyeScan(): EyeScan {
                return this._eyeScan;
            }
            set eyeScan(value: EyeScan) {
                this._eyeScan = value;
            }

            private _faceUnlock: FaceUnlock;
            get faceUnlock(): FaceUnlock {
                return this._faceUnlock;
            }
            set faceUnlock(value: FaceUnlock) {
                this._faceUnlock = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Biometrics.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "Biometrics.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "Biometrics.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "Biometrics.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "Biometrics.ShouldAutoPrompt", value: this._shouldAutoPrompt, dataType: 'boolean', label: "Should Auto Prompt" },
                { key: "Biometrics.EyeScan", value: this._eyeScan, dataType: 'eyescan', label: "Eye Scan" },
                { key: "Biometrics.FaceUnlock", value: this._faceUnlock, dataType: 'faceunlock', label: "Face Unlock" },
            ];
        }

}