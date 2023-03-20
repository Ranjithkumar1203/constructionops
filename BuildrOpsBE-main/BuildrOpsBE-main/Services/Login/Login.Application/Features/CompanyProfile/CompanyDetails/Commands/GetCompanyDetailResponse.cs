using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyDetails.Commands
{
   public class GetCompanyDetailResponse
    {
        public int Id { get; set; }
        public string companyName { get; set; }
        public string CompanyLogo { get; set; }
        public string CompanyTagline { get; set; }
    }
}
