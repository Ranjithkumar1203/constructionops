using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Login.API.Requests
{
    public class CreateWorkScheduleRequest
    {
        public string WorkingDays { get; set; }
        public string WorkScheduleName { get; set; }
        public int NumberOfDays { get; set; }
    }
}
