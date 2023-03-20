using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyPlanSpecification.Commands.GetCompanyPlan
{
  public  class GetCompanyPlanHandler:IRequestHandler<GetCompanyPlanCommand, List<GetCompanyPlanResponse>>
    {
        ICompanyProfile _CompanyProfileRepo;
        public GetCompanyPlanHandler(ICompanyProfile CompanyProfile)
        {
            _CompanyProfileRepo = CompanyProfile;
        }

        public async Task<List<GetCompanyPlanResponse>> Handle(GetCompanyPlanCommand request, CancellationToken cancellationToken)
        {
            return _CompanyProfileRepo.getCompanyPlan(request);
        }
    }
}
