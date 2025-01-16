using System;
using Omega.Presentation.Mvc.Business;
using Omega.Presentation.Mvc.Models;
using Psi.Data.Models.Domain.OmegaUsers;
using PSI.Models.ClientConfigurationModels.Agatha;

public static class Extensions
{
    public static string First(this string source, int maxLength)
    {
        if (source == null) return source;
        return source.Length > maxLength ? source.Substring(0, maxLength)+ "..." : source;
    }

    public static string UrlEscape(this string source)
    {
        if (source == null) return source;
        return Uri.EscapeDataString(source);
    }

    public static DateTime ToLocal(this DateTime source)
    {
        return source.AddHours(GetTimeOffset());
    }

    public static DateTime? ToLocal(this DateTime? source)
    {
        if (source.HasValue) return ToLocal(source.Value);
        return null;
    }

    public static DateTime Utc(this DateTime source)
    {
        return source.AddHours(-GetTimeOffset());
    }

    public static DateTime? Utc(this DateTime? source)
    {
        if (source.HasValue) return source.Value.Utc();
        return null;
    }

    private static double GetTimeOffset()
    {
        return SettingsManager.Settings.Institution.ServerUtcOffset;
    }

    public static bool CanView(this PermissionLevel source, PermissionLevel minPermissionLevel)
    {
        return (int)source >= (int)minPermissionLevel;
    }

    public static bool CanView(this PermissionLevel? source, PermissionLevel minPermissionLevel)
    {
        if (source == null) return false;
        return (int)source.Value >= (int)minPermissionLevel;
    }

    public static bool CanView(this PermissionLevel source, int? minPermissionLevel)
    {
        if (!minPermissionLevel.HasValue) return true;
        return (int)source >= minPermissionLevel.Value;
    }

    public static bool CanView(this PermissionLevel? source, int? minPermissionLevel)
    {
        if (!minPermissionLevel.HasValue) return true;
        if (source == null) return false;
        return (int)source.Value >= minPermissionLevel.Value;
    }

    public static bool CanView(this User user, OmegaFeatureAccessPermission permission)
    {
        return user.PermissionGroup == null || user.PermissionGroup.Permissions.Contains(permission);
    }
}
