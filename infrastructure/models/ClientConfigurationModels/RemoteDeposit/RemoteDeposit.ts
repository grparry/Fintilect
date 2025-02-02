import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Ensenta } from '../Ensenta';
import { Vertifi } from '../Vertifi';
import { ProfitStars } from '../ProfitStars';
import { RemoteDepositServiceType } from '../RemoteDepositServiceType';
import { RemoteDepositAccountFormat } from '../RemoteDepositAccountFormat';
import { RelationshipCodeDepositLimit } from '../RelationshipCodeDepositLimit';
export interface RemoteDepositConfig {
    Ensenta: Ensenta;
    Vertifi: Vertifi;
    ProfitStars: ProfitStars;
    ServiceType: RemoteDepositServiceType;
    ShouldDelayBeforeStatusUpdate: boolean;
    ShouldCheckReservedCheckingAccountSuffix: boolean;
    ReservedCheckingAccountSuffix: number;
    DepositIntoAccountTypes: string;
    RemoteDepositAccountFormat: RemoteDepositAccountFormat;
    ShouldShowLinksInEmergeBrowser: boolean;
    RelationshipCodeDepositLimitsEnabled: boolean;
    RelationshipCodeDepositLimits: RelationshipCodeDepositLimit[];
    RelationshipCodeSaveHoldInformationEnabled: boolean;
    RelationshipCodeDetermineReleaseDateByBusinessDays: boolean;
    AlternateCheckHoldsEnabled: boolean;
}

