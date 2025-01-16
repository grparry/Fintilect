using System;
using System.Linq;
using System.Collections.Generic;
using Omega.Presentation.Mvc.Models.LayeredSecurity;
using Psi.Business.ServiceContracts.RequestResponse.LayeredSecurity;

namespace Omega.Presentation.Mvc.Business
{
    public class LayeredSecurityRepository
    {
        public List<Feature> GetFeatures(string applicationKey)
        {
            var applicationId = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetLayeredSecurityApplicationResponse>(new GetLayeredSecurityApplicationRequest(0) { ApplicationKey = applicationKey }).ApplicationId;
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetLayeredSecurityFeaturesResponse>(new GetLayeredSecurityFeaturesRequest(0) { ApplicationId = applicationId });
            var features = new List<Feature>();

            for (var i = 0; i < response.FeatureIds.Count; i++)
            {
                features.Add(new Feature
                {
                    ApplicationId = applicationId,
                    FeatureId = response.FeatureIds[i],
                    FeatureKey = response.FeatureKeys[i],
                    Name = response.FeatureNames[i],
                    Description = response.FeatureDecriptions[i]
                });
            }

            features = features.OrderBy(x => x.Name).ToList();
            return features;
        }

        public Feature AddFeature(Feature feature)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<AddLayeredSecurityFeatureResponse>(new AddLayeredSecurityFeatureRequest(0) { FeatureId = feature.FeatureId, ApplicationId = feature.ApplicationId, FeatureKey = feature.FeatureKey, Name = feature.Name, Description = feature.Description, IsUserFacing = feature.IsUserFacing });

            if (response.Name != feature.Name)
            {
                return new Feature();
            }

            feature.FeatureId = response.FeatureId;
            return feature;
        }

        public Feature UpdateFeature(Feature feature)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<UpdateLayeredSecurityFeatureResponse>(new UpdateLayeredSecurityFeatureRequest(0) { FeatureId = feature.FeatureId, ApplicationId = feature.ApplicationId, FeatureKey = feature.FeatureKey, Name = feature.Name, Description = feature.Description, IsUserFacing = feature.IsUserFacing });

