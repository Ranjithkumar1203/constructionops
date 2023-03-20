using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.HolidayLibrary.Commands.DeleteHolidayLibrary
{
    public class DeleteHolidayLibraryCommand : IRequest<DeleteHolidayLibraryResponse>
    {
        public int HolidayLibraryId { get; set; }
    }
}
