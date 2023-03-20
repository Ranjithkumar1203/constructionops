using BuildrOps.Application.Features.Department.Commands.GetDepartment;
using Login.Application.Features.WorkScheduele.Commands.GetWorkSchedule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.TitleLibrary.Command.GetTitleLibrary
{
    public class  GetTitleLibraryResponse
    {
        public int TitleLibraryId { get; set; }
        public string TitleLibraryName { get; set; }
        public bool? IsProbationPeriod { get; set; }
        public bool? IsPaidVacationAwarded { get; set; }
        public bool? IsBonusEligible { get; set; }
        public string VacationTimeStructure { get; set; }
        public string BonusStructure { get; set; }
        public bool? IsImported { get; set; }
        public bool? Islibrary { get; set; }
        public bool? IsAdded { get; set; }


    }
}