            return response.Name != feature.Name ? new Feature() : feature;
        }

        public bool DeleteFeature(Feature feature)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<DeleteLayeredSecurityFeatureResponse>(new DeleteLayeredSecurityFeatureRequest(0) { FeatureId = feature.FeatureId, ApplicationId = feature.ApplicationId });

            return response.Successful;
        }

        public List<FeatureAction> GetActions(int featureId)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetLayeredSecurityFeatureActionsResponse>(new GetLayeredSecurityFeatureActionsRequest(0) { FeatureId = featureId });
            var actions = new List<FeatureAction>();

            for (var i = 0; i < response.ActionIds.Count; i++)
            {
                actions.Add(new FeatureAction
                {
                    PublicId = response.PublicIds[i],
                    ActionId = response.ActionIds[i],
                    Name = response.Names[i],
                    Description = response.Descriptions[i],
                    FeatureId = featureId,
                    StrongAuthenticationWeight = response.StrongAuthenticationWeights[i],
                    MinimumApplicationVersion = response.MinimumApplicationVersions[i],
                    IsLoginAction = response.IsLoginAction[i] ?? false
                });
            }

            return actions;
        }

        public FeatureAction AddNewAction(FeatureAction newAction)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<AddLayeredSecurityFeatureActionResponse>(new AddLayeredSecurityFeatureActionRequest(0) { FeatureId = newAction.FeatureId, Name = newAction.Name, Description = newAction.Description, StrongAuthenticationWeight = newAction.StrongAuthenticationWeight, MinimumApplicationVersion = newAction.MinimumApplicationVersion, IsLoginAction = newAction.IsLoginAction });

            if (response.PublicId.IsEmpty())
            {
                return new FeatureAction();
            }

            newAction.PublicId = response.PublicId;
            newAction.ActionId = response.ActionId;
            return newAction;
        }

        public FeatureAction UpdateAction(FeatureAction updateAction)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<UpdateLayeredSecurityFeatureActionResponse>(new UpdateLayeredSecurityFeatureActionRequest(0) { ActionId = updateAction.ActionId, PublicId = updateAction.PublicId, FeatureId = updateAction.FeatureId, Name = updateAction.Name, Description = updateAction.Description, StrongAuthenticationWeight = updateAction.StrongAuthenticationWeight, MinimumApplicationVersion = updateAction.MinimumApplicationVersion, IsLoginAction = updateAction.IsLoginAction });

            return response.PublicId.IsEmpty() ? new FeatureAction() : updateAction;
        }

        public bool DeleteAction(FeatureAction featureAction)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<DeleteLayeredSecurityFeatureActionResponse>(new DeleteLayeredSecurityFeatureActionRequest(0) { PublicId = featureAction.PublicId });

            return response.Successful;
        }

        public List<AuthenticationMethod> GetAuthenticationMethods(bool excludePasswordMethod)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetAuthenticationMethodsResponse>(new GetAuthenticationMethodsRequest(0) { ExcludePasswordMethod = excludePasswordMethod });
            var authenticationMethods = new List<AuthenticationMethod>();

            for (var i = 0; i < response.Id.Count; i++)
            {
                authenticationMethods.Add(new AuthenticationMethod
                {
                    Id = response.Id[i],
                    PublicId = response.PublicId[i],
                    Name = response.Name[i],
                    Description = response.Description[i],
                    Weight = response.Weight[i],
                    MinimumApplicationVersion = response.MinimumApplicationVersion[i]
                });
            }

            return authenticationMethods;
        }

        public AuthenticationMethod AddAuthenticationMethod(AuthenticationMethod newAuthenticationMethod)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<AddAuthenticationMethodResponse>(new AddAuthenticationMethodRequest(0) { Name = newAuthenticationMethod.Name, Description = newAuthenticationMethod.Description, Weight = newAuthenticationMethod.Weight, MinimumApplicationVersion = newAuthenticationMethod.MinimumApplicationVersion });

            if (response.PublicId.IsEmpty())
            {
                return new AuthenticationMethod();
            }

            newAuthenticationMethod.PublicId = response.PublicId;
            newAuthenticationMethod.Id = response.Id;
            return newAuthenticationMethod;
        }

        public AuthenticationMethod UpdateAuthenticationMethod(AuthenticationMethod authenticationMethod)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<UpdateAuthenticationMethodResponse>(new UpdateAuthenticationMethodRequest(0) { Id = authenticationMethod.Id, PublicId = authenticationMethod.PublicId, Name = authenticationMethod.Name, Description = authenticationMethod.Description, Weight = authenticationMethod.Weight, MinimumApplicationVersion = authenticationMethod.MinimumApplicationVersion });

            return response.PublicId.IsEmpty() ? new AuthenticationMethod() : authenticationMethod;
        }

        public bool DeleteMethod(AuthenticationMethod authenticationMethod)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<DeleteAuthenticationMethodResponse>(new DeleteAuthenticationMethodRequest(0) { Id = authenticationMethod.Id, PublicId = authenticationMethod.PublicId });

            return response.Successful;
        }

        public List<AuthenticationRule> GetAuthenticationRules(int actionId)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<GetAuthenticationRulesResponse>(new GetAuthenticationRulesRequest(0) { ActionId = actionId });
            var authenticationRules = new List<AuthenticationRule>();

            for (var i = 0; i < response.Ids.Count; i++)
            {
                authenticationRules.Add(new AuthenticationRule
                {
                    Id = response.Ids[i],
                    PublicId = response.PublicIds[i],
                    ActionId = actionId,
                    AuthenticationMethods = response.AuthenticationMethods[i],
                    TotalWeight = response.TotalWeights[i],
                    NumberOfRequiredMethods = response.NumberOfRequiredMethods[i],
                    Priority = response.Priorities[i]
                });
            }

            return authenticationRules;
        }

        public AuthenticationRule AddAuthenticationRule(AuthenticationRule newAuthenticationRule)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<AddAuthenticationRuleResponse>(new AddAuthenticationRuleRequest(0)
            {
                ActionId = newAuthenticationRule.ActionId,
                AuthenticationMethods = newAuthenticationRule.AuthenticationMethods,
                TotalWeight = newAuthenticationRule.TotalWeight,
                NumberOfRequiredMethods = newAuthenticationRule.NumberOfRequiredMethods
            });

            if (response.PublicId.IsEmpty())
            {
                return new AuthenticationRule();
            }

            newAuthenticationRule.PublicId = response.PublicId;
            newAuthenticationRule.Id = response.Id;
            return newAuthenticationRule;
        }

        public AuthenticationRule UpdateAuthenticationRule(AuthenticationRule authenticationRule)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<UpdateAuthenticationRuleResponse>(new UpdateAuthenticationRuleRequest(0)
            {
                Id = authenticationRule.Id,
                PublicId = authenticationRule.PublicId,
                ActionId = authenticationRule.ActionId,
                AuthenticationMethods = authenticationRule.AuthenticationMethods,
                TotalWeight = authenticationRule.TotalWeight,
                NumberOfRequiredMethods = authenticationRule.NumberOfRequiredMethods,
                Priority = authenticationRule.Priority
            });

            return response.PublicId.IsNotEmpty() ? authenticationRule : new AuthenticationRule();
        }

        public List<AuthenticationRule> SaveAuthenticationRulePriority(List<AuthenticationRule> authenticationRules)
        {
            var request = new SaveAuthenticationRulePriorityRequest(0)
            {
                Ids = new List<int>(),
                PublicIds = new List<Guid>(),
                ActionIds = new List<int>(),
                AuthenticationMethods = new List<string>(),
                TotalWeights = new List<int>(),
                NumberOfRequiredMethods = new List<int>(),
                Priorities = new List<int>()
            };
            foreach (var authenticationRule in authenticationRules)
            {
                request.Ids.Add(authenticationRule.Id);
                request.PublicIds.Add(authenticationRule.PublicId);
                request.ActionIds.Add(authenticationRule.ActionId);
                request.AuthenticationMethods.Add(authenticationRule.AuthenticationMethods);
                request.TotalWeights.Add(authenticationRule.TotalWeight);
                request.NumberOfRequiredMethods.Add(authenticationRule.NumberOfRequiredMethods);
                request.Priorities.Add(authenticationRule.Priority);
            }
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<SaveAuthenticationRulePriorityResponse>(request);

            return response.Success ? authenticationRules : new List<AuthenticationRule>();
        }

        public bool DeleteAuthenticationRule(AuthenticationRule authenticationRule)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<DeleteAuthenticationRuleResponse>(new DeleteAuthenticationRuleRequest(0)
            { Id = authenticationRule.Id, PublicId = authenticationRule.PublicId, ActionId = authenticationRule.ActionId });

            return response.Success;
        }
    }
}