using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanySchedules.Commands.GetCompanySchedules
{
    class GetCompanySchedulesHanlder: IRequestHandler<GetCompanySchedulesCommand, List<GetCompanySchedulesResponse>>
    {
        ICompanyProfile _CompanyProfileRepo;
        public GetCompanySchedulesHanlder(ICompanyProfile CompanyProfile)
        {
            _CompanyProfileRepo = CompanyProfile;
        }

        public async Task<List<GetCompanySchedulesResponse>> Handle(GetCompanySchedulesCommand request, CancellationToken cancellationToken)
        {
            return _CompanyProfileRepo.getCompanySchedules(request);
        }
    }
}
