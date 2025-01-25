import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface TravelNotificationFeatureConfig {
    Enabled: boolean;
    MinVersion: number;
    ShowCellNumberOnTravelNotificationForm: boolean;
    ShouldShowFinalInstructionsOnTravelNotificationForm: boolean;
    ShouldShowEmailOptionInPreferredMethodOfContact: boolean;
    SubjectLine: string;
    IncludeEAgreementInSubject: boolean;
    MessageCategory: string;
    ShouldShowUseOutsideOfUsOption: boolean;
    SendToPscuEnabled: boolean;
    PscuFraudSuspendStrategy: number;
}

export class TravelNotificationFeature implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'TravelNotificationFeature'
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

            private _showCellNumberOnTravelNotificationForm: boolean;
            get showCellNumberOnTravelNotificationForm(): boolean {
                return this._showCellNumberOnTravelNotificationForm;
            }
            set showCellNumberOnTravelNotificationForm(value: boolean) {
                this._showCellNumberOnTravelNotificationForm = value;
            }

            private _shouldShowFinalInstructionsOnTravelNotificationForm: boolean;
            get shouldShowFinalInstructionsOnTravelNotificationForm(): boolean {
                return this._shouldShowFinalInstructionsOnTravelNotificationForm;
            }
            set shouldShowFinalInstructionsOnTravelNotificationForm(value: boolean) {
                this._shouldShowFinalInstructionsOnTravelNotificationForm = value;
            }

            private _shouldShowEmailOptionInPreferredMethodOfContact: boolean;
            get shouldShowEmailOptionInPreferredMethodOfContact(): boolean {
                return this._shouldShowEmailOptionInPreferredMethodOfContact;
            }
            set shouldShowEmailOptionInPreferredMethodOfContact(value: boolean) {
                this._shouldShowEmailOptionInPreferredMethodOfContact = value;
            }

            private _subjectLine: string;
            get subjectLine(): string {
                return this._subjectLine;
            }
            set subjectLine(value: string) {
                this._subjectLine = value;
            }

            private _includeEAgreementInSubject: boolean;
            get includeEAgreementInSubject(): boolean {
                return this._includeEAgreementInSubject;
            }
            set includeEAgreementInSubject(value: boolean) {
                this._includeEAgreementInSubject = value;
            }

            private _messageCategory: string;
            get messageCategory(): string {
                return this._messageCategory;
            }
            set messageCategory(value: string) {
                this._messageCategory = value;
            }

            private _shouldShowUseOutsideOfUsOption: boolean;
            get shouldShowUseOutsideOfUsOption(): boolean {
                return this._shouldShowUseOutsideOfUsOption;
            }
            set shouldShowUseOutsideOfUsOption(value: boolean) {
                this._shouldShowUseOutsideOfUsOption = value;
            }

            private _sendToPscuEnabled: boolean;
            get sendToPscuEnabled(): boolean {
                return this._sendToPscuEnabled;
            }
            set sendToPscuEnabled(value: boolean) {
                this._sendToPscuEnabled = value;
            }

            private _pscuFraudSuspendStrategy: number;
            get pscuFraudSuspendStrategy(): number {
                return this._pscuFraudSuspendStrategy;
            }
            set pscuFraudSuspendStrategy(value: number) {
                this._pscuFraudSuspendStrategy = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "TravelNotificationFeature.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "TravelNotificationFeature.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "TravelNotificationFeature.ShowCellNumberOnTravelNotificationForm", value: this._showCellNumberOnTravelNotificationForm, dataType: 'boolean', label: "Show Cell Number On Travel Notification Form" },
                { key: "TravelNotificationFeature.ShouldShowFinalInstructionsOnTravelNotificationForm", value: this._shouldShowFinalInstructionsOnTravelNotificationForm, dataType: 'boolean', label: "Should Show Final Instructions On Travel Notification Form" },
                { key: "TravelNotificationFeature.ShouldShowEmailOptionInPreferredMethodOfContact", value: this._shouldShowEmailOptionInPreferredMethodOfContact, dataType: 'boolean', label: "Should Show Email Option In Preferred Method Of Contact" },
                { key: "TravelNotificationFeature.SubjectLine", value: this._subjectLine, dataType: 'string', label: "Subject Line" },
                { key: "TravelNotificationFeature.IncludeEAgreementInSubject", value: this._includeEAgreementInSubject, dataType: 'boolean', label: "Include E Agreement In Subject" },
                { key: "TravelNotificationFeature.MessageCategory", value: this._messageCategory, dataType: 'string', label: "Message Category" },
                { key: "TravelNotificationFeature.ShouldShowUseOutsideOfUsOption", value: this._shouldShowUseOutsideOfUsOption, dataType: 'boolean', label: "Should Show Use Outside Of Us Option" },
                { key: "TravelNotificationFeature.SendToPscuEnabled", value: this._sendToPscuEnabled, dataType: 'boolean', label: "Send To Pscu Enabled" },
                { key: "TravelNotificationFeature.PscuFraudSuspendStrategy", value: this._pscuFraudSuspendStrategy, dataType: 'number', label: "Pscu Fraud Suspend Strategy" },
            ];
        }

}