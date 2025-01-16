using System;
using System.Collections.Generic;
using System.Linq;
using Psi.Business.ServiceContracts.RequestResponse.MobileConfiguration;
using Psi.Data.Models.Domain;
using AuthenticationMethod = Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Authentication.AuthenticationMethod;
using AuthenticationRule = Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Authentication.AuthenticationRule;

namespace Psi.Data.Models.ClientConfigurationModels
{
    public class ClientConfigurationRepository
    {
        public static readonly List<FeatureActionTypeEnum> OutOfBandActions = new List<FeatureActionTypeEnum>
        {
            FeatureActionTypeEnum.OutOfBandBillPayEnroll,
            FeatureActionTypeEnum.OutOfBandBillPayAccess,
            FeatureActionTypeEnum.OutOfBandBillPayAddPayee,
            FeatureActionTypeEnum.OutOfBandTransferAmount,
            FeatureActionTypeEnum.OutOfBandCreateSubAccount,
            FeatureActionTypeEnum.OutOfBandAddLinkedAccount,
            FeatureActionTypeEnum.OutOfBandLinkedTransferAmount,
            FeatureActionTypeEnum.OutOfBandChangeAddress,
            FeatureActionTypeEnum.OutOfBandChangeEmail
        };

        public List<MobileConfigurations.Authentication.FeatureAction> GetFeatureActions(Guid featurePublicId)
        {
            var agathaResponse = Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetMobileFeatureActionsResponse>(new GetMobileFeatureActionsRequest(0) { FeaturePublicId = featurePublicId });
            var response = new List<MobileConfigurations.Authentication.FeatureAction>();

            foreach (var featureAction in agathaResponse.FeatureActions)
            {
                var newAction = new MobileConfigurations.Authentication.FeatureAction
                {
                    Name = featureAction.Name,
                    ActionId = featureAction.ActionId,
                    PublicId = featureAction.PublicId,
                    MinimumApplicationVersion = featureAction.MinimumApplicationVersion,
                    AuthenticationRules = new List<AuthenticationRule>(),
                    IsLoginAction = featureAction.IsLoginAction ?? false,
                    ActionType = GetActionTypeEnum(featureAction.PublicId.ToString())
                };

                if (OutOfBandActions.Contains(newAction.ActionType))
                {
                    var newRule = new AuthenticationRule
                    {
                        NumberOfRequiredMethods = 1,
                        Priority = 1,
                        AuthenticationMethods = new List<AuthenticationMethod>
                        {
                            new AuthenticationMethod
                            {
                                Id = 6,
                                Name = "Security Code",
                                PublicId = new Guid("de27e57a-a832-43b1-a49e-d9d80d851d72"),
                                MethodType = AuthenticationMethodType.SecurityCode
                            }
                        },
                        IsFallback = false
                    };

                    newAction.AuthenticationRules.Add(newRule);
                }
                else
                {
                    foreach (var authenticationRule in featureAction.AuthenticationRules)
                    {
                        var newRule = new AuthenticationRule
                        {
                            NumberOfRequiredMethods = authenticationRule.NumberOfRequiredMethods,
                            Priority = authenticationRule.Priority,
                            AuthenticationMethods = new List<AuthenticationMethod>(),
                            IsFallback = authenticationRule.IsFallback
                        };

                        foreach (var authenticationMethod in authenticationRule.AuthenticationMethods)
                        {
                            var newMethod = new AuthenticationMethod
                            {
                                Id = authenticationMethod.Id,
                                Name = authenticationMethod.Name,
                                PublicId = authenticationMethod.PublicId,
                                MinimumApplicationVersion = authenticationMethod.MinimumApplicationVersion
                            };
                            newMethod.MethodType = GetMethodTypeEnum(newMethod.PublicId.ToString());
                            newRule.AuthenticationMethods.Add(newMethod);
                        }
                        newAction.AuthenticationRules.Add(newRule);
                    }
                }

                newAction.AuthenticationRules = newAction.AuthenticationRules.OrderBy(x => x.Priority).ToList();
                response.Add(newAction);
            }

            return response;
        }

