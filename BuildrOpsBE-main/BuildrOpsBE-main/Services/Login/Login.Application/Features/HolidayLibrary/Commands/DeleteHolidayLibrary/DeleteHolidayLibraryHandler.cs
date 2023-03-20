using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.HolidayLibrary.Commands.DeleteHolidayLibrary
{
    public class DeleteHolidayLibraryHandler : IRequestHandler<DeleteHolidayLibraryCommand, DeleteHolidayLibraryResponse>
    {

        IHolidayLibrary _HolidayLibraryRepo;
        public DeleteHolidayLibraryHandler(IHolidayLibrary holiday)
        {
            _HolidayLibraryRepo = holiday;
        }

        public async Task<DeleteHolidayLibraryResponse> Handle(DeleteHolidayLibraryCommand request, CancellationToken cancellationToken)
        {
            return _HolidayLibraryRepo.DeleteHolidayLibrary(request);
        }
    }
}

