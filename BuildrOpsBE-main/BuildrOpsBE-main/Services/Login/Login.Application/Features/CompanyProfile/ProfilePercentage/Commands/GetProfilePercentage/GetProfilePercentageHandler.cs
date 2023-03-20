using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.ProfilePercentage.Commands.GetProfilePercentage
{
   public class GetProfilePercentageHandler:IRequestHandler<GetProfilePercentageCommand,GetProfilePercentageResponse>
    {
        ICompanyProfile _CompanyProfileRepo;
        public GetProfilePercentageHandler(ICompanyProfile CompanyProfile)
        {
            _CompanyProfileRepo = CompanyProfile;
        }

        public  Task<GetProfilePercentageResponse> Handle(GetProfilePercentageCommand request, CancellationToken cancellationToken)
        {
            return _CompanyProfileRepo.getProfilePercentage(request);
        }
    }
}
