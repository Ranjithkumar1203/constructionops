using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.HolidayLibrary.Commands.UpdateHolidayLibrary
{
    class UpdateHolidayLibraryHandler : IRequestHandler<UpdateHolidayLibraryCommand, UpdateHolidayLibraryResponse>
    {

        IHolidayLibrary _HolidayLibraryRepo;
        public UpdateHolidayLibraryHandler(IHolidayLibrary holiday)
        {
            _HolidayLibraryRepo = holiday;
        }

        public async Task<UpdateHolidayLibraryResponse> Handle(UpdateHolidayLibraryCommand request, CancellationToken cancellationToken)
        {
            return _HolidayLibraryRepo.UpdateHolidayLibrary(request);
        }
    }
}

