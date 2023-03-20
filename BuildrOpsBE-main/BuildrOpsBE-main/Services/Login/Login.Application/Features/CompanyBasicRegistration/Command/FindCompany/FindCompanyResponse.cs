using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindCompany
{
  public  class FindCompanyResponse
    {
        public string message { get; set; }
        public bool IsCompanyNameAvailable { get; set; }

    }
}
