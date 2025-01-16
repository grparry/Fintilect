using System;

namespace Omega.Presentation.Mvc.Models.ErrorMessages
{
    public class MeaningfulErrorMessagePresentationModel
    {
        public long Id { get; set; }
        public string Message { get; set;  }
        public DateTime Date { get; set;  }
        public string Type { get; set; }
        public string SubType { get; set;  }
    }
}