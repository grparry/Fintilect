using System;

namespace Omega.Presentation.Mvc.Models.SecurityKeys
{
    public class AddKeyVersionClientModel
    {
        public Guid KeyId { get; set; }

        public string KeyHex { get; set; }

        public string IVHex { get; set; }

        public bool MakeCurrent { get; set; }
    }
}