export class RemoteDeposit implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'RemoteDeposit'
    };


            private _ensenta: Ensenta;
            get ensenta(): Ensenta {
                return this._ensenta;
            }
            set ensenta(value: Ensenta) {
                this._ensenta = value;
            }

            private _vertifi: Vertifi;
            get vertifi(): Vertifi {
                return this._vertifi;
            }
            set vertifi(value: Vertifi) {
                this._vertifi = value;
            }

            private _profitStars: ProfitStars;
            get profitStars(): ProfitStars {
                return this._profitStars;
            }
            set profitStars(value: ProfitStars) {
                this._profitStars = value;
            }

            private _serviceType: RemoteDepositServiceType;
            get serviceType(): RemoteDepositServiceType {
                return this._serviceType;
            }
            set serviceType(value: RemoteDepositServiceType) {
                this._serviceType = value;
            }

            private _shouldDelayBeforeStatusUpdate: boolean;
            get shouldDelayBeforeStatusUpdate(): boolean {
                return this._shouldDelayBeforeStatusUpdate;
            }
            set shouldDelayBeforeStatusUpdate(value: boolean) {
                this._shouldDelayBeforeStatusUpdate = value;
            }

            private _shouldCheckReservedCheckingAccountSuffix: boolean;
            get shouldCheckReservedCheckingAccountSuffix(): boolean {
                return this._shouldCheckReservedCheckingAccountSuffix;
            }
            set shouldCheckReservedCheckingAccountSuffix(value: boolean) {
                this._shouldCheckReservedCheckingAccountSuffix = value;
            }

            private _reservedCheckingAccountSuffix: number;
            get reservedCheckingAccountSuffix(): number {
                return this._reservedCheckingAccountSuffix;
            }
            set reservedCheckingAccountSuffix(value: number) {
                this._reservedCheckingAccountSuffix = value;
            }

            private _depositIntoAccountTypes: string;
            get depositIntoAccountTypes(): string {
                return this._depositIntoAccountTypes;
            }
            set depositIntoAccountTypes(value: string) {
                this._depositIntoAccountTypes = value;
            }

            private _remoteDepositAccountFormat: RemoteDepositAccountFormat;
            get remoteDepositAccountFormat(): RemoteDepositAccountFormat {
                return this._remoteDepositAccountFormat;
            }
            set remoteDepositAccountFormat(value: RemoteDepositAccountFormat) {
                this._remoteDepositAccountFormat = value;
            }

            private _shouldShowLinksInEmergeBrowser: boolean;
            get shouldShowLinksInEmergeBrowser(): boolean {
                return this._shouldShowLinksInEmergeBrowser;
            }
            set shouldShowLinksInEmergeBrowser(value: boolean) {
                this._shouldShowLinksInEmergeBrowser = value;
            }

            private _relationshipCodeDepositLimitsEnabled: boolean;
            get relationshipCodeDepositLimitsEnabled(): boolean {
                return this._relationshipCodeDepositLimitsEnabled;
            }
            set relationshipCodeDepositLimitsEnabled(value: boolean) {
                this._relationshipCodeDepositLimitsEnabled = value;
            }

            private _relationshipCodeDepositLimits: RelationshipCodeDepositLimit[];
            get relationshipCodeDepositLimits(): RelationshipCodeDepositLimit[] {
                return this._relationshipCodeDepositLimits;
            }
            set relationshipCodeDepositLimits(value: RelationshipCodeDepositLimit[]) {
                this._relationshipCodeDepositLimits = value;
            }

            private _relationshipCodeSaveHoldInformationEnabled: boolean;
            get relationshipCodeSaveHoldInformationEnabled(): boolean {
                return this._relationshipCodeSaveHoldInformationEnabled;
            }
            set relationshipCodeSaveHoldInformationEnabled(value: boolean) {
                this._relationshipCodeSaveHoldInformationEnabled = value;
            }

            private _relationshipCodeDetermineReleaseDateByBusinessDays: boolean;
            get relationshipCodeDetermineReleaseDateByBusinessDays(): boolean {
                return this._relationshipCodeDetermineReleaseDateByBusinessDays;
            }
            set relationshipCodeDetermineReleaseDateByBusinessDays(value: boolean) {
                this._relationshipCodeDetermineReleaseDateByBusinessDays = value;
            }

            private _alternateCheckHoldsEnabled: boolean;
            get alternateCheckHoldsEnabled(): boolean {
                return this._alternateCheckHoldsEnabled;
            }
            set alternateCheckHoldsEnabled(value: boolean) {
                this._alternateCheckHoldsEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "RemoteDeposit.Ensenta", value: this._ensenta, dataType: 'ensenta', label: "Ensenta" },
                { key: "RemoteDeposit.Vertifi", value: this._vertifi, dataType: 'vertifi', label: "Vertifi" },
                { key: "RemoteDeposit.ProfitStars", value: this._profitStars, dataType: 'profitstars', label: "Profit Stars" },
                { key: "RemoteDeposit.ServiceType", value: this._serviceType, dataType: 'remotedepositservicetype', label: "Service Type" },
                { key: "RemoteDeposit.ShouldDelayBeforeStatusUpdate", value: this._shouldDelayBeforeStatusUpdate, dataType: 'boolean', label: "Should Delay Before Status Update" },
                { key: "RemoteDeposit.ShouldCheckReservedCheckingAccountSuffix", value: this._shouldCheckReservedCheckingAccountSuffix, dataType: 'boolean', label: "Should Check Reserved Checking Account Suffix" },
                { key: "RemoteDeposit.ReservedCheckingAccountSuffix", value: this._reservedCheckingAccountSuffix, dataType: 'number', label: "Reserved Checking Account Suffix" },
                { key: "RemoteDeposit.DepositIntoAccountTypes", value: this._depositIntoAccountTypes, dataType: 'string', label: "Deposit Into Account Types" },
                { key: "RemoteDeposit.RemoteDepositAccountFormat", value: this._remoteDepositAccountFormat, dataType: 'remotedepositaccountformat', label: "Remote Deposit Account Format" },
                { key: "RemoteDeposit.ShouldShowLinksInEmergeBrowser", value: this._shouldShowLinksInEmergeBrowser, dataType: 'boolean', label: "Should Show Links In Emerge Browser" },
                { key: "RemoteDeposit.RelationshipCodeDepositLimitsEnabled", value: this._relationshipCodeDepositLimitsEnabled, dataType: 'boolean', label: "Relationship Code Deposit Limits Enabled" },
                { key: "RemoteDeposit.RelationshipCodeDepositLimits", value: this._relationshipCodeDepositLimits, dataType: 'array<RelationshipCodeDepositLimit>', label: "Relationship Code Deposit Limits" },
                { key: "RemoteDeposit.RelationshipCodeSaveHoldInformationEnabled", value: this._relationshipCodeSaveHoldInformationEnabled, dataType: 'boolean', label: "Relationship Code Save Hold Information Enabled" },
                { key: "RemoteDeposit.RelationshipCodeDetermineReleaseDateByBusinessDays", value: this._relationshipCodeDetermineReleaseDateByBusinessDays, dataType: 'boolean', label: "Relationship Code Determine Release Date By Business Days" },
                { key: "RemoteDeposit.AlternateCheckHoldsEnabled", value: this._alternateCheckHoldsEnabled, dataType: 'boolean', label: "Alternate Check Holds Enabled" },
            ];
        }

}