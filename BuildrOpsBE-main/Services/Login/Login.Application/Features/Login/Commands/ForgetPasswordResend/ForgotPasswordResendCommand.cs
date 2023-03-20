using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Login.Commands.ForgetPasswordResend
{
  public  class ForgotPasswordResendCommand:IRequest<ForgotPasswordResendResponse>
    {
        [IgnoreDataMember]
        public int Id { get; set; }
        public string EmailId { get; set; }
        [IgnoreDataMember]
        public string EmailKey { get; set; }
        [IgnoreDataMember]
        public string FirstName { get; set; }
        [IgnoreDataMember]
        public string LastName { get; set; }
    }
}
