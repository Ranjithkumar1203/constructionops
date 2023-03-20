using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.WorkScheduele.Commands.GetWorkSchedule
{
    public class GetWorkScheduleCommandHandler : IRequestHandler<WorkSchduleCommand, List<WorkScheduleResponse>>
    {

        IWorkSchedule _WorkSchduleRepo;
        public GetWorkScheduleCommandHandler(IWorkSchedule schedule)
        {
            _WorkSchduleRepo = schedule;
        }

        public async Task<List<WorkScheduleResponse>> Handle(WorkSchduleCommand request, CancellationToken cancellationToken)
        {
            return _WorkSchduleRepo.GetScheduleByCompanyId(request);
        }
    }
}
