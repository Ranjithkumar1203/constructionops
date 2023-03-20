using BuildrOps.Application.Features.CompanyProfile.CompanyCommunication.Commands.GetCompanyCommunication;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyCommunication.Command.GetCompanyCommunication
{
   public class GetCompanyCommunicationCommand:IRequest<List<GetCompanyCommunicationResponse>>
    {
        public int CompanyId { get; set; }
    }
}
