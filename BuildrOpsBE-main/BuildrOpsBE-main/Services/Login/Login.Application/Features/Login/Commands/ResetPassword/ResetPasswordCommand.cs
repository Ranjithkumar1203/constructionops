using MediatR;
using System.Runtime.Serialization;

namespace Login.Application.Features.Login.Commands.ResetPassword
{
    public class ResetPasswordCommand : IRequest<ResetPassowrdResponse>
    {
        public string EmailKey { get; set; }
        public string NewPassword { get; set; }
        [IgnoreDataMember]
        public string Email { get; set; }
        public int Id { get; set; }
    }
}
