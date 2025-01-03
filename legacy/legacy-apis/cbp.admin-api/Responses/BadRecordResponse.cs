using System;

namespace Responses
{
    public class BadRecordResponse
    {
        public int Id { get; set; }

        public string? RecordType { get; set; }

        public string? BadRecordSequenceNumber { get; set; }

        public string? FileType { get; set; }

        public string? BatchNumber { get; set; }

        public string? LineNumber { get; set; }

        public string? ColumnNumber { get; set; }

        public string? ErrorMessage { get; set; }

        public string? MissingFieldValue { get; set; }

        public DateTime Created { get; set; }
    }
}
