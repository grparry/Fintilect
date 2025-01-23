import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ApplicationSettingsConfig {
    TypeSerial: string;
    SaveClientsIp: boolean;
    ChannelSerial: string;
    WorkFlowSerial: string;
    WorkQueueOpenSerial: string;
    WorkQueueNewSerial: string;
    WorkQueueApproveSerial: string;
    WorkQueueRescreenSerial: string;
    ManualApprovalsBypassWorkQueueLogic: boolean;
    WorkQueueReviewSerial: string;
    WorkQueueDeclineSerial: string;
    CreditTypeSerialChexSystems: string;
    CreditTypeSerialEquifax: string;
    CreditTypeSerialTransUnion: string;
    CreditPullMaxDaysOld: string;
}

export class ApplicationSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ApplicationSettings'
    };


            private _typeSerial: string;
            get typeSerial(): string {
                return this._typeSerial;
            }
            set typeSerial(value: string) {
                this._typeSerial = value;
            }

            private _saveClientsIp: boolean;
            get saveClientsIp(): boolean {
                return this._saveClientsIp;
            }
            set saveClientsIp(value: boolean) {
                this._saveClientsIp = value;
            }

            private _channelSerial: string;
            get channelSerial(): string {
                return this._channelSerial;
            }
            set channelSerial(value: string) {
                this._channelSerial = value;
            }

            private _workFlowSerial: string;
            get workFlowSerial(): string {
                return this._workFlowSerial;
            }
            set workFlowSerial(value: string) {
                this._workFlowSerial = value;
            }

            private _workQueueOpenSerial: string;
            get workQueueOpenSerial(): string {
                return this._workQueueOpenSerial;
            }
            set workQueueOpenSerial(value: string) {
                this._workQueueOpenSerial = value;
            }

            private _workQueueNewSerial: string;
            get workQueueNewSerial(): string {
                return this._workQueueNewSerial;
            }
            set workQueueNewSerial(value: string) {
                this._workQueueNewSerial = value;
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

            private _manualApprovalsBypassWorkQueueLogic: boolean;
            get manualApprovalsBypassWorkQueueLogic(): boolean {
                return this._manualApprovalsBypassWorkQueueLogic;
            }
            set manualApprovalsBypassWorkQueueLogic(value: boolean) {
                this._manualApprovalsBypassWorkQueueLogic = value;
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

            private _creditPullMaxDaysOld: string;
            get creditPullMaxDaysOld(): string {
                return this._creditPullMaxDaysOld;
            }
            set creditPullMaxDaysOld(value: string) {
                this._creditPullMaxDaysOld = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ApplicationSettings.TypeSerial", value: this._typeSerial, dataType: 'string', label: "Type Serial" },
                { key: "ApplicationSettings.SaveClientsIp", value: this._saveClientsIp, dataType: 'boolean', label: "Save Clients Ip" },
                { key: "ApplicationSettings.ChannelSerial", value: this._channelSerial, dataType: 'string', label: "Channel Serial" },
                { key: "ApplicationSettings.WorkFlowSerial", value: this._workFlowSerial, dataType: 'string', label: "Work Flow Serial" },
                { key: "ApplicationSettings.WorkQueueOpenSerial", value: this._workQueueOpenSerial, dataType: 'string', label: "Work Queue Open Serial" },
                { key: "ApplicationSettings.WorkQueueNewSerial", value: this._workQueueNewSerial, dataType: 'string', label: "Work Queue New Serial" },
                { key: "ApplicationSettings.WorkQueueApproveSerial", value: this._workQueueApproveSerial, dataType: 'string', label: "Work Queue Approve Serial" },
                { key: "ApplicationSettings.WorkQueueRescreenSerial", value: this._workQueueRescreenSerial, dataType: 'string', label: "Work Queue Rescreen Serial" },
                { key: "ApplicationSettings.ManualApprovalsBypassWorkQueueLogic", value: this._manualApprovalsBypassWorkQueueLogic, dataType: 'boolean', label: "Manual Approvals Bypass Work Queue Logic" },
                { key: "ApplicationSettings.WorkQueueReviewSerial", value: this._workQueueReviewSerial, dataType: 'string', label: "Work Queue Review Serial" },
                { key: "ApplicationSettings.WorkQueueDeclineSerial", value: this._workQueueDeclineSerial, dataType: 'string', label: "Work Queue Decline Serial" },
                { key: "ApplicationSettings.CreditTypeSerialChexSystems", value: this._creditTypeSerialChexSystems, dataType: 'string', label: "Credit Type Serial Chex Systems" },
                { key: "ApplicationSettings.CreditTypeSerialEquifax", value: this._creditTypeSerialEquifax, dataType: 'string', label: "Credit Type Serial Equifax" },
                { key: "ApplicationSettings.CreditTypeSerialTransUnion", value: this._creditTypeSerialTransUnion, dataType: 'string', label: "Credit Type Serial Trans Union" },
                { key: "ApplicationSettings.CreditPullMaxDaysOld", value: this._creditPullMaxDaysOld, dataType: 'string', label: "Credit Pull Max Days Old" },
            ];
        }

}