using MediatR;

namespace BuildrOps.Application.Features.CompanyBasicRegistration.Command.EmailVerification
{
    public class EmailVerificationCommand : IRequest<EmailVerificationResponse>
    {
       public string CompanyRegisterKey { get; set; }
    }
}
