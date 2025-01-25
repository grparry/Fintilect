import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface LoanOriginationSettingsConfig {
    ApplicationTypeSerial: string;
    ApplicationChannel: string;
    ApplicationBranch: string;
    DefaultCreditLimit: string;
    DefaultPaymentAmount: string;
    WorkFlowSerial: string;
    WorkQueueApproveSerial: string;
    WorkQueueRescreenSerial: string;
    WorkQueueReviewSerial: string;
    WorkQueueDeclineSerial: string;
    WorkQueueIlaDefaultSerial: string;
    OnlineApplicationNoteTypeSerial: string;
    CommentsNoteTypeSerial: string;
    AccountDisclosureNoteTypeSerial: string;
    EnoticesDisclosureNoteTypeSerial: string;
    PrivacyNoticeDisclosureNoteTypeSerial: string;
    DecisionTypeSerial: string;
    CreditTypeSerialChexSystems: string;
    CreditTypeSerialEquifax: string;
    CreditTypeSerialTransUnion: string;
}

export class LoanOriginationSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'LoanOriginationSettings'
    };


            private _applicationTypeSerial: string;
            get applicationTypeSerial(): string {
                return this._applicationTypeSerial;
            }
            set applicationTypeSerial(value: string) {
                this._applicationTypeSerial = value;
            }

            private _applicationChannel: string;
            get applicationChannel(): string {
                return this._applicationChannel;
            }
            set applicationChannel(value: string) {
                this._applicationChannel = value;
            }

            private _applicationBranch: string;
            get applicationBranch(): string {
                return this._applicationBranch;
            }
            set applicationBranch(value: string) {
                this._applicationBranch = value;
            }

            private _defaultCreditLimit: string;
            get defaultCreditLimit(): string {
                return this._defaultCreditLimit;
            }
            set defaultCreditLimit(value: string) {
                this._defaultCreditLimit = value;
            }

            private _defaultPaymentAmount: string;
            get defaultPaymentAmount(): string {
                return this._defaultPaymentAmount;
            }
            set defaultPaymentAmount(value: string) {
                this._defaultPaymentAmount = value;
            }

            private _workFlowSerial: string;
            get workFlowSerial(): string {
                return this._workFlowSerial;
            }
            set workFlowSerial(value: string) {
                this._workFlowSerial = value;
            }

            private _workQueueApproveSerial: string;
            get workQueueApproveSerial(): string {
                return this._workQueueApproveSerial;
            }
            set workQueueApproveSerial(value: string) {
                this._workQueueApproveSerial = value;
            }

            private _workQueueRescreenSerial: string;
            get workQueueRescreenSerial(): string {
                return this._workQueueRescreenSerial;
            }
            set workQueueRescreenSerial(value: string) {
                this._workQueueRescreenSerial = value;
            }

            private _workQueueReviewSerial: string;
            get workQueueReviewSerial(): string {
                return this._workQueueReviewSerial;
            }
            set workQueueReviewSerial(value: string) {
                this._workQueueReviewSerial = value;
            }

            private _workQueueDeclineSerial: string;
            get workQueueDeclineSerial(): string {
                return this._workQueueDeclineSerial;
            }
            set workQueueDeclineSerial(value: string) {
                this._workQueueDeclineSerial = value;
            }

            private _workQueueIlaDefaultSerial: string;
            get workQueueIlaDefaultSerial(): string {
                return this._workQueueIlaDefaultSerial;
            }
            set workQueueIlaDefaultSerial(value: string) {
                this._workQueueIlaDefaultSerial = value;
            }

            private _onlineApplicationNoteTypeSerial: string;
            get onlineApplicationNoteTypeSerial(): string {
                return this._onlineApplicationNoteTypeSerial;
            }
            set onlineApplicationNoteTypeSerial(value: string) {
                this._onlineApplicationNoteTypeSerial = value;
            }

            private _commentsNoteTypeSerial: string;
            get commentsNoteTypeSerial(): string {
                return this._commentsNoteTypeSerial;
            }
            set commentsNoteTypeSerial(value: string) {
                this._commentsNoteTypeSerial = value;
            }

            private _accountDisclosureNoteTypeSerial: string;
            get accountDisclosureNoteTypeSerial(): string {
                return this._accountDisclosureNoteTypeSerial;
            }
            set accountDisclosureNoteTypeSerial(value: string) {
                this._accountDisclosureNoteTypeSerial = value;
            }

            private _enoticesDisclosureNoteTypeSerial: string;
            get enoticesDisclosureNoteTypeSerial(): string {
                return this._enoticesDisclosureNoteTypeSerial;
            }
            set enoticesDisclosureNoteTypeSerial(value: string) {
                this._enoticesDisclosureNoteTypeSerial = value;
            }

            private _privacyNoticeDisclosureNoteTypeSerial: string;
            get privacyNoticeDisclosureNoteTypeSerial(): string {
                return this._privacyNoticeDisclosureNoteTypeSerial;
            }
            set privacyNoticeDisclosureNoteTypeSerial(value: string) {
                this._privacyNoticeDisclosureNoteTypeSerial = value;
            }

            private _decisionTypeSerial: string;
            get decisionTypeSerial(): string {
                return this._decisionTypeSerial;
            }
            set decisionTypeSerial(value: string) {
                this._decisionTypeSerial = value;
            }

            private _creditTypeSerialChexSystems: string;
            get creditTypeSerialChexSystems(): string {
                return this._creditTypeSerialChexSystems;
            }
            set creditTypeSerialChexSystems(value: string) {
                this._creditTypeSerialChexSystems = value;
            }

            private _creditTypeSerialEquifax: string;
            get creditTypeSerialEquifax(): string {
                return this._creditTypeSerialEquifax;
            }
            set creditTypeSerialEquifax(value: string) {
                this._creditTypeSerialEquifax = value;
            }

            private _creditTypeSerialTransUnion: string;
            get creditTypeSerialTransUnion(): string {
                return this._creditTypeSerialTransUnion;
            }
            set creditTypeSerialTransUnion(value: string) {
                this._creditTypeSerialTransUnion = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "LoanOriginationSettings.ApplicationTypeSerial", value: this._applicationTypeSerial, dataType: 'string', label: "Application Type Serial" },
                { key: "LoanOriginationSettings.ApplicationChannel", value: this._applicationChannel, dataType: 'string', label: "Application Channel" },
                { key: "LoanOriginationSettings.ApplicationBranch", value: this._applicationBranch, dataType: 'string', label: "Application Branch" },
                { key: "LoanOriginationSettings.DefaultCreditLimit", value: this._defaultCreditLimit, dataType: 'string', label: "Default Credit Limit" },
                { key: "LoanOriginationSettings.DefaultPaymentAmount", value: this._defaultPaymentAmount, dataType: 'string', label: "Default Payment Amount" },
                { key: "LoanOriginationSettings.WorkFlowSerial", value: this._workFlowSerial, dataType: 'string', label: "Work Flow Serial" },
                { key: "LoanOriginationSettings.WorkQueueApproveSerial", value: this._workQueueApproveSerial, dataType: 'string', label: "Work Queue Approve Serial" },
                { key: "LoanOriginationSettings.WorkQueueRescreenSerial", value: this._workQueueRescreenSerial, dataType: 'string', label: "Work Queue Rescreen Serial" },
                { key: "LoanOriginationSettings.WorkQueueReviewSerial", value: this._workQueueReviewSerial, dataType: 'string', label: "Work Queue Review Serial" },
                { key: "LoanOriginationSettings.WorkQueueDeclineSerial", value: this._workQueueDeclineSerial, dataType: 'string', label: "Work Queue Decline Serial" },
                { key: "LoanOriginationSettings.WorkQueueIlaDefaultSerial", value: this._workQueueIlaDefaultSerial, dataType: 'string', label: "Work Queue Ila Default Serial" },
                { key: "LoanOriginationSettings.OnlineApplicationNoteTypeSerial", value: this._onlineApplicationNoteTypeSerial, dataType: 'string', label: "Online Application Note Type Serial" },
                { key: "LoanOriginationSettings.CommentsNoteTypeSerial", value: this._commentsNoteTypeSerial, dataType: 'string', label: "Comments Note Type Serial" },
                { key: "LoanOriginationSettings.AccountDisclosureNoteTypeSerial", value: this._accountDisclosureNoteTypeSerial, dataType: 'string', label: "Account Disclosure Note Type Serial" },
                { key: "LoanOriginationSettings.EnoticesDisclosureNoteTypeSerial", value: this._enoticesDisclosureNoteTypeSerial, dataType: 'string', label: "Enotices Disclosure Note Type Serial" },
                { key: "LoanOriginationSettings.PrivacyNoticeDisclosureNoteTypeSerial", value: this._privacyNoticeDisclosureNoteTypeSerial, dataType: 'string', label: "Privacy Notice Disclosure Note Type Serial" },
                { key: "LoanOriginationSettings.DecisionTypeSerial", value: this._decisionTypeSerial, dataType: 'string', label: "Decision Type Serial" },
                { key: "LoanOriginationSettings.CreditTypeSerialChexSystems", value: this._creditTypeSerialChexSystems, dataType: 'string', label: "Credit Type Serial Chex Systems" },
                { key: "LoanOriginationSettings.CreditTypeSerialEquifax", value: this._creditTypeSerialEquifax, dataType: 'string', label: "Credit Type Serial Equifax" },
                { key: "LoanOriginationSettings.CreditTypeSerialTransUnion", value: this._creditTypeSerialTransUnion, dataType: 'string', label: "Credit Type Serial Trans Union" },
            ];
        }

}