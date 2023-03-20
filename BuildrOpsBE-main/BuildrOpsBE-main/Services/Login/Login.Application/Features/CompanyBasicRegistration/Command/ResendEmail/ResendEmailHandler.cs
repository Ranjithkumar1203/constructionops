using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyBasicRegistration.Command.ResendEmail
{
   public class ResendEmailHandler: IRequestHandler<ResendEmailCommand, ResendEmailResponse>
    {
        ICompanyRegistration _CompanyRegistration;
        public ResendEmailHandler(ICompanyRegistration CompanyRegistration)
        {
            _CompanyRegistration = CompanyRegistration;
        }

        public async  Task<ResendEmailResponse> Handle(ResendEmailCommand request, CancellationToken cancellationToken)
        {
            return await _CompanyRegistration.ResendEmail(request);
        }
    }
}
