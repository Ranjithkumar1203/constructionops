using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Models
{
    public class CalendarificMeta
    {
        public int code { get; set; }
    }

    public class CalendarificCountry
    {
        public string id { get; set; }
        public string name { get; set; }
    }

    public class CalendarificDatetime
    {
        public int year { get; set; }
        public int month { get; set; }
        public int day { get; set; }
    }

    public class CalendarificDate
    {
        public string iso { get; set; }
        public CalendarificDatetime datetime { get; set; }
    }

    public class CalenderificHoliday
    {
        public string name { get; set; }
        public string description { get; set; }
        public CalendarificCountry country { get; set; }
        public CalendarificDate date { get; set; }
        public List<string> type { get; set; }
        public string locations { get; set; }
        public object states { get; set; }
    }

    public class CalendarificResponse
    {
        public List<CalenderificHoliday> holidays { get; set; }
    }
    public class CalendarificState
    {
        public string id { get; set; }
        public string abbrev { get; set; }
        public string name { get; set; }
        public string exception { get; set; }
        public string iso { get; set; }
    }
    public class CalendarificAPIResponse
    {
        public CalendarificMeta meta { get; set; }
        public CalendarificResponse response { get; set; }
    }


}
