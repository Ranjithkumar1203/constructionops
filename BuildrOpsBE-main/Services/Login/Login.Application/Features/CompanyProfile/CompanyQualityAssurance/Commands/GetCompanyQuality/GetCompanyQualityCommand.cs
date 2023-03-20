using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyQualityAssurance.Commands.GetCompanyQuality
{
  public  class GetCompanyQualityCommand:IRequest<List<GetCompanyQualityResponse>>
    {
        public int CompanyId { get; set; }
    }
}
