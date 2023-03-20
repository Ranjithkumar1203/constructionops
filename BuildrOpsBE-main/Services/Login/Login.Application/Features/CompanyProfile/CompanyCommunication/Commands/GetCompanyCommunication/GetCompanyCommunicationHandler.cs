using BuildrOps.Application.Contracts.Persistence;
using BuildrOps.Application.Features.CompanyProfile.CompanyCommunication.Command.GetCompanyCommunication;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyCommunication.Commands.GetCompanyCommunication
{
   public class GetCompanyCommunicationHandler : IRequestHandler<GetCompanyCommunicationCommand, List<GetCompanyCommunicationResponse>>
    {

        ICompanyProfile _CompanyProfileRepo;
        public GetCompanyCommunicationHandler(ICompanyProfile CompanyProfile)
        {
            _CompanyProfileRepo = CompanyProfile;
        }
        public async Task<List<GetCompanyCommunicationResponse>> Handle(GetCompanyCommunicationCommand request, CancellationToken cancellationToken)
        {
            return _CompanyProfileRepo.getCompanyCommunications(request);
        }
    }
}
