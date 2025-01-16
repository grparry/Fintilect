using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Omega.Presentation.Mvc.Models.AppConfig
{
    public class AppConfigModel : ModelBase
    {
        public List<AppConfig> Configs { get; set; }
    }

    public class GetConfigSettingModel : ModelBase
    {
        public bool ConfigChanged { get; set; }
        public AppConfig Config { get; set; }
    }

    public class GetConfigSettingDetialModel : ModelBase
    {
        public bool ConfigChanged { get; set; }
        public AppConfigDetail Config { get; set; }
    }

    public class SaveAppConfigRequest
    {
        public string Name { get; set; }
        [AllowHtml]
        public string Value { get; set; }
        public AppConfigApplication Application { get; set; }
        public bool ValueIsNull { get; set; }
    }

    public class AppConfig
    {
        public AppConfig()
        {
            
        }
        public AppConfig(Psi.Data.Models.Domain.AppConfig config)
        {
            Name = config.Name;
            Value = config.Value;
            IsDefaultValue = config.IsDefaultValue;
            ContextName = config.ContextName;
            Application = GetApplication(config.Application);
        }

        public static AppConfigApplication GetApplication(Psi.Data.Models.Domain.AppConfigApplication application)
        {
            switch (application)
            {
                case Psi.Data.Models.Domain.AppConfigApplication.All:
                    return AppConfigApplication.All;
                case Psi.Data.Models.Domain.AppConfigApplication.HomeBanking:
                    return AppConfigApplication.HomeBanking;
                case Psi.Data.Models.Domain.AppConfigApplication.HbBol:
                    return AppConfigApplication.HbBol;
                case Psi.Data.Models.Domain.AppConfigApplication.Jdsl:
                    return AppConfigApplication.Jdsl;
                case Psi.Data.Models.Domain.AppConfigApplication.HbAdminBol:
                    return AppConfigApplication.HbAdminBol;
                case Psi.Data.Models.Domain.AppConfigApplication.TwoWaySMS:
                    return AppConfigApplication.TwoWaySMS;
                default:
                    throw new ArgumentOutOfRangeException(nameof(application), application, null);
            }
        }

        public static Psi.Data.Models.Domain.AppConfigApplication GetApplication(AppConfigApplication application)
        {
            switch (application)
            {
                case AppConfigApplication.All:
                    return Psi.Data.Models.Domain.AppConfigApplication.All;
                case AppConfigApplication.HomeBanking:
                    return Psi.Data.Models.Domain.AppConfigApplication.HomeBanking;
                case AppConfigApplication.HbBol:
                    return Psi.Data.Models.Domain.AppConfigApplication.HbBol;
                case AppConfigApplication.Jdsl:
                    return Psi.Data.Models.Domain.AppConfigApplication.Jdsl;
                case AppConfigApplication.HbAdminBol:
                    return Psi.Data.Models.Domain.AppConfigApplication.HbAdminBol;
                case AppConfigApplication.TwoWaySMS:
                    return Psi.Data.Models.Domain.AppConfigApplication.TwoWaySMS;
                default:
                    throw new ArgumentOutOfRangeException(nameof(application), application, null);
            }
        }

        public string Name { get; set; }
        public AppConfigApplication Application { get; set; }
        public string Value { get; set; }
        public bool IsDefaultValue { get; set; }
        public string ContextName { get; set; }
    }

    public class AppConfigDetail
    {
        public AppConfigDetail()
        {
            
        }
        public AppConfigDetail(Psi.Data.Models.Domain.AppConfigDetail config)
        {
            Name = config.Name;
            DefaultValue = config.DefaultValue;
            VersionAvaiable = config.VersionAvaiable;
            Deprecated = config.Deprecated;
            CreatedBy = config.CreatedBy;
            CreatedAtUtc = config.CreatedAtUtc;
            WorkItem = config.WorkItem;
            Description = config.Description;
            Application = AppConfig.GetApplication(config.Application);
        }
        public string Name { get; set; }
        public AppConfigApplication Application { get; set; }
        public string VersionAvaiable { get; set; }
        public string Description { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedAtUtc { get; set; }
        public string WorkItem { get; set; }
        public bool Deprecated { get; set; }
        public string DefaultValue { get; set; }
    }

    public enum AppConfigApplication
    {
        All,
        HomeBanking,
        HbBol,
        Jdsl,
        HbAdminBol,
        TwoWaySMS
    }
}