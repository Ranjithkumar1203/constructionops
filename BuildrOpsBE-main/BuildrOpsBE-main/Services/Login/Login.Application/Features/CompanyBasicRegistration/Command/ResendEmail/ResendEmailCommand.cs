using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyBasicRegistration.Command.ResendEmail
{
   public class ResendEmailCommand : IRequest<ResendEmailResponse>
    {
        public string Email { get; set; }
        [IgnoreDataMember]
        public string EmailKey { get; set; }
        [IgnoreDataMember]
        public string CompanyName { get; set; }
        [IgnoreDataMember]
        public string DomainName { get; set; }
    }
}
