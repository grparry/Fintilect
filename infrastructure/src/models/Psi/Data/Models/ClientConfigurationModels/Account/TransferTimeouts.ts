import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface TransferTimeoutsConfig {
    SendSecureMessageEnabled: boolean;
    SecureMessageCategory: string;
    SendEmailEnabled: boolean;
    RecipientEmail: string;
    SenderEmail: string;
    SecureMessageSenderMembershipUserId: number;
    EmailSenderName: string;
}

export class TransferTimeouts implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'TransferTimeouts'
    };


            private _sendSecureMessageEnabled: boolean;
            get sendSecureMessageEnabled(): boolean {
                return this._sendSecureMessageEnabled;
            }
            set sendSecureMessageEnabled(value: boolean) {
                this._sendSecureMessageEnabled = value;
            }

            private _secureMessageCategory: string;
            get secureMessageCategory(): string {
                return this._secureMessageCategory;
            }
            set secureMessageCategory(value: string) {
                this._secureMessageCategory = value;
            }

            private _sendEmailEnabled: boolean;
            get sendEmailEnabled(): boolean {
                return this._sendEmailEnabled;
            }
            set sendEmailEnabled(value: boolean) {
                this._sendEmailEnabled = value;
            }

            private _recipientEmail: string;
            get recipientEmail(): string {
                return this._recipientEmail;
            }
            set recipientEmail(value: string) {
                this._recipientEmail = value;
            }

            private _senderEmail: string;
            get senderEmail(): string {
                return this._senderEmail;
            }
            set senderEmail(value: string) {
                this._senderEmail = value;
            }

            private _secureMessageSenderMembershipUserId: number;
            get secureMessageSenderMembershipUserId(): number {
                return this._secureMessageSenderMembershipUserId;
            }
            set secureMessageSenderMembershipUserId(value: number) {
                this._secureMessageSenderMembershipUserId = value;
            }

            private _emailSenderName: string;
            get emailSenderName(): string {
                return this._emailSenderName;
            }
            set emailSenderName(value: string) {
                this._emailSenderName = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "TransferTimeouts.SendSecureMessageEnabled", value: this._sendSecureMessageEnabled, dataType: 'boolean', label: "Send Secure Message Enabled" },
                { key: "TransferTimeouts.SecureMessageCategory", value: this._secureMessageCategory, dataType: 'string', label: "Secure Message Category" },
                { key: "TransferTimeouts.SendEmailEnabled", value: this._sendEmailEnabled, dataType: 'boolean', label: "Send Email Enabled" },
                { key: "TransferTimeouts.RecipientEmail", value: this._recipientEmail, dataType: 'string', label: "Recipient Email" },
                { key: "TransferTimeouts.SenderEmail", value: this._senderEmail, dataType: 'string', label: "Sender Email" },
                { key: "TransferTimeouts.SecureMessageSenderMembershipUserId", value: this._secureMessageSenderMembershipUserId, dataType: 'number', label: "Secure Message Sender Membership User Id" },
                { key: "TransferTimeouts.EmailSenderName", value: this._emailSenderName, dataType: 'string', label: "Email Sender Name" },
            ];
        }

}