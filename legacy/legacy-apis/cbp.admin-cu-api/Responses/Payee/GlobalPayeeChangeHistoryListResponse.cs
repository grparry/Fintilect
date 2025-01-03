using System.Collections.Generic;

namespace Responses.Payee;

public class GlobalPayeeChangeHistoryListResponse
{
    public List<GlobalPayeeChangeHistoryResponse> Histories { get; set; }
}