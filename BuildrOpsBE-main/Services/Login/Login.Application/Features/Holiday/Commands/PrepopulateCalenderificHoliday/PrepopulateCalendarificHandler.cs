using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Holiday.Commands.PrepopulateCalenderificHoliday
{
    public class PrepopulateCalendarificHandler : IRequestHandler<PrepopulateCalendarificCommand, PrepopulateCalendarificResponse>
    {

        IHoliday _HolidayRepo;
        public PrepopulateCalendarificHandler(IHoliday holiday)
        {
            _HolidayRepo = holiday;
        }

        public async Task<PrepopulateCalendarificResponse> Handle(PrepopulateCalendarificCommand request, CancellationToken cancellationToken)
        {
            return await _HolidayRepo.PopulateHolidaysForCompany(request);
        }
    }
}
