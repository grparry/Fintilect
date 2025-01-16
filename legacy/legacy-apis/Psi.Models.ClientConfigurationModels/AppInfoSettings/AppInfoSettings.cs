using System;
using Psi.Data.Models.Domain;

namespace Psi.Data.Models.ClientConfigurationModels.AppInfoSettings
{
    public class AppInfoSettings : SettingsBaseHelper
    {
        public AppInfoSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("X.App.HomeBanking.Alerts2Enabled")]
        public bool Alerts2Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.AllowJoint2JointTransfer")]
        public bool AllowJoint2JointTransfer
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.AllowJoint2JointScheduledTrans")]
        public bool AllowJoint2JointScheduledTrans
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.BusinessBankingEnabled")]
        public bool BusinessBankingEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.CashAdvanceFromCreditCardsEnabled")]
        public bool CashAdvanceFromCreditCardsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.CDRolloverEnabled")]
        public bool CDRolloverEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.CreditKarmaEnabled")]
        public bool CreditKarmaEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.DashboardEnabled")]
        public bool DashboardEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.DebitCardOverDraftEnabled")]
        public bool DebitCardOverDraftEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.DisableCheckWithdraw")]
        public bool DisableCheckWithdraw
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.DisableStopPayments")]
        public bool DisableStopPayments
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.EAlertsMenuItemEnabled")]
        public bool EAlertsMenuItemEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.EnableCancelBillPaySM")]
        public bool EnableCancelBillPaySM
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.EnableCDDistributionScreen")]
        public bool EnableCDDistributionScreen
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.EnableCDPurchaseScreen")]
        public bool EnableCDPurchaseScreen
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.EnableCheckCopy")]
        public bool EnableCheckCopy
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.EnableCheckReorder")]
        public bool EnableCheckReorder
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.EnableCreditCardMenuOption")]
        public bool EnableCreditCardMenuOption
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.EnableCrossAccountScreen")]
        public bool EnableCrossAccountScreen
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.EnableInfoLinkIFrame")]
        public bool EnableInfoLinkIFrame
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.EnableNewSubaccountScreen")]
        public bool EnableNewSubaccountScreen
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.EnableODProtectionScreen")]
        public bool EnableODProtectionScreen
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.EnableUserTransferDescription")]
        public bool EnableUserTransferDescription
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.EnableTravelNotification")]
        public bool EnableTravelNotification
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.EnableWireTransferScreen")]
        public bool EnableWireTransferScreen
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ForceLoginByAccountAlias")]
        public bool ForceLoginByAccountAlias
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.gbCheckImages")]
        public bool gbCheckImages
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.gbScheduledTransfers")]
        public bool gbScheduledTransfers
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.HideAddressLineThreeOnChangeAddressControl")]
        public bool HideAddressLineThreeOnChangeAddressControl
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.HouseholdingCreditCardSSO")]
        public bool HouseholdingCreditCardSSO
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.HouseholdingEnabled")]
        public bool HouseholdingEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.IsBalanceTransferSecMsgEnabled")]
        public bool IsBalanceTransferSecMsgEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.LoansUseExternalLink")]
        public bool LoansUseExternalLink
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.MoneyDeskTopEnabled")]
        public bool MoneyDeskTopEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.SchedTransAchShowFeeDropDown")]
        public bool SchedTransAchShowFeeDropDown
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ShowLostStolenCC")]
        public bool ShowLostStolenCC
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.TransferMonthlyPattern")]
        public bool TransferMonthlyPattern
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.PopEstatementsNewWindowiPad")]
        public bool PopEstatementsNewWindowiPad
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.PSCUInfoLinkOnMain")]
        public bool PSCUInfoLinkOnMain
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.RemoteCapture")]
        public bool RemoteCapture
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.RewardsNowEnabled")]
        public bool RewardsNowEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ShowAddJointOwner")]
        public bool ShowAddJointOwner
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.DisclosureAcceptanceFromDB")]
        public bool DisclosureAcceptanceFromDB
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ShowChangePin")]
        public bool ShowChangePin
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ShowDYOC")]
        public bool ShowDYOC
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ShowEstatementCopyMenuItem")]
        public bool ShowEstatementCopyMenuItem
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ShowInvestOnline")]
        public bool ShowInvestOnline
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ShowIRADistributions")]
        public bool ShowIRADistributions
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ShowLinkedAccounts")]
        public bool ShowLinkedAccounts
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ShowLinkedAchAccounts")]
        public bool ShowLinkedAchAccounts
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ShowMemberDiscounts")]
        public bool ShowMemberDiscounts
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ShowPrepaidVisa")]
        public bool ShowPrepaidVisa
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ShowVisaGiftCard")]
        public bool ShowVisaGiftCard
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.UserNSFDisclosure")]
        public bool UserNSFDisclosure
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.UsePreviousMicrNumber")]
        public bool UsePreviousMicrNumber
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.BusinessCheckReorderURL")]
        public string BusinessCheckReorderURL
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.CashAdvanceFromCreditCardsAdvanceFeePercentage")]
        public string CashAdvanceFromCreditCardsAdvanceFeePercentage
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.CashAdvanceFromCreditCardsMinimumTransactionCost")]
        public string CashAdvanceFromCreditCardsMinimumTransactionCost
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.CreditCardExternalLink")]
        public string CreditCardExternalLink
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.CreditKarmaJointOwner")]
        public string CreditKarmaJointOwner
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.gbBillPayType")]
        public string gbBillPayType
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.gsEstatmentType")]
        public string gsEstatmentType
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.giTransMaxDaily")]
        public string giTransMaxDaily
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.giTransMaxMonthly")]
        public string giTransMaxMonthly
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.giTransMaxWeekly")]
        public string giTransMaxWeekly
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.giTransMaxYearly")]
        public string giTransMaxYearly
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.giMaxHistoryCount")]
        public string giMaxHistoryCount
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.IntraBankRoutingNumber")]
        public string IntraBankRoutingNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.LinkedACHMethod")]
        public string LinkedACHMethod
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.TermsLinkURL")]
        public string TermsLinkURL
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.PWDEncryptionKey")]
        public string PWDEncryptionKey
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.BillPayAccounts")]
        public string BillPayAccounts
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.MICRNumberFirstFourDigits")]
        public string MICRNumberFirstFourDigits
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.MobileBillPayProvider")]
        public string MobileBillPayProvider
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.obsShareRestrictedInquire")]
        public string obsShareRestrictedInquire
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.obsCheckingAccounts")]
        public string obsCheckingAccounts
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.CreditCardHistoryProvider")]
        public string CreditCardHistoryProvider
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.InstitutionDisplayName")]
        public string InstitutionDisplayName
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ScheduledTransfersStartTime")]
        public string ScheduledTransfersStartTime
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ScheduledTransfersStartSpan")]
        public string ScheduledTransfersStartSpan
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.SchedTransDefaultStartTime")]
        public string SchedTransDefaultStartTime
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.SchedTransLinkedAchStartTime")]
        public string SchedTransLinkedAchStartTime
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.MICRNumberLength")]
        public int MICRNumberLength
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.CreditCardSSOType")]
        public CreditCardSsoProvider CreditCardSSOType
        {
            get
            {
                var value = GetValue();

                if (string.IsNullOrWhiteSpace(value))
                {
                    return CreditCardSsoProvider.None;
                }

                value = value.Replace(".", string.Empty);

                return Enum.TryParse(value, true, out CreditCardSsoProvider provider) ? provider : CreditCardSsoProvider.None;
            }
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.HouseholdingPermissionSource")]
        public string HouseholdingPermissionSource
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.CreditCardSsoDisplayType")]
        public string CreditCardSsoDisplayType
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.FISScoreCardDisplayType")]
        public string FISScoreCardDisplayType
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}
