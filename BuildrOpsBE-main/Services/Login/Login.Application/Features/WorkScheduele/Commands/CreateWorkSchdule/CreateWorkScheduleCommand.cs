﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.WorkScheduele.Commands.CreateWorkSchdule
{
    public class CreateWrokScheduleCommand : IRequest<CreateWorkSchduleResponse>
    {
        public string WorkingDays { get; set; }
        public string WorkScheduleName { get; set; }
        public int NumberOfDays { get; set; }
        public int CompanyId { get; set; }
        public string DayWeekStarts { get; set; }
        public string TimeDayStarts { get; set; }
        public string HoursWorking { get; set; }
        public int IsLibraryId { get; set; }
        public bool IsImported { get; set; }
        public bool IsLibrary { get; set; }
        public bool? Checked { get; set; }


    }
}
