namespace Psi.Data.Models.ClientConfigurationModels.CheckImages
{
    public class SimnetConfiguration
    {
        public string OrgAlias { get; set; }
        public string ValidationCode { get; set; }
        public string CheckImageSearchName { get; set; }
        public bool ShouldSearchByAccountNumberInsteadOfMicr { get; set; }
    }
}