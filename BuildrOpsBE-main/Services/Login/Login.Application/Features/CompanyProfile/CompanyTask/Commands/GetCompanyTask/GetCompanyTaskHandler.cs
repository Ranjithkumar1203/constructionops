using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyTask.Commands.GetCompanyTask
{
    class GetCompanyTaskHandler:IRequestHandler<GetCompanyTaskCommand, List<GetCompanyTaskResponse>>
    {
        ICompanyProfile _CompanyProfileRepo;
        public GetCompanyTaskHandler(ICompanyProfile CompanyProfile)
        {
            _CompanyProfileRepo = CompanyProfile;
        }

        public async Task<List<GetCompanyTaskResponse>> Handle(GetCompanyTaskCommand request, CancellationToken cancellationToken)
        {
            return _CompanyProfileRepo.getCompanyTast(request);
        }
    }
}
