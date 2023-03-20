using BuildrOps.Application.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Contracts.Infrastructure
{
    public interface ICalendarific
    {
        Task<List<CalenderificHoliday>> GetAllCalendarificHolidays(string country, string region, string year);
    }
}
