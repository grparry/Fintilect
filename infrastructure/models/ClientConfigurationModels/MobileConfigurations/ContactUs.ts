import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ContactUsConfig {
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    ShouldUseNewContactUs: boolean;
}

export class ContactUs implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ContactUs'
    };


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

            private _shouldUseNewContactUs: boolean;
            get shouldUseNewContactUs(): boolean {
                return this._shouldUseNewContactUs;
            }
            set shouldUseNewContactUs(value: boolean) {
                this._shouldUseNewContactUs = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ContactUs.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "ContactUs.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "ContactUs.ShouldUseNewContactUs", value: this._shouldUseNewContactUs, dataType: 'boolean', label: "Should Use New Contact Us" },
            ];
        }

}