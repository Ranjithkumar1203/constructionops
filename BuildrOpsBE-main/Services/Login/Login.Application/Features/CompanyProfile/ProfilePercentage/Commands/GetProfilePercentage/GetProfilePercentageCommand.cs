using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.ProfilePercentage.Commands.GetProfilePercentage
{
   public class GetProfilePercentageCommand: IRequest<GetProfilePercentageResponse>
    {
        public int CompanyId { get; set; }
        public int ProfileComplete { get; set; }
    }
}
