using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyCustomers.Commands.GetCompanyCustomers
{

    class GetCompanyCustomersHandler:IRequestHandler<GetCompanyCustomerscommand, List<GetCompanyCustomersResponse>>
    {
        ICompanyProfile _CompanyProfileRepo;
        public GetCompanyCustomersHandler(ICompanyProfile CompanyProfile)
        {
            _CompanyProfileRepo = CompanyProfile;
        }

        public async Task<List<GetCompanyCustomersResponse>> Handle(GetCompanyCustomerscommand request, CancellationToken cancellationToken)
        {
            return _CompanyProfileRepo.getCompanyCustomers(request); 
        }
    }
}
