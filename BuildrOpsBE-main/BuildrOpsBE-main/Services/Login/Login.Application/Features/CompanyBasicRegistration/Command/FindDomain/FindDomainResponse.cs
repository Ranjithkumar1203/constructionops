using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindDomain
{
    public class FindDomainResponse
    {
        public string message { get; set; }
        public string CompanyName {get;set;}
        public bool isDomainAvailable { get; set; }
    }
}
