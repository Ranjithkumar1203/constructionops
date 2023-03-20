using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyDetails.Commands
{
    class GetCompanyDetailHandler:IRequestHandler<GetCompanyDetailCommand,GetCompanyDetailResponse>
    {
        ICompanyProfile _CompanyProfileRepo;
        public GetCompanyDetailHandler(ICompanyProfile CompanyProfile)
        {
            _CompanyProfileRepo = CompanyProfile;
        }

        public async Task<GetCompanyDetailResponse> Handle(GetCompanyDetailCommand request, CancellationToken cancellationToken)
        {
            return await _CompanyProfileRepo.getCompanyDetails(request);
        }
    }
}
