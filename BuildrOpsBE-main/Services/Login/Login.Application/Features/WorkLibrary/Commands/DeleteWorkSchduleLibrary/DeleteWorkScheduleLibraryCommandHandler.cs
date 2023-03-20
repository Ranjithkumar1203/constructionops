using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.WorkLibrary.Commands.DeleteWorkSchduleLibrary
{
    public class DeleteWorkScheduleLibraryCommandHandler : IRequestHandler<DeleteWorkScheduleLibraryCommand, DeleteWorkScheduleLibraryResponse>
    {
        private IWorkScheduleLibrary _WorkScheduleLibrary;
        public DeleteWorkScheduleLibraryCommandHandler(IWorkScheduleLibrary libray)
        {
            _WorkScheduleLibrary = libray;
        }
        public async Task<DeleteWorkScheduleLibraryResponse> Handle(DeleteWorkScheduleLibraryCommand request, CancellationToken cancellationToken)
        {
            return _WorkScheduleLibrary.DeleteWorkSchduleLibrary(request);
        }
    }
}
