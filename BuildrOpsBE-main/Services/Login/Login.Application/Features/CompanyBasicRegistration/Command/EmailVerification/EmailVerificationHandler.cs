using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyBasicRegistration.Command.EmailVerification
{
  public  class EmailVerificationHandler : IRequestHandler<EmailVerificationCommand, EmailVerificationResponse>
    {
        ICompanyRegistration _CompanyRegistration;
        public EmailVerificationHandler(ICompanyRegistration CompanyRegistration)
        {
            _CompanyRegistration = CompanyRegistration;
        }

        public async Task<EmailVerificationResponse> Handle(EmailVerificationCommand request, CancellationToken cancellationToken)
        {
            return _CompanyRegistration.EmailVerification(request);
        }
    }
}
