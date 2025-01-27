import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Validation } from '@infrastructure/Validation';
import { SimnetConfiguration } from '@infrastructure/SimnetConfiguration';
import { CheckImageOutputTypes } from '@infrastructure/CheckImageOutputTypes';
export interface CheckImagesConfig {
    HideCrossAccountsInAccountsDropDown: boolean;
    ShowCrossAccountCheckImages: boolean;
    ValidationSettings: Validation;
    SimnetConfiguration: SimnetConfiguration;
    OutputType: CheckImageOutputTypes;
    CorporateOneRoutingTransitNumber: string;
    CorporateOneSecurityKey: string;
    CorporateOneUrl: string;
}

export class CheckImages implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CheckImages'
    };


            private _hideCrossAccountsInAccountsDropDown: boolean;
            get hideCrossAccountsInAccountsDropDown(): boolean {
                return this._hideCrossAccountsInAccountsDropDown;
            }
            set hideCrossAccountsInAccountsDropDown(value: boolean) {
                this._hideCrossAccountsInAccountsDropDown = value;
            }

            private _showCrossAccountCheckImages: boolean;
            get showCrossAccountCheckImages(): boolean {
                return this._showCrossAccountCheckImages;
            }
            set showCrossAccountCheckImages(value: boolean) {
                this._showCrossAccountCheckImages = value;
            }

            private _validationSettings: Validation;
            get validationSettings(): Validation {
                return this._validationSettings;
            }
            set validationSettings(value: Validation) {
                this._validationSettings = value;
            }

            private _simnetConfiguration: SimnetConfiguration;
            get simnetConfiguration(): SimnetConfiguration {
                return this._simnetConfiguration;
            }
            set simnetConfiguration(value: SimnetConfiguration) {
                this._simnetConfiguration = value;
            }

            private _outputType: CheckImageOutputTypes;
            get outputType(): CheckImageOutputTypes {
                return this._outputType;
            }
            set outputType(value: CheckImageOutputTypes) {
                this._outputType = value;
            }

            private _corporateOneRoutingTransitNumber: string;
            get corporateOneRoutingTransitNumber(): string {
                return this._corporateOneRoutingTransitNumber;
            }
            set corporateOneRoutingTransitNumber(value: string) {
                this._corporateOneRoutingTransitNumber = value;
            }

            private _corporateOneSecurityKey: string;
            get corporateOneSecurityKey(): string {
                return this._corporateOneSecurityKey;
            }
            set corporateOneSecurityKey(value: string) {
                this._corporateOneSecurityKey = value;
            }

            private _corporateOneUrl: string;
            get corporateOneUrl(): string {
                return this._corporateOneUrl;
            }
            set corporateOneUrl(value: string) {
                this._corporateOneUrl = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CheckImages.HideCrossAccountsInAccountsDropDown", value: this._hideCrossAccountsInAccountsDropDown, dataType: 'boolean', label: "Hide Cross Accounts In Accounts Drop Down" },
                { key: "CheckImages.ShowCrossAccountCheckImages", value: this._showCrossAccountCheckImages, dataType: 'boolean', label: "Show Cross Account Check Images" },
                { key: "CheckImages.ValidationSettings", value: this._validationSettings, dataType: 'validation', label: "Validation Settings" },
                { key: "CheckImages.SimnetConfiguration", value: this._simnetConfiguration, dataType: 'simnetconfiguration', label: "Simnet Configuration" },
                { key: "CheckImages.OutputType", value: this._outputType, dataType: 'checkimageoutputtypes', label: "Output Type" },
                { key: "CheckImages.CorporateOneRoutingTransitNumber", value: this._corporateOneRoutingTransitNumber, dataType: 'string', label: "Corporate One Routing Transit Number" },
                { key: "CheckImages.CorporateOneSecurityKey", value: this._corporateOneSecurityKey, dataType: 'string', label: "Corporate One Security Key" },
                { key: "CheckImages.CorporateOneUrl", value: this._corporateOneUrl, dataType: 'string', label: "Corporate One Url" },
            ];
        }

}