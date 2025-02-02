import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { FinancialCoreTypes } from '../FinancialCoreTypes';
import { Corelation } from '../Corelation';
import { Epl } from '../Epl';
import { DNA } from '../DNA';
import { PsiCore } from '../PsiCore';
import { Symitar } from '../Symitar';
import { Summit } from '../Summit';
import { Notes } from '../Notes';
export interface FinancialCoreConfig {
    CoreType: FinancialCoreTypes;
    UseClassicCore: boolean;
    ShouldBypassICoreForAccountInquiry: boolean;
    ShouldBypassICoreForScheduledTransfers: boolean;
    ShouldMapPasswordDuringAccountInquiry: boolean;
    CoreConnectionString: string;
    CacheAccountInquiry: boolean;
    CacheAccountInquiryForClassicCores: boolean;
    CacheAccountInquiryWaitForSeconds: number;
    CacheExpireInMinutes: number;
    ThrottleAccoutInquiry: number;
    Corelation: Corelation;
    Epl: Epl;
    DNA: DNA;
    PsiCore: PsiCore;
    Symitar: Symitar;
    Summit: Summit;
    Notes: Notes;
}

export class FinancialCore implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'FinancialCore'
    };


            private _coreType: FinancialCoreTypes;
            get coreType(): FinancialCoreTypes {
                return this._coreType;
            }
            set coreType(value: FinancialCoreTypes) {
                this._coreType = value;
            }

            private _useClassicCore: boolean;
            get useClassicCore(): boolean {
                return this._useClassicCore;
            }
            set useClassicCore(value: boolean) {
                this._useClassicCore = value;
            }

            private _shouldBypassICoreForAccountInquiry: boolean;
            get shouldBypassICoreForAccountInquiry(): boolean {
                return this._shouldBypassICoreForAccountInquiry;
            }
            set shouldBypassICoreForAccountInquiry(value: boolean) {
                this._shouldBypassICoreForAccountInquiry = value;
            }

            private _shouldBypassICoreForScheduledTransfers: boolean;
            get shouldBypassICoreForScheduledTransfers(): boolean {
                return this._shouldBypassICoreForScheduledTransfers;
            }
            set shouldBypassICoreForScheduledTransfers(value: boolean) {
                this._shouldBypassICoreForScheduledTransfers = value;
            }

            private _shouldMapPasswordDuringAccountInquiry: boolean;
            get shouldMapPasswordDuringAccountInquiry(): boolean {
                return this._shouldMapPasswordDuringAccountInquiry;
            }
            set shouldMapPasswordDuringAccountInquiry(value: boolean) {
                this._shouldMapPasswordDuringAccountInquiry = value;
            }

            private _coreConnectionString: string;
            get coreConnectionString(): string {
                return this._coreConnectionString;
            }
            set coreConnectionString(value: string) {
                this._coreConnectionString = value;
            }

            private _cacheAccountInquiry: boolean;
            get cacheAccountInquiry(): boolean {
                return this._cacheAccountInquiry;
            }
            set cacheAccountInquiry(value: boolean) {
                this._cacheAccountInquiry = value;
            }

            private _cacheAccountInquiryForClassicCores: boolean;
            get cacheAccountInquiryForClassicCores(): boolean {
                return this._cacheAccountInquiryForClassicCores;
            }
            set cacheAccountInquiryForClassicCores(value: boolean) {
                this._cacheAccountInquiryForClassicCores = value;
            }

            private _cacheAccountInquiryWaitForSeconds: number;
            get cacheAccountInquiryWaitForSeconds(): number {
                return this._cacheAccountInquiryWaitForSeconds;
            }
            set cacheAccountInquiryWaitForSeconds(value: number) {
                this._cacheAccountInquiryWaitForSeconds = value;
            }

            private _cacheExpireInMinutes: number;
            get cacheExpireInMinutes(): number {
                return this._cacheExpireInMinutes;
            }
            set cacheExpireInMinutes(value: number) {
                this._cacheExpireInMinutes = value;
            }

            private _throttleAccoutInquiry: number;
            get throttleAccoutInquiry(): number {
                return this._throttleAccoutInquiry;
            }
            set throttleAccoutInquiry(value: number) {
                this._throttleAccoutInquiry = value;
            }

            private _corelation: Corelation;
            get corelation(): Corelation {
                return this._corelation;
            }
            set corelation(value: Corelation) {
                this._corelation = value;
            }

            private _epl: Epl;
            get epl(): Epl {
                return this._epl;
            }
            set epl(value: Epl) {
                this._epl = value;
            }

            private _dNA: DNA;
            get dNA(): DNA {
                return this._dNA;
            }
            set dNA(value: DNA) {
                this._dNA = value;
            }

            private _psiCore: PsiCore;
            get psiCore(): PsiCore {
                return this._psiCore;
            }
            set psiCore(value: PsiCore) {
                this._psiCore = value;
            }

            private _symitar: Symitar;
            get symitar(): Symitar {
                return this._symitar;
            }
            set symitar(value: Symitar) {
                this._symitar = value;
            }

            private _summit: Summit;
            get summit(): Summit {
                return this._summit;
            }
            set summit(value: Summit) {
                this._summit = value;
            }

            private _notes: Notes;
            get notes(): Notes {
                return this._notes;
            }
            set notes(value: Notes) {
                this._notes = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "FinancialCore.CoreType", value: this._coreType, dataType: 'financialcoretypes', label: "Core Type" },
                { key: "FinancialCore.UseClassicCore", value: this._useClassicCore, dataType: 'boolean', label: "Use Classic Core" },
                { key: "FinancialCore.ShouldBypassICoreForAccountInquiry", value: this._shouldBypassICoreForAccountInquiry, dataType: 'boolean', label: "Should Bypass I Core For Account Inquiry" },
                { key: "FinancialCore.ShouldBypassICoreForScheduledTransfers", value: this._shouldBypassICoreForScheduledTransfers, dataType: 'boolean', label: "Should Bypass I Core For Scheduled Transfers" },
                { key: "FinancialCore.ShouldMapPasswordDuringAccountInquiry", value: this._shouldMapPasswordDuringAccountInquiry, dataType: 'boolean', label: "Should Map Password During Account Inquiry" },
                { key: "FinancialCore.CoreConnectionString", value: this._coreConnectionString, dataType: 'string', label: "Core Connection String" },
                { key: "FinancialCore.CacheAccountInquiry", value: this._cacheAccountInquiry, dataType: 'boolean', label: "Cache Account Inquiry" },
                { key: "FinancialCore.CacheAccountInquiryForClassicCores", value: this._cacheAccountInquiryForClassicCores, dataType: 'boolean', label: "Cache Account Inquiry For Classic Cores" },
                { key: "FinancialCore.CacheAccountInquiryWaitForSeconds", value: this._cacheAccountInquiryWaitForSeconds, dataType: 'number', label: "Cache Account Inquiry Wait For Seconds" },
                { key: "FinancialCore.CacheExpireInMinutes", value: this._cacheExpireInMinutes, dataType: 'number', label: "Cache Expire In Minutes" },
                { key: "FinancialCore.ThrottleAccoutInquiry", value: this._throttleAccoutInquiry, dataType: 'number', label: "Throttle Accout Inquiry" },
                { key: "FinancialCore.Corelation", value: this._corelation, dataType: 'corelation', label: "Corelation" },
                { key: "FinancialCore.Epl", value: this._epl, dataType: 'epl', label: "Epl" },
                { key: "FinancialCore.DNA", value: this._dNA, dataType: 'dna', label: "D N A" },
                { key: "FinancialCore.PsiCore", value: this._psiCore, dataType: 'psicore', label: "Psi Core" },
                { key: "FinancialCore.Symitar", value: this._symitar, dataType: 'symitar', label: "Symitar" },
                { key: "FinancialCore.Summit", value: this._summit, dataType: 'summit', label: "Summit" },
                { key: "FinancialCore.Notes", value: this._notes, dataType: 'notes', label: "Notes" },
            ];
        }

}