// Generated imports
import { Ensenta } from './Ensenta';
import { Vertifi } from '../Vertifi';
import { ProfitStars } from './ProfitStars';
import { [RemoteDepositServiceType](../../../RemoteDepositServiceType.md) } from '../[RemoteDepositServiceType](../../../RemoteDepositServiceType.md)';
import { RemoteDepositAccountFormat } from '../RemoteDepositAccountFormat';
import { RelationshipCodeDepositLimits } from '../RelationshipCodeDepositLimits';

export interface RemoteDeposit {
    ensenta: Ensenta;
    vertifi: Vertifi;
    profitStars: ProfitStars;
    /** @settingKey RemoteDeposit.ServiceName */
    remoteDepositServiceType: [RemoteDepositServiceType](../../../RemoteDepositServiceType.md);
    /** @settingKey RemoteDeposit.StatusUpdate.ShouldDelayBeforeStatusUpdate */
    shouldDelayBeforeStatusUpdate: boolean;
    /** @settingKey RemoteDeposit.ShouldCheckReservedCheckingAccountSuffix */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Some credit unions (RVCU) have a suffix that is reserved for checking accounts, if this config is enabled then we will also check that suffix when determining if a remote deposit is to a checking account
     * /// /// </summary>
     * /// </summary>
     */
    shouldCheckReservedCheckingAccountSuffix: boolean;
    /** @settingKey RemoteDeposit.ReservedCheckingAccountSuffix */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Some credit unions (RVCU) have a suffix that is reserved for checking accounts, This config defines what the reserved suffix is.
     * /// /// </summary>
     * /// </summary>
     */
    reservedCheckingAccountSuffix: number;
    /** @settingKey RemoteDeposit.DepositIntoAccountTypes */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Account Types - Deposit into
     * /// /// </summary>
     * /// </summary>
     */
    depositIntoAccountTypes: string;
    /** @settingKey X.App.HomeBanking.RemoteDepositAccountFormat */
    remoteDepositAccountFormat: RemoteDepositAccountFormat;
    /** @settingKey RemoteDeposit.ShouldShowLinksInEmergeBrowser */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Some credit unions have remote deposit for their mobile apps, but not for browser. If true, show links to remote deposit in Emerge Browser views.
     * /// /// </summary>
     * /// </summary>
     */
    shouldShowLinksInEmergeBrowser: boolean;
    /** @settingKey RemoteDeposit.RelationshipCodeDepositLimits.Enabled */
    relationshipCodeDepositLimitsEnabled: boolean;
    /** @settingKey RemoteDeposit.RelationshipCodeDepositLimits */
    list: RelationshipCodeDepositLimits;
    /** @settingKey RemoteDeposit.RelationshipCode.SaveHoldInformationEnabled */
    relationshipCodeSaveHoldInformationEnabled: boolean;
    /** @settingKey RemoteDeposit.RelationshipCode.DetermineReleaseDateByBusinessDays */
    relationshipCodeDetermineReleaseDateByBusinessDays: boolean;
    /** @settingKey RemoteDeposit.AlternateCheckHolds.Enabled */
    alternateCheckHoldsEnabled: boolean;
}
