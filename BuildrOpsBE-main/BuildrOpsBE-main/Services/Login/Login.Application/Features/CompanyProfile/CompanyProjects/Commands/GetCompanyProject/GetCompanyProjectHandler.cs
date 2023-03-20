using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyProjects.Commands.GetCompanyProject
{
    class GetCompanyProjectHandler:IRequestHandler<GetCompanyProjectCommand, List<GetCompanyProjectResponse>>
    {
        ICompanyProfile _CompanyProfileRepo;
        public GetCompanyProjectHandler(ICompanyProfile CompanyProfile)
        {
            _CompanyProfileRepo = CompanyProfile;
        }

        public async Task<List<GetCompanyProjectResponse>> Handle(GetCompanyProjectCommand request, CancellationToken cancellationToken)
        {
            return _CompanyProfileRepo.getCompanyProject(request);
        }
    }
}
