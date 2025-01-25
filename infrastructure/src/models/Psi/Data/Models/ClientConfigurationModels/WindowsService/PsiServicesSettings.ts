import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface PsiServicesSettingsConfig {
    HostedServices: string;
    DataFeedProcessing: string;
    ScheduledTransfersShouldCheckNextHourTransfersForInsufficientFunds: boolean;
    ScheduledTransfersMaxDegreeOfParallelism: number;
    ScheduledTransfersBatchSize: number;
    ScheduledTransfersValidTransferDaysRange: number;
}

export class PsiServicesSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PsiServicesSettings'
    };


            private _hostedServices: string;
            get hostedServices(): string {
                return this._hostedServices;
            }
            set hostedServices(value: string) {
                this._hostedServices = value;
            }

            private _dataFeedProcessing: string;
            get dataFeedProcessing(): string {
                return this._dataFeedProcessing;
            }
            set dataFeedProcessing(value: string) {
                this._dataFeedProcessing = value;
            }

            private _scheduledTransfersShouldCheckNextHourTransfersForInsufficientFunds: boolean;
            get scheduledTransfersShouldCheckNextHourTransfersForInsufficientFunds(): boolean {
                return this._scheduledTransfersShouldCheckNextHourTransfersForInsufficientFunds;
            }
            set scheduledTransfersShouldCheckNextHourTransfersForInsufficientFunds(value: boolean) {
                this._scheduledTransfersShouldCheckNextHourTransfersForInsufficientFunds = value;
            }

            private _scheduledTransfersMaxDegreeOfParallelism: number;
            get scheduledTransfersMaxDegreeOfParallelism(): number {
                return this._scheduledTransfersMaxDegreeOfParallelism;
            }
            set scheduledTransfersMaxDegreeOfParallelism(value: number) {
                this._scheduledTransfersMaxDegreeOfParallelism = value;
            }

            private _scheduledTransfersBatchSize: number;
            get scheduledTransfersBatchSize(): number {
                return this._scheduledTransfersBatchSize;
            }
            set scheduledTransfersBatchSize(value: number) {
                this._scheduledTransfersBatchSize = value;
            }

            private _scheduledTransfersValidTransferDaysRange: number;
            get scheduledTransfersValidTransferDaysRange(): number {
                return this._scheduledTransfersValidTransferDaysRange;
            }
            set scheduledTransfersValidTransferDaysRange(value: number) {
                this._scheduledTransfersValidTransferDaysRange = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "PsiServicesSettings.HostedServices", value: this._hostedServices, dataType: 'string', label: "Hosted Services" },
                { key: "PsiServicesSettings.DataFeedProcessing", value: this._dataFeedProcessing, dataType: 'string', label: "Data Feed Processing" },
                { key: "PsiServicesSettings.ScheduledTransfersShouldCheckNextHourTransfersForInsufficientFunds", value: this._scheduledTransfersShouldCheckNextHourTransfersForInsufficientFunds, dataType: 'boolean', label: "Scheduled Transfers Should Check Next Hour Transfers For Insufficient Funds" },
                { key: "PsiServicesSettings.ScheduledTransfersMaxDegreeOfParallelism", value: this._scheduledTransfersMaxDegreeOfParallelism, dataType: 'number', label: "Scheduled Transfers Max Degree Of Parallelism" },
                { key: "PsiServicesSettings.ScheduledTransfersBatchSize", value: this._scheduledTransfersBatchSize, dataType: 'number', label: "Scheduled Transfers Batch Size" },
                { key: "PsiServicesSettings.ScheduledTransfersValidTransferDaysRange", value: this._scheduledTransfersValidTransferDaysRange, dataType: 'number', label: "Scheduled Transfers Valid Transfer Days Range" },
            ];
        }

}