using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.Holiday.Commands.DeleteHoliday
{
    public class DeleteHolidayCommand : IRequest<DeleteHolidayResponse>
    {
        public int HolidayId { get; set; }

    }
}
