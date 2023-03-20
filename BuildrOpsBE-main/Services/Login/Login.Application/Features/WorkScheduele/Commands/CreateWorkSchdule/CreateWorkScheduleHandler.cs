using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.WorkScheduele.Commands.CreateWorkSchdule
{
    public class CreateWorkScheduleHandler : IRequestHandler<CreateWrokScheduleCommand,CreateWorkSchduleResponse>
    {
        IWorkSchedule _WorkSchduleRepo;
        public CreateWorkScheduleHandler(IWorkSchedule schedule)
        {
            _WorkSchduleRepo = schedule;
        }
       
        public async Task<CreateWorkSchduleResponse> Handle(CreateWrokScheduleCommand request, CancellationToken cancellationToken)
        {
            return _WorkSchduleRepo.CreateWorkSchdule(request);
        }
    }
}
