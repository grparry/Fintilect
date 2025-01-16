using System;
using System.Collections.Generic;
using Psi.Data.Models.Domain;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Authentication
{
    public class Authentication
    {
        public List<FeatureAction> FeatureActions { get; set; }

        public Authentication(Guid featurePublicId)
        {
            var clientConfigurationRepository = new ClientConfigurationRepository();
            FeatureActions = clientConfigurationRepository.GetFeatureActions(featurePublicId);
        }
    }

    public class FeatureAction
    {
        public int ActionId { get; set; }
        public Guid PublicId { get; set; }
        public string Name { get; set; }
        public string MinimumApplicationVersion { get; set; }
        public ClientConfigurationRepository.FeatureActionTypeEnum ActionType { get; set; }
        public List<AuthenticationRule> AuthenticationRules { get; set; }
        public bool IsLoginAction { get; set; }
    }
    
    public class AuthenticationRule
    {
        public List<AuthenticationMethod> AuthenticationMethods { get; set; }
        public int NumberOfRequiredMethods { get; set; }
        public int Priority { get; set; }
        public bool IsFallback { get; set; } = false;
    }

    public class AuthenticationMethod
    {
        public int Id { get; set; }
        public Guid PublicId { get; set; }
        public string Name { get; set; }
        public AuthenticationMethodType MethodType { get; set; } = AuthenticationMethodType.Password;
        public string MinimumApplicationVersion { get; set; }
    }
}
