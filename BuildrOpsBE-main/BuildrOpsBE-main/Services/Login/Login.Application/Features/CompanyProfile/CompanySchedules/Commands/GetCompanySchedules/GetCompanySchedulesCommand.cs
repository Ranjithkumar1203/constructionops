using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanySchedules.Commands.GetCompanySchedules
{
    public class GetCompanySchedulesCommand : IRequest<List<GetCompanySchedulesResponse>>
    {
        public int CompanyId { get; set; }
    }
}
