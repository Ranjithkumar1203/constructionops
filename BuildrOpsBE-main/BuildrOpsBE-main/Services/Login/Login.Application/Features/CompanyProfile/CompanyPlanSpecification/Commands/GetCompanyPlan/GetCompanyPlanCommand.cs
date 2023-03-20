using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyPlanSpecification.Commands.GetCompanyPlan
{
   public class GetCompanyPlanCommand:IRequest<List<GetCompanyPlanResponse>>
    {
        public int CompanyId { get; set; }
    }
}
