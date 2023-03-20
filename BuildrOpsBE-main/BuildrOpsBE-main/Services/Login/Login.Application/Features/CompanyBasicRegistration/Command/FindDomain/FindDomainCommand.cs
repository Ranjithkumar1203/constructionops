using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindDomain
{
   public class FindDomainCommand: IRequest<FindDomainResponse>
    {
        public string DomainName { get; set; }
        [IgnoreDataMember]
        public bool IsVerified { get; set; }
        [IgnoreDataMember]
        public string CompanyName { get; set; }
    }
}
