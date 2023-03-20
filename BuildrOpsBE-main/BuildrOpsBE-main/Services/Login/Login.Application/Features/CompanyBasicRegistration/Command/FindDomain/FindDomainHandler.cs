using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindDomain
{
    public class FindDomainHandler : IRequestHandler<FindDomainCommand, FindDomainResponse>
    {
        ICompanyRegistration _CompanyRegistration;
        public FindDomainHandler(ICompanyRegistration CompanyRegistration)
        {
            _CompanyRegistration = CompanyRegistration;
        }

        public async Task<FindDomainResponse> Handle(FindDomainCommand request, CancellationToken cancellationToken)
        {
            return _CompanyRegistration.FindDomain(request);
        }
    }
}
