import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Authentication } from '../MobileConfigurations.Authentication.Authentication';
export interface CreditScoreHistorySettingsConfig {
    Authentication: Authentication;
    Enabled: boolean;
    MinVersion: number;
    MinIosVersion: string;
    MinAndroidVersion: string;
    TrackingRecordId: string;
    SecureMessagingCategory: string;
    Url: string;
    RateReductionLinkUrl: string;
    FaqLinkUrl: string;
    Questions: string[];
}

export class CreditScoreHistorySettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CreditScoreHistorySettings'
    };


            private _authentication: Authentication;
            get authentication(): Authentication {
                return this._authentication;
            }
            set authentication(value: Authentication) {
                this._authentication = value;
            }

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

            private _minIosVersion: string;
            get minIosVersion(): string {
                return this._minIosVersion;
            }
            set minIosVersion(value: string) {
                this._minIosVersion = value;
            }

            private _minAndroidVersion: string;
            get minAndroidVersion(): string {
                return this._minAndroidVersion;
            }
            set minAndroidVersion(value: string) {
                this._minAndroidVersion = value;
            }

            private _trackingRecordId: string;
            get trackingRecordId(): string {
                return this._trackingRecordId;
            }
            set trackingRecordId(value: string) {
                this._trackingRecordId = value;
            }

            private _secureMessagingCategory: string;
            get secureMessagingCategory(): string {
                return this._secureMessagingCategory;
            }
            set secureMessagingCategory(value: string) {
                this._secureMessagingCategory = value;
            }

            private _url: string;
            get url(): string {
                return this._url;
            }
            set url(value: string) {
                this._url = value;
            }

            private _rateReductionLinkUrl: string;
            get rateReductionLinkUrl(): string {
                return this._rateReductionLinkUrl;
            }
            set rateReductionLinkUrl(value: string) {
                this._rateReductionLinkUrl = value;
            }

            private _faqLinkUrl: string;
            get faqLinkUrl(): string {
                return this._faqLinkUrl;
            }
            set faqLinkUrl(value: string) {
                this._faqLinkUrl = value;
            }

            private _questions: string[];
            get questions(): string[] {
                return this._questions;
            }
            set questions(value: string[]) {
                this._questions = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CreditScoreHistorySettings.Authentication", value: this._authentication, dataType: 'mobileconfigurations.authentication.authentication', label: "Authentication" },
                { key: "CreditScoreHistorySettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "CreditScoreHistorySettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "CreditScoreHistorySettings.MinIosVersion", value: this._minIosVersion, dataType: 'string', label: "Min Ios Version" },
                { key: "CreditScoreHistorySettings.MinAndroidVersion", value: this._minAndroidVersion, dataType: 'string', label: "Min Android Version" },
                { key: "CreditScoreHistorySettings.TrackingRecordId", value: this._trackingRecordId, dataType: 'string', label: "Tracking Record Id" },
                { key: "CreditScoreHistorySettings.SecureMessagingCategory", value: this._secureMessagingCategory, dataType: 'string', label: "Secure Messaging Category" },
                { key: "CreditScoreHistorySettings.Url", value: this._url, dataType: 'string', label: "Url" },
                { key: "CreditScoreHistorySettings.RateReductionLinkUrl", value: this._rateReductionLinkUrl, dataType: 'string', label: "Rate Reduction Link Url" },
                { key: "CreditScoreHistorySettings.FaqLinkUrl", value: this._faqLinkUrl, dataType: 'string', label: "Faq Link Url" },
                { key: "CreditScoreHistorySettings.Questions", value: this._questions, dataType: 'list<string>', label: "Questions" },
            ];
        }

}