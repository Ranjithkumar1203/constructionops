using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.WorkLibrary.Commands.CreateWorkScheduleLibrary
{
    public class CreateWorkScheduleLibraryHandler : IRequestHandler<CreateWorkScheduleLibraryCommand, CreateWorkScheduleLibraryResponse>
    {
        private IWorkScheduleLibrary _WorkScheduleLibrary;
        public CreateWorkScheduleLibraryHandler(IWorkScheduleLibrary libray)
        {
            _WorkScheduleLibrary = libray;
        }
        public async Task<CreateWorkScheduleLibraryResponse> Handle(CreateWorkScheduleLibraryCommand request, CancellationToken cancellationToken)
        {
            return _WorkScheduleLibrary.CreateWorkScheduleLibrary(request);
        }
    }
}
