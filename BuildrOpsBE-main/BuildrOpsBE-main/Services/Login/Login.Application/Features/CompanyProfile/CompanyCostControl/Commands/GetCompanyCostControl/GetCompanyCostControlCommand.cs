using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyCostControl.Commands.GetCompanyCostControl
{
   public class GetCompanyCostControlCommand:IRequest<List<GetCompanyCostControlResponse>>
    {
        public int CompanyId { get; set; }
        
    }
}
