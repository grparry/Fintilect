import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { CheckDepositVendor } from '@infrastructure/CheckDepositVendor';
import { CheckDepositCameraType } from '@infrastructure/CheckDepositCameraType';
import { CheckDepositAutoCaptureType } from '@infrastructure/CheckDepositAutoCaptureType';
import { RearEndorsementDefaultType } from '@infrastructure/RearEndorsementDefaultType';
import { Authentication } from '@infrastructure/Authentication.Authentication';
export interface CheckDepositConfig {
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    Vendor: CheckDepositVendor;
    CameraType: CheckDepositCameraType;
    DisclosureRequired: boolean;
    AutoCaptureSetting: CheckDepositAutoCaptureType;
    ContrastAdjustmentEnabled: boolean;
    AllowCrossAccountDeposit: boolean;
    ImageScalingMinimumAndroidVersion: string;
    ImageScalingMinimumIosVersion: string;
    RememberAccountPreference: boolean;
    ShowEndorsementInstructions: boolean;
    RearEndorsementDefault: RearEndorsementDefaultType;
    ShowMaskedAccountSuffixInAccountName: boolean;
    AccountNamePattern: string;
    EnableEndorsementUsabilityWarnings: boolean;
    Authentication: Authentication;
}

export class CheckDeposit implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CheckDeposit'
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

            private _vendor: CheckDepositVendor;
            get vendor(): CheckDepositVendor {
                return this._vendor;
            }
            set vendor(value: CheckDepositVendor) {
                this._vendor = value;
            }

            private _cameraType: CheckDepositCameraType;
            get cameraType(): CheckDepositCameraType {
                return this._cameraType;
            }
            set cameraType(value: CheckDepositCameraType) {
                this._cameraType = value;
            }

            private _disclosureRequired: boolean;
            get disclosureRequired(): boolean {
                return this._disclosureRequired;
            }
            set disclosureRequired(value: boolean) {
                this._disclosureRequired = value;
            }

            private _autoCaptureSetting: CheckDepositAutoCaptureType;
            get autoCaptureSetting(): CheckDepositAutoCaptureType {
                return this._autoCaptureSetting;
            }
            set autoCaptureSetting(value: CheckDepositAutoCaptureType) {
                this._autoCaptureSetting = value;
            }

            private _contrastAdjustmentEnabled: boolean;
            get contrastAdjustmentEnabled(): boolean {
                return this._contrastAdjustmentEnabled;
            }
            set contrastAdjustmentEnabled(value: boolean) {
                this._contrastAdjustmentEnabled = value;
            }

            private _allowCrossAccountDeposit: boolean;
            get allowCrossAccountDeposit(): boolean {
                return this._allowCrossAccountDeposit;
            }
            set allowCrossAccountDeposit(value: boolean) {
                this._allowCrossAccountDeposit = value;
            }

            private _imageScalingMinimumAndroidVersion: string;
            get imageScalingMinimumAndroidVersion(): string {
                return this._imageScalingMinimumAndroidVersion;
            }
            set imageScalingMinimumAndroidVersion(value: string) {
                this._imageScalingMinimumAndroidVersion = value;
            }

            private _imageScalingMinimumIosVersion: string;
            get imageScalingMinimumIosVersion(): string {
                return this._imageScalingMinimumIosVersion;
            }
            set imageScalingMinimumIosVersion(value: string) {
                this._imageScalingMinimumIosVersion = value;
            }

            private _rememberAccountPreference: boolean;
            get rememberAccountPreference(): boolean {
                return this._rememberAccountPreference;
            }
            set rememberAccountPreference(value: boolean) {
                this._rememberAccountPreference = value;
            }

            private _showEndorsementInstructions: boolean;
            get showEndorsementInstructions(): boolean {
                return this._showEndorsementInstructions;
            }
            set showEndorsementInstructions(value: boolean) {
                this._showEndorsementInstructions = value;
            }

            private _rearEndorsementDefault: RearEndorsementDefaultType;
            get rearEndorsementDefault(): RearEndorsementDefaultType {
                return this._rearEndorsementDefault;
            }
            set rearEndorsementDefault(value: RearEndorsementDefaultType) {
                this._rearEndorsementDefault = value;
            }

            private _showMaskedAccountSuffixInAccountName: boolean;
            get showMaskedAccountSuffixInAccountName(): boolean {
                return this._showMaskedAccountSuffixInAccountName;
            }
            set showMaskedAccountSuffixInAccountName(value: boolean) {
                this._showMaskedAccountSuffixInAccountName = value;
            }

            private _accountNamePattern: string;
            get accountNamePattern(): string {
                return this._accountNamePattern;
            }
            set accountNamePattern(value: string) {
                this._accountNamePattern = value;
            }

            private _enableEndorsementUsabilityWarnings: boolean;
            get enableEndorsementUsabilityWarnings(): boolean {
                return this._enableEndorsementUsabilityWarnings;
            }
            set enableEndorsementUsabilityWarnings(value: boolean) {
                this._enableEndorsementUsabilityWarnings = value;
            }

            private _authentication: Authentication;
            get authentication(): Authentication {
                return this._authentication;
            }
            set authentication(value: Authentication) {
                this._authentication = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CheckDeposit.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "CheckDeposit.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "CheckDeposit.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "CheckDeposit.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "CheckDeposit.Vendor", value: this._vendor, dataType: 'checkdepositvendor', label: "Vendor" },
                { key: "CheckDeposit.CameraType", value: this._cameraType, dataType: 'checkdepositcameratype', label: "Camera Type" },
                { key: "CheckDeposit.DisclosureRequired", value: this._disclosureRequired, dataType: 'boolean', label: "Disclosure Required" },
                { key: "CheckDeposit.AutoCaptureSetting", value: this._autoCaptureSetting, dataType: 'checkdepositautocapturetype', label: "Auto Capture Setting" },
                { key: "CheckDeposit.ContrastAdjustmentEnabled", value: this._contrastAdjustmentEnabled, dataType: 'boolean', label: "Contrast Adjustment Enabled" },
                { key: "CheckDeposit.AllowCrossAccountDeposit", value: this._allowCrossAccountDeposit, dataType: 'boolean', label: "Allow Cross Account Deposit" },
                { key: "CheckDeposit.ImageScalingMinimumAndroidVersion", value: this._imageScalingMinimumAndroidVersion, dataType: 'string', label: "Image Scaling Minimum Android Version" },
                { key: "CheckDeposit.ImageScalingMinimumIosVersion", value: this._imageScalingMinimumIosVersion, dataType: 'string', label: "Image Scaling Minimum Ios Version" },
                { key: "CheckDeposit.RememberAccountPreference", value: this._rememberAccountPreference, dataType: 'boolean', label: "Remember Account Preference" },
                { key: "CheckDeposit.ShowEndorsementInstructions", value: this._showEndorsementInstructions, dataType: 'boolean', label: "Show Endorsement Instructions" },
                { key: "CheckDeposit.RearEndorsementDefault", value: this._rearEndorsementDefault, dataType: 'rearendorsementdefaulttype', label: "Rear Endorsement Default" },
                { key: "CheckDeposit.ShowMaskedAccountSuffixInAccountName", value: this._showMaskedAccountSuffixInAccountName, dataType: 'boolean', label: "Show Masked Account Suffix In Account Name" },
                { key: "CheckDeposit.AccountNamePattern", value: this._accountNamePattern, dataType: 'string', label: "Account Name Pattern" },
                { key: "CheckDeposit.EnableEndorsementUsabilityWarnings", value: this._enableEndorsementUsabilityWarnings, dataType: 'boolean', label: "Enable Endorsement Usability Warnings" },
                { key: "CheckDeposit.Authentication", value: this._authentication, dataType: 'authentication.authentication', label: "Authentication" },
            ];
        }

}