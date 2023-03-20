using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.HolidayLibrary.Commands.GetHolidayLibrary
{
    public class GetHolidayLibraryCommand : IRequest<List<GetHolidayLibraryResponse>>
    {
        public int CompanyId { get; set; }

    }
}
