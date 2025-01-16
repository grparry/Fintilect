namespace Psi.Data.Models.ClientConfigurationModels.BusinessBanking
{
    public enum TieredAccessFeature
    { 
        MasterUserOnly = -1,
        Transfer = 1,
        ScheduledTransfer = 2,
        ExportHistory = 3,
        EStatements = 4,
        BillPay = 5,
        RemoteDeposit = 6,
        CheckWithdrawal = 7,
        SecureMessaging = 8,
        LinkedAccounts = 9,
        CreditCardDetails = 10,
        UninsuredInvestDetails = 11,
        CreditScore = 12,
        EDocuments = 13,
        QuickAccess = 14,
        StopPayments = 15
    }
}