        public FeatureActionTypeEnum GetActionTypeEnum(string actionPublicId)
        {
            //Using the public ids from the Meta.FeatureAction table to determine what the action type is
            switch (actionPublicId.ToLower())
            {
                case "7c15979d-e1e9-46c2-8dda-e79fc765f47b":
                    return FeatureActionTypeEnum.LoanApplicationLogin;
                case "9863cce5-6ec2-4cf4-8a3f-528535f6ab16":
                    return FeatureActionTypeEnum.LoanPaymentLogin;
                case "eafc3cd7-f6f0-4ab2-808e-780988afde7c":
                    return FeatureActionTypeEnum.BillPayLogin;
                case "62da0e03-7597-45e0-bdde-3d86a7888e38":
                    return FeatureActionTypeEnum.CardControlLogin;
                case "33370f67-dd8d-4df8-a236-28d52e6a8c86":
                    return FeatureActionTypeEnum.CardlyticsOffersLogin;
                case "0297fd8a-b1c2-4ecf-8013-26762087912f":
                    return FeatureActionTypeEnum.RelevantSolutionsOffersLogin;
                case "c47d9cee-2963-4160-af27-e527423b780e":
                    return FeatureActionTypeEnum.CheckingRewardsOffersLogin;
                case "4e28e229-f7ac-492a-a1b3-434d22b0d55e":
                    return FeatureActionTypeEnum.CheckDepositLogin;
                case "d0375900-7822-44eb-a489-6d46b0575832":
                    return FeatureActionTypeEnum.MoneyDesktopLogin;
                case "e6678346-b138-4eeb-96c8-0832ad13feb9":
                    return FeatureActionTypeEnum.SendMoneyLogin;
                case "9311660e-3042-4c09-a545-32d30a42998d":
                    return FeatureActionTypeEnum.AutoLoanCalculatorLogin;
                case "feef81e0-1bcc-4fe9-8474-60c5160a0965":
                    return FeatureActionTypeEnum.EstatementsLogin;
                case "d1a961a9-9c60-4762-9fe8-1c0598e788e3":
                    return FeatureActionTypeEnum.SettingsLogin;
                case "e8f0e7bf-42e2-4d33-8833-1c3338d3df8e":
                    return FeatureActionTypeEnum.AccountsLogin;
                case "a0e3086c-49e1-4865-89a7-1209fe427ed5":
                    return FeatureActionTypeEnum.MiniOaoPurchaseCd;
                case "b95ac8ea-dbad-40cc-ac67-3dc937667699":
                    return FeatureActionTypeEnum.MiniOaoOpenSubAccount;
                case "ec603597-875e-4263-84e2-92b00cd449bb":
                    return FeatureActionTypeEnum.TransfersLogin;
                case "8e93cddf-af2d-4467-b8dd-03cefdfec0dd":
                    return FeatureActionTypeEnum.SavvyMoneyLogin;
                case "8c3cf8b9-23f0-4da5-888d-bf1e4c816833":
                    return FeatureActionTypeEnum.ChangeAccountNicknames;
                case "67380197-3bd9-4cad-8cb4-66cd6e622531":
                    return FeatureActionTypeEnum.StopPayment;
                case "e04620a9-2a1c-429c-92c1-b2336b8b267f":
                    return FeatureActionTypeEnum.HouseHoldingLogin;
                case "615cadf6-da18-4002-a084-49be6a29c61b":
                    return FeatureActionTypeEnum.CardAlertsLogin;
                case "752807e3-1212-47c7-b922-768c092c618e":
                    return FeatureActionTypeEnum.FicoCreditScoreLogin;
                case "692d89fb-1664-4018-a0bf-2ce9c392b4ac":
                    return FeatureActionTypeEnum.BetterLobbyLogin;
                case "534e42f4-94ca-4717-a68a-e76edce1aaa2":
                    return FeatureActionTypeEnum.GoToMyCardLogin;
                case "d30ade9e-f214-4940-82dc-94c12ddde14d":
                    return FeatureActionTypeEnum.LinkedAccountsLogin;
                case "72ecdb42-6ca8-49d8-8275-e2946b5454a0":
                    return FeatureActionTypeEnum.LoanOffersLogin;
                case "4985e035-9749-439b-9645-85d779bb50b9":
                    return FeatureActionTypeEnum.GliaLogin;
                case "48c17cab-7eec-4935-940b-b5149f414467":
                    return FeatureActionTypeEnum.DirectDepositLogin;
                case "cb0dde25-3b51-47c3-97f0-05c9b20a312a":
                    return FeatureActionTypeEnum.TalkativeChatLogin;
                case "28434970-3532-4917-a871-017cf3b3e8b1":
                    return FeatureActionTypeEnum.CreditScoreHistoryLogin;
                case "91a21691-ba56-4e3e-a585-e61cba494aa6":
                    return FeatureActionTypeEnum.OutOfBandBillPayEnroll;
                case "95751ddb-dd0a-43f2-8588-3b45447ad88e":
                    return FeatureActionTypeEnum.OutOfBandBillPayAccess;
                case "060c7917-73cf-4d65-be9a-dd0614e27924":
                    return FeatureActionTypeEnum.OutOfBandBillPayAddPayee;
                case "58e34740-2126-4175-aab9-2e07728fbef2":
                    return FeatureActionTypeEnum.OutOfBandTransferAmount;
                case "e576159c-468c-45f5-9952-760a470fc3e5":
                    return FeatureActionTypeEnum.OutOfBandCreateSubAccount;
                case "1fb6767d-6cd0-43aa-ae87-5f6f1307aa60":
                    return FeatureActionTypeEnum.OutOfBandAddLinkedAccount;
                case "f5792d90-95df-43b0-9136-cb635f7682a6":
                    return FeatureActionTypeEnum.OutOfBandLinkedTransferAmount;
                case "494ec864-bf1a-4e3d-b815-6a83271abf4c":
                    return FeatureActionTypeEnum.OutOfBandChangeAddress;
                case "a401106b-d312-45c7-a396-c4b09d296242":
                    return FeatureActionTypeEnum.OutOfBandChangeEmail;
                default:
                    return FeatureActionTypeEnum.None;
            }
        }

