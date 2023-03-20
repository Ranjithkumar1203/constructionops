using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Holiday.Commands.PrepopulateCalenderificHoliday
{
    public class PrepopulateCalendarificCommand : IRequest<PrepopulateCalendarificResponse>
    {
        public int CompanyId { get; set; }

    }
}
