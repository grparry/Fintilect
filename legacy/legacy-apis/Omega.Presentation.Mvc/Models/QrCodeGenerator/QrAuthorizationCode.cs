using System;

namespace Omega.Presentation.Mvc.Models.QrCodeGenerator
{
    [Obsolete("Model is deprecated as of 2017.2. Use QrAuthCode model instead.")]
    public class QrAuthorizationCode
    {
        public int ClientId { get; set; }
        public string HashedCode { get; set; }
        public string ExpirationDate { get; set; }
    }

    public class QrAuthCode
    {
        public string HashedCode { get; set; }
        public string ExpirationDate { get; set; }
    }
}
