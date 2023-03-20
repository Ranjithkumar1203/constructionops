using Login.Application.Features.HolidayLibrary.Commands.CreateHolidayLibrary;
using Login.Application.Features.HolidayLibrary.Commands.DeleteHolidayLibrary;
using Login.Application.Features.HolidayLibrary.Commands.GetHolidayLibrary;
using Login.Application.Features.HolidayLibrary.Commands.UpdateHolidayLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Contracts.Persistence
{
    public interface IHolidayLibrary
    {
        public List<GetHolidayLibraryResponse> GetHolidayLibraryByCompanyId(GetHolidayLibraryCommand command);
        public CreateHolidayLibraryResponse CreateHolidayLibrary(CreateHolidayLibraryCommand command);
        public UpdateHolidayLibraryResponse UpdateHolidayLibrary(UpdateHolidayLibraryCommand command);
        public DeleteHolidayLibraryResponse DeleteHolidayLibrary(DeleteHolidayLibraryCommand command);
    }
}
