using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Login.Commands.ForgetPasswordKeyVerification
{
    public class ForgetPasswordKeyVerificationCommand : IRequest<ForgetPasswordKeyVerificationResponse>
    {
        public string EmailKey { get; set; }
        
    }
}
