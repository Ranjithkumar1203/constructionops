using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyUsers.Commands.GetCompanyUser
{
   public class GetCompanyUserHandler:IRequestHandler<GetCompanyUserCommand, List<GetCompanyUserResponse>>

    {
        ICompanyProfile _CompanyProfileRepo;
        public GetCompanyUserHandler(ICompanyProfile CompanyProfile)
        {
            _CompanyProfileRepo = CompanyProfile;
        }

        public async Task<List<GetCompanyUserResponse>> Handle(GetCompanyUserCommand request, CancellationToken cancellationToken)
        {
            return _CompanyProfileRepo.getCompanyUser(request);
        }
    }
}
