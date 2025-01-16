using System;
using System.Collections.Generic;
using System.Linq;
using JetBrains.Annotations;
using Psi.Data.Models.Domain;
using Psi.Data.Models.Domain.Transfers;

namespace Psi.Data.Models.ClientConfigurationModels.ConnectNative
{
    public class ConnectNativeTransfers : SettingsBaseHelper
    {
        public ConnectNativeTransfers(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("ConnectNative.Transfers.EnableTransfersFromShares")]
        public bool EnableTransfersFromShares
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.EnableTransfersToShares")]
        public bool EnableTransfersToShares
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.EnableTransfersShareToShare")]
        public bool EnableTransfersShareToShare
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.EnableTransfersFromLoans")]
        public bool EnableTransfersFromLoans
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.EnableTransfersToLoans")]
        public bool EnableTransfersToLoans
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.EnableTransfersLoanToShare")]
        public bool EnableTransfersLoanToShare
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.EnableTransfersShareToLoan")]
        public bool EnableTransfersShareToLoan
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.EnableTransfersLoanToLoan")]
        public bool EnableTransfersLoanToLoan
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.EnableTransfersToLinkedAccounts")]
        public bool EnableTransfersToLinkedAccounts
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.EnableTransfersFromLinkedAccounts")]
        public bool EnableTransfersFromLinkedAccounts
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.EnableTransfersShareToLinkedAccount")]
        public bool EnableTransfersShareToLinkedAccount
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.EnableTransfersLoanToLinkedAccount")]
        public bool EnableTransfersLoanToLinkedAccount
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.EnableTransfersLinkedAccountToShare")]
        public bool EnableTransfersLinkedAccountToShare
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.EnableTransfersLinkedAccountToLoan")]
        public bool EnableTransfersLinkedAccountToLoan
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.EnableTransfersToCrossAccounts")]
        public bool EnableTransfersToCrossAccounts
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.EnableTransfersFromCrossAccounts")]
        public bool EnableTransfersFromCrossAccounts
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }
        [SettingKey("ConnectNative.Transfers.EnableTransfersCrossAccountToShare")]
        public bool EnableTransfersCrossAccountToShare
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.EnableTransfersCrossAccountToLoan")]
        public bool EnableTransfersCrossAccountToLoan
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.EnableTransfersShareToCrossAccount")]
        public bool EnableTransfersShareToCrossAccount
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.EnableTransfersLoanToCrossAccount")]
        public bool EnableTransfersLoanToCrossAccount
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.EnableTransfersCrossAccountToCrossAccount")]
        public bool EnableTransfersCrossAccountToCrossAccount
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.EnablePrincipalOnlyOption")]
        public bool EnablePrincipalOnlyOption
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.EnableExtraToPrincipalOption")]
        public bool EnableExtraToPrincipalOption
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.ShouldDisplayPayoffAmount")]
        public bool ShouldDisplayPayoffAmount
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.obsMortgages")]
        public List<string> AllowExtraToPrincipalPaymentLoanCategories
        {
            get => GetListValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.obsLoanAccounts")]
        public List<string> AllowPrincipalOnlyPaymentLoanCategories
        {
            get => GetListValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("X.App.Homebanking.obsACHTransferToAccounts")]
        public List<string> AllowedAchTransferToAccountCategories
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.obsACHTransferFromAccounts")]
        public List<string> AllowedAchTransferFromAccountCategories
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("X.App.Homebanking.obsTransferToAccounts")]
        public List<string> AllowedTransferToAccountCategories
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.obsTransferFromAccounts")]
        public List<string> AllowedTransferFromAccountCategories
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.obsShareRestrictedInquire")]
        public List<string> ShareRestrictedInquireFlags
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.obsShareRestrictedWithdraw")]
        public List<string> ShareRestrictedWithdrawFlags
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.obsShareRestrictedDeposit")]
        public List<string> ShareRestrictedDepositFlags
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.obsLoanRestrictedInquire")]
        public List<string> LoanRestrictedInquireFlags
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.obsLoanRestrictedWithdraw")]
        public List<string> LoanRestrictedWithdrawFlags
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.obsLoanRestrictedDeposit")]
        public List<string> LoanRestrictedDepositFlags
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.ShouldDisplayAccountNicknames")]
        public bool ShouldDisplayAccountNicknames
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.ShouldDisplayRemainingRegDCount")]
        public bool ShouldDisplayRemainingRegDCount
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.LinkedACHInboundFreePerMonth")]
        public int MaxFreeInboundAchTransfersPerMonth
        {
            get => GetIntValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.LinkedACHOutboundFreePerMonth")]
        public int MaxFreeOutboundAchTransfersPerMonth
        {
            get => GetIntValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.IntraBankTransfersOnlyAllowed")]
        public bool IntraBankTransfersOnlyAllowed
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.LinkedACHInboundFee")]
        public Money LinkedAchInboundFee
        {
            get => Money.ParseDollarString(GetValue());
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.LinkedACHOutboundFee")]
        public Money LinkedAchOutboundFee
        {
            get => Money.ParseDollarString(GetValue());
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ACHAllowedTypes")]
        public AchAllowedType AchAllowedTypes
        {
            get => Enum.TryParse(GetValue(), true, out AchAllowedType type) ? type : AchAllowedType.None;
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.PrefilledTransferAmountsEnabled")]
        public bool PrefilledTransferAmountsEnabled
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.PrefilledTransferAmountDefaults")]
        public DefaultTransferAmounts PrefilledTransferAmountDefaults
        {
            get => GetJsonValueOrNull<DefaultTransferAmounts>();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.PrefilledTransferAmountsSortOrder")]
        public List<TransferAmountType> PrefilledTransferAmountsSortOrder
        {
            get
            {
                var allTypes = new List<TransferAmountType>
                {
                    TransferAmountType.Default,
                    TransferAmountType.Previous,
                    TransferAmountType.Payment,
                    TransferAmountType.Payoff
                };
                
                var types = GetListValue();
                if (types == null) return allTypes;

                var result = new List<TransferAmountType>();
                foreach (var type in types)
                {
                    if (Enum.TryParse(type, true, out TransferAmountType transferAmountType))
                    {
                        result.Add(transferAmountType);
                    }
                }

                result.AddRange(allTypes.Except(result));

                return result;
            }
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.MaxNumberOfPrefilledTransferAmounts")]
        public int MaxNumberOfPrefilledTransferAmounts
        {
            get => GetIntValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.CashAdvanceWarningLoanCategories")]
        public List<string> CashAdvanceWarningLoanCategories
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.CashAdvanceFromCreditCardsEnabled")]
        public bool CashAdvanceFromCreditCardsEnabled
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        /// <summary> The first four digits of a MICR number for bill pay </summary>
        [SettingKey("X.App.HomeBanking.MICRNumberFirstFourDigits")]
        public string MicrNumberFirstFourDigitsForBillPay
        {
            get => GetValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("ConnectNative.Transfers.EnableTransfersToCreditCards")]
        public bool EnableTransfersToCreditCards
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }
    }

    public enum AchAllowedType
    {
        None,
        AchIn,
        Both,
        AchOut
    }
}