        public AuthenticationMethodType GetMethodTypeEnum(string methodPublicId)
        {
            //Using the public ids from the Meta.AuthenticationMethod table to determine what the method type is
            switch (methodPublicId.ToLower())
            {
                case "fa188bfb-4d4b-4f3c-bf14-2c39c901c43f":
                    return AuthenticationMethodType.Biometric;
                case "c9f63144-d330-4603-a59a-6ef13ac16100":
                    return AuthenticationMethodType.EyeScan;
                case "166c491c-e0c9-44ff-b9a8-0c3629b740ec":
                    return AuthenticationMethodType.Pin;
                case "21d6376c-854c-4a87-8980-f4773a2b1da5":
                    return AuthenticationMethodType.Token;
                case "de27e57a-a832-43b1-a49e-d9d80d851d72":
                    return AuthenticationMethodType.SecurityCode;
                default:
                    return AuthenticationMethodType.Password;
            }
        }
        
        public enum FeatureActionTypeEnum
        {
            None,
            LoanCalculatorLogin,
            LoanApplicationLogin,
            LoanPaymentLogin,
            BillPayLogin,
            CardControlLogin,
            CardlyticsOffersLogin,
            RelevantSolutionsOffersLogin,
            CheckingRewardsOffersLogin,
            CheckDepositLogin,
            MoneyDesktopLogin,
            SendMoneyLogin,
            AutoLoanCalculatorLogin,
            EstatementsLogin,
            SettingsLogin,
            AccountsLogin,
            MiniOaoPurchaseCd,
            MiniOaoOpenSubAccount,
            TransfersLogin,
            SavvyMoneyLogin,
            StopPayment,
            ChangeAccountNicknames,
            HouseHoldingLogin,
            CardAlertsLogin,
            FicoCreditScoreLogin,
            BetterLobbyLogin,
            GoToMyCardLogin,
            LinkedAccountsLogin,
            LoanOffersLogin,
            GliaLogin,
            DirectDepositLogin,
            SynergyEstatementsLogin,
            TalkativeChatLogin,
            CreditScoreHistoryLogin,
            OutOfBandBillPayEnroll,
            OutOfBandBillPayAccess,
            OutOfBandBillPayAddPayee,
            OutOfBandTransferAmount,
            OutOfBandCreateSubAccount,
            OutOfBandAddLinkedAccount,
            OutOfBandLinkedTransferAmount,
            OutOfBandChangeAddress,
            OutOfBandChangeEmail
        }
    }
}
