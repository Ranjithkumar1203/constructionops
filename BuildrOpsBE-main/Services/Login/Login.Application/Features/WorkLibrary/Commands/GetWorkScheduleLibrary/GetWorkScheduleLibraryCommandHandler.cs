using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.WorkLibrary.Commands.GetWorkScheduleLibrary
{
    class GetWorkScheduleLibraryCommandHandler : IRequestHandler<GetWorkScheduleLibraryCommand, List<GetWorkScheduleLibraryResponse> >
    {
        IWorkScheduleLibrary _WorkScheduleLibray;
        public GetWorkScheduleLibraryCommandHandler(IWorkScheduleLibrary library)
        {
            _WorkScheduleLibray = library;
        }

        public async Task<List<GetWorkScheduleLibraryResponse>> Handle(GetWorkScheduleLibraryCommand request, CancellationToken cancellationToken)
        {
            return _WorkScheduleLibray.GetWorkScheduleLibraryById(request);
        }
    }
}
