using MediatR;
using System.Runtime.Serialization;

namespace BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindEmail
{
    public class FindEmailCommand : IRequest<FindEmailResponse>
    {
        public string Email { get; set; }
        [IgnoreDataMember]
        public bool IsVerified { get; set; }
    }
}
