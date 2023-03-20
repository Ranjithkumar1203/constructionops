using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.HolidayLibrary.Commands.GetHolidayLibrary
{
    public class GetHolidayLibraryHandler : IRequestHandler<GetHolidayLibraryCommand, List<GetHolidayLibraryResponse>>
    {

        IHolidayLibrary _HolidayLibraryRepo;
        public GetHolidayLibraryHandler(IHolidayLibrary holiday)
        {
            _HolidayLibraryRepo = holiday;
        }

        public async Task<List<GetHolidayLibraryResponse>> Handle(GetHolidayLibraryCommand request, CancellationToken cancellationToken)
        {
            return _HolidayLibraryRepo.GetHolidayLibraryByCompanyId(request);
        }
    }
}
