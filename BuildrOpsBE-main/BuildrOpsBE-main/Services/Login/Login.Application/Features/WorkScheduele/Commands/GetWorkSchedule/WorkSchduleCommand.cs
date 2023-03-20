using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.WorkScheduele.Commands.GetWorkSchedule
{
    public class WorkSchduleCommand : IRequest<List<WorkScheduleResponse>>
    {
        public int CompanyId { get; set; }
    }
}
