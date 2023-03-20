using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyImages.Commands.GetCompanyImage
{
    class GetCompanyImageHandler : IRequestHandler<GetCompanyImageCommand, List<GetCompanyImageResponse>>
    {
        ICompanyProfile _CompanyProfileRepo;
        public GetCompanyImageHandler(ICompanyProfile CompanyProfile)
        {
            _CompanyProfileRepo = CompanyProfile;
        }
        public async Task<List<GetCompanyImageResponse>> Handle(GetCompanyImageCommand request, CancellationToken cancellationToken)
        {
            return _CompanyProfileRepo.getCompanyImage(request);
        }
    }
}
