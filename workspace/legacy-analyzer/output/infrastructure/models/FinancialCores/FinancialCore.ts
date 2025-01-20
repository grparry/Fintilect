// Generated imports
import { FinancialCoreTypes } from '../FinancialCoreTypes';
import { Corelation } from './Corelation';
import { Epl } from './Epl';
import { DNA } from './DNA';
import { PsiCore } from '../PsiCore';
import { Symitar } from '../Symitar';
import { Summit } from '../Summit';
import { Notes } from '../FinancialCores/CorelationSettings/Notes';

export interface FinancialCore {
    /** @settingKey FinancialCore.CoreType */
    financialCoreTypes: FinancialCoreTypes;
    /** @settingKey FinancialCore.UseClassicCore */
    useClassicCore: boolean;
    /** @settingKey FinancialCore.ShouldBypassICoreForAccountInquiry */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If this setting is true, the classic to financial core account inquiry mapper will just pass the classic homebanking xlate right through without mapping it from classic to ICore, to classic again.
     * /// /// </summary>
     * /// </summary>
     */
    shouldBypassICoreForAccountInquiry: boolean;
    /** @settingKey FinancialCore.ShouldBypassICoreForScheduledTransfers */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If this setting is true, the classic to financial core sched transfer drive mapper and sched transfer drive cc mapper will just
     * /// /// pass the classic homebanking xlate right through without mapping it from classic to ICore, to classic again.
     * /// /// </summary>
     * /// </summary>
     */
    shouldBypassICoreForScheduledTransfers: boolean;
    /** @settingKey FinancialCore.ClassicCores.ShouldMapPasswordDuringAccountInquiry */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If this setting is true, the password will be mapped to the Financial core Mapper (Symitar, DNA, EPL, Murcury, or Summit).
     * /// /// This setting should be set to false for the Symitar core, and should probably be set to false for the other classic cores, but that needs to be tested.
     * /// /// Setting the password value in an account inquiry triggers a core login attempt (at least it does for symitar).  A core login attempt is already handled later on when CommandManager.VerifyAudioPin is called.
     * /// /// We need to verify if not mapping the passwrod will cause problems for other classic mapper cores.  Once we have verified this, we can deprecate this setting.
     * /// /// Mapping the password during account inquiry is causing multiple core login attempts on the Symitar core and locking out users too fast.  Though it has not been reported,
     * /// /// it may be causing similar problems on other cores.
     * /// /// </summary>
     * /// </summary>
     */
    shouldMapPasswordDuringAccountInquiry: boolean;
    /** @settingKey FinancialCore.CoreConnectionString */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If PSICore is selected as CoreType, then use this if not empty or null, otherwise will use sqldev
     * /// /// </summary>
     * /// </summary>
     */
    coreConnectionString: string;
    /** @settingKey FinacialCore.Caching.CacheAccountInquiry */
    cacheAccountInquiry: boolean;
    /** @settingKey FinancialCore.Caching.CacheAccountInquiryForClassicCores */
    cacheAccountInquiryForClassicCores: boolean;
    /** @settingKey FinacialCore.Caching.CacheAccountInquiryWaitForSeconds */
    cacheAccountInquiryWaitForSeconds: number;
    /** @settingKey FinacialCore.Caching.CacheExpireInMinutes */
    cacheExpireInMinutes: number;
    /** @settingKey FinacialCore.Throttle.AccountInquiry */
    throttleAccoutInquiry: number;
    corelation: Corelation;
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Configuration settings for the EPL core.
     * /// /// </summary>
     * /// </summary>
     */
    epl: Epl;
    dNA: DNA;
    psiCore: PsiCore;
    symitar: Symitar;
    summit: Summit;
    notes: Notes;
}
