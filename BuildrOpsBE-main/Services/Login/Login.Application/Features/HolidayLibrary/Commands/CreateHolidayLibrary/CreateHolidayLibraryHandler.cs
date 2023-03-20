using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.HolidayLibrary.Commands.CreateHolidayLibrary
{
    public class CreateHolidayLibraryHandler : IRequestHandler<CreateHolidayLibraryCommand, CreateHolidayLibraryResponse>
    {

        IHolidayLibrary _HolidayLibraryRepo;
        public CreateHolidayLibraryHandler(IHolidayLibrary holiday)
        {
            _HolidayLibraryRepo = holiday;
        }

        public async Task<CreateHolidayLibraryResponse> Handle(CreateHolidayLibraryCommand request, CancellationToken cancellationToken)
        {
            return _HolidayLibraryRepo.CreateHolidayLibrary(request);
        }
    }
}
