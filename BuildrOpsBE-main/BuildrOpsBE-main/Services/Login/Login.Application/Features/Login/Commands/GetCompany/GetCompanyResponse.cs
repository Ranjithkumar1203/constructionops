using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Login.Commands.GetCompany
{
   public class GetCompanyResponse
    {
        public string CompanyName { get; set; }
        public string CompanyLogo { get; set; }
        public string CompanyTagline { get; set; }
    }
}
