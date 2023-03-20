using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyCostControl.Commands.GetCompanyCostControl
{
    class GetCompanyCostControlHandler : IRequestHandler<GetCompanyCostControlCommand, List<GetCompanyCostControlResponse>>
    {
        ICompanyProfile _CompanyProfileRepo;
        public GetCompanyCostControlHandler(ICompanyProfile CompanyProfile)
        {
            _CompanyProfileRepo = CompanyProfile;
        }

        public async Task<List<GetCompanyCostControlResponse>> Handle(GetCompanyCostControlCommand request, CancellationToken cancellationToken)
        {
            return _CompanyProfileRepo.getCompanyCostControl(request);
        }
    }
}
