using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Web.Mvc;
using Psi.Data.Models.Domain.StringResources;

namespace Omega.Presentation.Mvc.Models.StringResources
{
    public class StringResouceModel : ModelBase
    {
        public List<ResourceSet> ResourceSets { get; set; }
    }

    public class GetResourceSetModel : ModelBase
    {
        public List<Resource> Resources { get; set; }
    }

    public class GetResourceModel : ModelBase
    {
        public FullResouce DefaultKey { get; set; }
        public List<FullResouce> Keys { get; set; }

        public FullResouce GetCurrentKey()
        {
            var key = Keys?.Where(x => x.StartAt < DateTime.UtcNow && (!x.EndAt.HasValue || x.EndAt.Value > DateTime.UtcNow)).OrderByDescending(x => x.StartAt).FirstOrDefault();
            return key ?? DefaultKey;
        }
    }

    public class Resource
    {
        public Resource()
        {

        }

        public Resource(Psi.Data.Models.Domain.StringResources.Resource resource)
        {
            ResourceSet = resource.ResourceSet;
            Key = resource.Key;
            Value = resource.Value;
            Culture = resource.Culture;
            DefaultValue = resource.DefaultValue;
            ValueIsNotDefault = resource.ValueIsNotDefault;
            PermissionLevel = resource.PermissionLevel;
            DefaultId = resource.DefaultId;
        }

        public string ResourceSet { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public string Culture { get; set; }
        public string DefaultValue { get; set; }
        public bool ValueIsNotDefault { get; set; }
        public int PermissionLevel { get; set; }
        public int DefaultId { get; set; }
    }

    public class ResourceSet
    {
        public ResourceSet(Psi.Data.Models.Domain.StringResources.ResourceSet resourceSet)
        {
            IsGlobalResource = resourceSet.IsGlobalResource;
            FullName = resourceSet.FullName;
            Group = resourceSet.Group;
            Name = resourceSet.Name;
        }

        public ResourceSet()
        {

        }

        public bool IsGlobalResource { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }
        public string Group { get; set; }
    }

    public class FullResouce
    {
        public FullResouce()
        {

        }
        public FullResouce(Psi.Data.Models.Domain.StringResources.FullResouce resource)
        {
            ResourceSet = resource.ResourceSet;
            Key = resource.Key;
            Value = resource.Value;
            Culture = resource.Culture;
            CreatedAt = resource.CreatedAt;
            StartAt = resource.StartAt;
            EndAt = resource.EndAt;
            Id = resource.Id;
            PermissionLevel = resource.PermissionLevel;
        }
        public string ResourceSet { get; set; }
        public string Key { get; set; }
        [AllowHtml]
        public string Value { get; set; }
        public string Culture { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime StartAt { get; set; }
        public DateTime? EndAt { get; set; }
        public int Id { get; set; }
        public int? PermissionLevel { get; set; }
    }
    public class DefaultResource
    {
        public DefaultResource()
        {

        }

        public int Id { get; set; }
        public string ResourceSet { get; set; }
        public string Key { get; set; }
        [AllowHtml]
        public string Value { get; set; }
        public string Culture { get; set; }
        public int PermissionLevel { get; set; }
    }
}