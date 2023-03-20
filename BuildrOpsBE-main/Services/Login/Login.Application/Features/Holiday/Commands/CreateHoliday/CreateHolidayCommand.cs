using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.Holiday.Commands.CreateHoliday
{
    public class CreateHolidayCommand : IRequest<CreateHolidayResponse>
    {
        public int HolidayId { get; set; }
        public int RepeatEveryCount { get; set; }
        public string RepeatEveryTimeline { get; set; }
        public string Expire { get; set; }
        public string Month { get; set; }
        public string DateOfMonth { get; set; }
        public string WeeekOfMonth { get; set; }
        public string DayOfWeek { get; set; }
        public bool ObserveAsWorkDay { get; set; }
        public int ObserveNumberOfDays { get; set; }
        public int CompanyId { get; set; }
        public string AlternateObservation { get; set; }
        public string HolidayName { get; set; }
        public string ObservationDayMethod { get; set; }
        public bool? IsImported { get; set; }
        public string RuleSetting { get; set; }
        public string ExpiryYear { get; set; }
        public string ExpireEvent { get; set; }
        public string ObservedOn { get; set; }
        public bool? IsAdded { get; set; }
        public bool? IsLibrary { get; set; }
    }
}
