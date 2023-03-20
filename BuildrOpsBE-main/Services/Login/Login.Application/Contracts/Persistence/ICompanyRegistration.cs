using BuildrOps.Application.Features.CompanyBasicRegistration;
using BuildrOps.Application.Features.CompanyBasicRegistration.Command.CompanyBasicRegistration;
using BuildrOps.Application.Features.CompanyBasicRegistration.Command.EmailVerification;
using BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindCompany;
using BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindDomain;
using BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindEmail;
using BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindUserName;
using BuildrOps.Application.Features.CompanyBasicRegistration.Command.ResendEmail;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BuildrOps.Application.Contracts.Persistence
{
    public interface ICompanyRegistration
    {
        public Task<CompanyBasicRegistrationResponse> CompanyRegistration(CompanyBasicRegistrationCommand command);
        public EmailVerificationResponse EmailVerification(EmailVerificationCommand command);
        public FindCompanyResponse FindCompany(FindCompanyCommand command);
        public FindUserNameResponse FindUserName(FindUserNameCommand command);
        public FindDomainResponse FindDomain(FindDomainCommand command);
        public Task<ResendEmailResponse>  ResendEmail(ResendEmailCommand command);


        public Task<FindEmailResponse> FindEmail(FindEmailCommand command);

    }
}
