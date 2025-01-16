using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System;
using System.Linq;
using System.Runtime.CompilerServices;

namespace Omega.Presentation.Mvc.Models.LayeredSecurity
{
    public class LayeredSecurityViewModel : ModelBase
    {
        [Required]
        [Display(Name = "Features")]
        public List<Feature> Features { get; set; }
        
        [Display(Name = "Feature")]
        public Feature Feature { get; set; }

        [Display(Name = "Feature Action")]
        public FeatureAction FeatureAction { get; set; }
    }

    public class LayeredSecurityFeaturesViewModel : ModelBase
    {
        [Required]
        [Display(Name = "Feature")]
        public Feature Feature { get; set; }
        
        [Display(Name = "Feature Actions")]
        public List<FeatureAction> FeatureActions { get; set; }
        
        [Display(Name = "Feature Action")]
        public FeatureAction FeatureAction { get; set; }
    }

    public class LayeredSecurityActionsViewModel : ModelBase
    {
        [Required]
        [Display(Name = "Feature")]
        public Feature Feature { get; set; }

        [Required]
        [Display(Name = "Feature Action")]
        public FeatureAction FeatureAction { get; set; }

        [Display(Name = "Authentication Rules")]
        public List<AuthenticationRule> AuthenticationRules { get; set; }

        [Required]
        [Display(Name = "Authentication Methods")]
        public List<AuthenticationMethod> AuthenticationMethods { get; set; }
    }

    public class AuthenticationMethodViewModel : ModelBase
    {
        [Required]
        [Display(Name = "Authentication Methods")]
        public List<AuthenticationMethod> AuthenticationMethods { get; set; }

        [Display(Name = "Authentication Method")]
        public AuthenticationMethod AuthenticationMethod { get; set; }
    }

    public class AuthenticationRuleViewModel : ModelBase
    {
        [Required]
        [Display(Name = "Feature Action")]
        public FeatureAction FeatureAction { get; set; }

        [Display(Name = "Authentication Rule")]
        public AuthenticationRule AuthenticationRule { get; set; }

        [Display(Name = "Authentication Methods")]
        public List<AuthenticationMethod> AuthenticationMethods { get; set; }

        [Required]
        public bool NewRule { get; set; }
    }

    public class Feature
    {
        public int ApplicationId { get; set; }
        public int FeatureId { get; set; }
        [Display(Name = "Feature Key")]
        public string FeatureKey { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        [Display(Name = "Show in List")]
        public string IsUserFacing { get; set; } = "True";
    }

    public class FeatureAction
    {
        public int ActionId { get; set; }
        public Guid PublicId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int FeatureId { get; set; }
        [Display(Name = "Strong Authentication Weight")]
        public int StrongAuthenticationWeight { get; set; }
        [Display(Name = "Minimum Application Version")]
        public string MinimumApplicationVersion { get; set; }
        [Display(Name = "Is Login Action")]
        public bool IsLoginAction { get; set; }
    }

    public class FeatureAndAction
    {
        public Feature FeatureAndActionFeature { get; set; }
        public FeatureAction FeatureAndActionFeatureAction { get; set; }
    }
    public class AuthenticationMethod
    {
        public int Id { get; set; }
        public Guid PublicId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Weight { get; set; }
        [Display(Name = "Minimum Application Version")]
        public string MinimumApplicationVersion { get; set; }
    }

    public class AuthenticationRule
    {
        public Guid PublicId { get; set; }
        public int Id { get; set; }
        public int ActionId { get; set; }
        // Comma separated list of AuthenticationMethod Ids
        public string AuthenticationMethods { get; set; }
        public int TotalWeight { get; set; }
        [Display(Name = "Number of Required Methods")]
        public int NumberOfRequiredMethods { get; set; }
        // Lower # = Higher priority
        public int Priority { get; set; }
        public int FeatureId { get; set; }
    }
}