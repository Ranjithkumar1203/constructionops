using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Login.Commands.SetDNS
{
    public class SetDNSCommand : IRequest<SetDNSResponse>
    {
       public string DomainName { get; set; }
    }
}