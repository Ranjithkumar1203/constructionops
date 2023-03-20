using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyDetails.Commands
{
   public class GetCompanyDetailCommand :IRequest<GetCompanyDetailResponse>
    {
        public int companyId { get; set; }
    }
}
