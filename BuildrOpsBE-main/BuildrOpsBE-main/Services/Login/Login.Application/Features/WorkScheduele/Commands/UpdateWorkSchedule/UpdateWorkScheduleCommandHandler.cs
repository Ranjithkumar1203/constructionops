using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.WorkScheduele.Commands.UpdateWorkSchedule
{
    class UpdateWorkScheduleCommandHandler : IRequestHandler<UpdateWorkScheduleCommand, UpdateWorkScheduleResponse>
    {
        IWorkSchedule _WorkSchduleRepo;
        public UpdateWorkScheduleCommandHandler(IWorkSchedule workSchedule)
        {
            _WorkSchduleRepo = workSchedule;
        }
        public async Task<UpdateWorkScheduleResponse> Handle(UpdateWorkScheduleCommand request, CancellationToken cancellationToken)
        {
            return _WorkSchduleRepo.UpdateWorkSchedule(request);
        }
    }
}
