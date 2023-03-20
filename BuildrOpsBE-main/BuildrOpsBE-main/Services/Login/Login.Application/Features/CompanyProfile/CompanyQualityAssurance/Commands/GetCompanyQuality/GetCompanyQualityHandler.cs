using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyQualityAssurance.Commands.GetCompanyQuality
{
    class GetCompanyQualityHandler:IRequestHandler<GetCompanyQualityCommand,List<GetCompanyQualityResponse>>
    {
        ICompanyProfile _CompanyProfileRepo;
        public GetCompanyQualityHandler(ICompanyProfile CompanyProfile)
        {
            _CompanyProfileRepo = CompanyProfile;
        }

        public async Task<List<GetCompanyQualityResponse>> Handle(GetCompanyQualityCommand request, CancellationToken cancellationToken)
        {
            return _CompanyProfileRepo.getCompanyQuality(request);
        }
    }
}
