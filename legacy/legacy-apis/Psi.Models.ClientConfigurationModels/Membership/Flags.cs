using System.Collections.Generic;
using System.Linq;

namespace Psi.Data.Models.ClientConfigurationModels.Membership
{
    public class Flags : SettingsBaseHelper
    {

        public Flags(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("X.App.HBBol.HBFlagNumber")]
        public string HBFlagNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.BillPayFlagNumber")]
        public string BillPayFlagNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.BusinessAccountFlag")]
        public string BusinessAccountFlag
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.EStatementFlagNumber")]
        public string EStatementFlagNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ShareRestrictedCheckWithdraw")]
        public List<string> ShareRestrictedCheckWithdraw
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.EDocumentsFlagNumber")]
        public string EDocumentsFlagNumber
        {
            get => GetValue();
            set => SetValue(value);
        }
        [SettingKey("Escheat.UpdateEscheatDate.FlagNumber")]
        public string EscheatDateFlag
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.FreeCheckReorderFlag")]
        public string FreeCheckReorderFlag
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.HasCCFlagNumber")]
        public string HasCCFlagNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.IsDebitCardFlagNumber")]
        public string IsDebitCardFlagNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.IsEmployeeFlagNumber")]
        public string IsEmployeeFlagNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.LoanClosedFlags")]
        public List<string> LoanClosedFlags
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.LoanRestrictedAlerts")]
        public List<string> LoanRestrictedAlerts
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.LoanRestrictedInquire")]
        public List<string> LoanRestrictedInquire
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.MidwestLoansFlag")]
        public string MidwestLoansFlag
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.MobileDepositAllowedFlag")]
        public string MobileDepositAllowedFlag
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.MobileDepositRestrictedFlag")]
        public string MobileDepositRestrictedFlag
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.MobileDepositDisclosureFlag")]
        public string MobileDepositDisclosureFlag
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.obsMemberRestrictedAllTrans")]
        public List<string> obsMemberRestrictedAllTrans
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.obsMemberRestrictedDeposit")]
        public List<string> obsMemberRestrictedDeposit
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.obsMemberRestrictedInquire")]
        public List<string> obsMemberRestrictedInquire
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.obsShareRestrictedDeposit")]
        public List<string> obsShareRestrictedDeposit
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.obsLoanRestrictedDeposit")]
        public List<string> LoanRestrictedDepositFlags
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.obsShareRestrictedInquire")]
        public List<string> obsShareRestrictedInquire
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.obsShareRestrictedWithdraw")]
        public List<string> obsShareRestrictedWithdraw
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.RestrictViewingCardFlagNumber")]
        public string RestrictViewingCardFlagNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ShareClosedFlags")]
        public List<string> ShareClosedFlags
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ShareRestrictedAlerts")]
        public List<string> ShareRestrictedAlerts
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.SkipPayQualifyFlag")]
        public string SkipPayQualifyFlag
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.ValidAddressFlagNumber")]
        public string ValidAddressFlagNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.ValidEmailFlag")]
        public string ValidEmailFlag
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.NSFFlags")]
        public string NsfFlags
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("MemberShip.ShouldUpdateOnlineBankingRegisteredFlag")]
        public bool ShouldUpdateOnlineBankingRegisteredFlag
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("MemberShip.OnlineBankingRegisteredFlag")]
        public string OnlineBankingRegisteredFlag
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}
