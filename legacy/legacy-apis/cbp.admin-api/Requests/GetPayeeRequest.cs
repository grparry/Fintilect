using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Requests
{
    public class GetPayeeRequest
    {
        public string Address1 { get; set; }  

        public string City { get; set; }

        public string Name { get; set; }

        public string PostalCode { get; set; }

        public string State { get; set; }

        public string UsersAccountAtPayee { get; set; }
    }
}
