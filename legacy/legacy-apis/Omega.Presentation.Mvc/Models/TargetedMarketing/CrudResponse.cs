namespace Omega.Presentation.Mvc.Models.TargetedMarketing
{
    public class CrudResponse
    {
        public string ResponseMessage { get; set; }
        public int ResponseCode { get; set; }

        public string ExceptionStackTrace { get; set; }
    }
}