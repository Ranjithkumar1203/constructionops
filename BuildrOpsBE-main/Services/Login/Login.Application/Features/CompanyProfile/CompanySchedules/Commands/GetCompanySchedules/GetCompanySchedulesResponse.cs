using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanySchedules.Commands.GetCompanySchedules
{
   public class GetCompanySchedulesResponse
    {
        public int Id { get; set; }
        public string Schedules { get; set; }
    }
}
