import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface TargetedMarketingSettingsConfig {
    ImageDeliveryServiceClassName: string;
    PSITargetedMarketingWebAPIAddress: string;
    EnableTargetedMarketing: boolean;
    GetImageUrl: string;
    CanMapMemberNumberToEAgreementNumber: boolean;
    CorsAllowedOrigin: string;
}

export class TargetedMarketingSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'TargetedMarketingSettings'
    };


            private _imageDeliveryServiceClassName: string;
            get imageDeliveryServiceClassName(): string {
                return this._imageDeliveryServiceClassName;
            }
            set imageDeliveryServiceClassName(value: string) {
                this._imageDeliveryServiceClassName = value;
            }

            private _pSITargetedMarketingWebAPIAddress: string;
            get pSITargetedMarketingWebAPIAddress(): string {
                return this._pSITargetedMarketingWebAPIAddress;
            }
            set pSITargetedMarketingWebAPIAddress(value: string) {
                this._pSITargetedMarketingWebAPIAddress = value;
            }

            private _enableTargetedMarketing: boolean;
            get enableTargetedMarketing(): boolean {
                return this._enableTargetedMarketing;
            }
            set enableTargetedMarketing(value: boolean) {
                this._enableTargetedMarketing = value;
            }

            private _getImageUrl: string;
            get getImageUrl(): string {
                return this._getImageUrl;
            }
            set getImageUrl(value: string) {
                this._getImageUrl = value;
            }

            private _canMapMemberNumberToEAgreementNumber: boolean;
            get canMapMemberNumberToEAgreementNumber(): boolean {
                return this._canMapMemberNumberToEAgreementNumber;
            }
            set canMapMemberNumberToEAgreementNumber(value: boolean) {
                this._canMapMemberNumberToEAgreementNumber = value;
            }

            private _corsAllowedOrigin: string;
            get corsAllowedOrigin(): string {
                return this._corsAllowedOrigin;
            }
            set corsAllowedOrigin(value: string) {
                this._corsAllowedOrigin = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "TargetedMarketingSettings.ImageDeliveryServiceClassName", value: this._imageDeliveryServiceClassName, dataType: 'string', label: "Image Delivery Service Class Name" },
                { key: "TargetedMarketingSettings.PSITargetedMarketingWebAPIAddress", value: this._pSITargetedMarketingWebAPIAddress, dataType: 'string', label: "P S I Targeted Marketing Web A P I Address" },
                { key: "TargetedMarketingSettings.EnableTargetedMarketing", value: this._enableTargetedMarketing, dataType: 'boolean', label: "Enable Targeted Marketing" },
                { key: "TargetedMarketingSettings.GetImageUrl", value: this._getImageUrl, dataType: 'string', label: "Get Image Url" },
                { key: "TargetedMarketingSettings.CanMapMemberNumberToEAgreementNumber", value: this._canMapMemberNumberToEAgreementNumber, dataType: 'boolean', label: "Can Map Member Number To E Agreement Number" },
                { key: "TargetedMarketingSettings.CorsAllowedOrigin", value: this._corsAllowedOrigin, dataType: 'string', label: "Cors Allowed Origin" },
            ];
        }

}