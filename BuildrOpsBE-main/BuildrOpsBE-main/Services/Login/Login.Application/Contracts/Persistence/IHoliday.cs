using BuildrOps.Application.Features.Holiday.Commands.PrepopulateCalenderificHoliday;
using Login.Application.Features.Holiday.Commands.CreateHoliday;
using Login.Application.Features.Holiday.Commands.DeleteHoliday;
using Login.Application.Features.Holiday.Commands.GetHoliday;
using Login.Application.Features.Holiday.Commands.UpdateHoliday;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Contracts.Persistence
{
    public interface IHoliday
    {
        public List<GetHolidayResponse> GetHolidayByCompanyId(GetHolidayCommand command);
        public CreateHolidayResponse CreateHoliday(CreateHolidayCommand command);
        public DeleteHolidayResponse DeleteHoliday(DeleteHolidayCommand commad);
        public UpdateHolidayResponse UpdateHoliday(UpdateHolidayCommand command);
        public Task<PrepopulateCalendarificResponse> PopulateHolidaysForCompany(PrepopulateCalendarificCommand command);
    }
}
