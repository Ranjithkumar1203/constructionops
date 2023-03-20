using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.WorkLibrary.Commands.UpdateWorkSchduleLibrary
{
    class UpdateWorkScheduleLibraryCommandHandler : IRequestHandler<UpdateWorkSchduleLibraryCommand, UpdateWorkScheduleLibraryResponse>
    {
        private IWorkScheduleLibrary _WorkScheduleLibrary;
        public UpdateWorkScheduleLibraryCommandHandler(IWorkScheduleLibrary libray)
        {
            _WorkScheduleLibrary = libray;
        }
        public async Task<UpdateWorkScheduleLibraryResponse> Handle(UpdateWorkSchduleLibraryCommand request, CancellationToken cancellationToken)
        {
            return _WorkScheduleLibrary.UpdateWorkScheduleLibrary(request);
        }
    }
}
