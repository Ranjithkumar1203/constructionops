using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.Holiday.Commands.GetHoliday
{
    public class GetHolidayCommand : IRequest<List<GetHolidayResponse>>
    {
        public int CompanyId { get; set; }

    }
}
