using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindEmail
{
    public class FindEmailHandler : IRequestHandler<FindEmailCommand, FindEmailResponse>
    {

        ICompanyRegistration _CompanyRegistration;
        public FindEmailHandler(ICompanyRegistration CompanyRegistration)
        {
            _CompanyRegistration = CompanyRegistration;
        }
        public Task<FindEmailResponse> Handle(FindEmailCommand request, CancellationToken cancellationToken)
        {
            return _CompanyRegistration.FindEmail(request);
        }
    }
}
