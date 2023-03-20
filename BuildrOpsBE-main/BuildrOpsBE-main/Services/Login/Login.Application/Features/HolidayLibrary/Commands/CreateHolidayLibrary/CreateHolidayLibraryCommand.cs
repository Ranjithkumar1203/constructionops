using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.HolidayLibrary.Commands.CreateHolidayLibrary
{
    public class CreateHolidayLibraryCommand : IRequest<CreateHolidayLibraryResponse>
    {
        public int RepeatEveryCount { get; set; }
        public string RepeatEveryTimeline { get; set; }
        public string Expire { get; set; }
        public string Month { get; set; }
        public string DateOfMonth { get; set; }
        public string WeeekOfMonth { get; set; }
        public string DayOfWeek { get; set; }
        public bool ObserverAsWorkDay { get; set; }
        public int ObserveNumberOfDays { get; set; }
        public string AlternateObservation { get; set; }
        public string HolidayName { get; set; }
        public string ObservationDayMethod { get; set; }
        public string SoftwareName { get; set; }

    }
}
