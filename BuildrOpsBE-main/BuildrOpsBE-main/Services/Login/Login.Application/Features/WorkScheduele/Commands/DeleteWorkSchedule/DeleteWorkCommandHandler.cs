using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.WorkScheduele.Commands.DeleteWorkSchedule
{
    class DeleteWorkCommandHandler : IRequestHandler<DeleteWorkCommad, DeleteWorkCommandResponse>
    {
        public IWorkSchedule _WorkSchduleRepo;
        public DeleteWorkCommandHandler(IWorkSchedule workSchedule)
        {
            _WorkSchduleRepo = workSchedule;
        }
        public async Task<DeleteWorkCommandResponse> Handle(DeleteWorkCommad request, CancellationToken cancellationToken)
        {
            return _WorkSchduleRepo.DeleteSchduleWork(request);
        }
    }
}
