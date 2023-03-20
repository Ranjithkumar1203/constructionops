﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.WorkLibrary.Commands.CreateWorkScheduleLibrary
{
    public class CreateWorkScheduleLibraryCommand : IRequest<CreateWorkScheduleLibraryResponse>
    {
        public string LibraryName { get; set; }
        public string WorkingDays { get; set; }
        public int NumberOfDays { get; set; }
        public string SoftwareName { get; set; }
        public string WeekStart { get; set; }
        public string DayStart { get; set; }
        public int HoursWorked { get; set; }
        public int LunchBreak { get; set; }

    }
}
