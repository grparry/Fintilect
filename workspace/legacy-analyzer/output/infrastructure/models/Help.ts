import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { MessageTypeEnum } from './MessageTypeEnum';
export interface HelpConfig {
    MessageType: MessageTypeEnum;
    EmailAddress: string;
    SecureMessageCategoryName: string;
}

export class Help implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Help'
    };


            private _messageType: MessageTypeEnum;
            get messageType(): MessageTypeEnum {
                return this._messageType;
            }
            set messageType(value: MessageTypeEnum) {
                this._messageType = value;
            }

            private _emailAddress: string;
            get emailAddress(): string {
                return this._emailAddress;
            }
            set emailAddress(value: string) {
                this._emailAddress = value;
            }

            private _secureMessageCategoryName: string;
            get secureMessageCategoryName(): string {
                return this._secureMessageCategoryName;
            }
            set secureMessageCategoryName(value: string) {
                this._secureMessageCategoryName = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Help.MessageType", value: this._messageType, dataType: 'messagetypeenum', label: "Message Type" },
                { key: "Help.EmailAddress", value: this._emailAddress, dataType: 'string', label: "Email Address" },
                { key: "Help.SecureMessageCategoryName", value: this._secureMessageCategoryName, dataType: 'string', label: "Secure Message Category Name" },
            ];
        }

}