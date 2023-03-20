using BuildrOps.Application.Features.Department.Commands.GetDepartment;
using Login.Application.Features.WorkScheduele.Commands.GetWorkSchedule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.Title.Command.GetTitle
{
    public class  GetTitleResponse
    {
        public int TitleId { get; set; }
        public string TitleName { get; set; }
        public bool? ObservesHolidays { get; set; }
        public bool? IsProbationPeriod { get; set; }
        public bool? IsPaidVacationAwarded { get; set; }
        public bool? IsBonusEligible { get; set; }
        public string VacationTimeStructure { get; set; }
        public string BonusStructure { get; set; }
        public bool? IsImported { get; set; }
        public GetDepartmentResponse Department { get; set; }
        public int DepartmentId { get; set; }
        public WorkScheduleResponse WorkSchedule { get; set; }
        public int WorkScheduleId { get; set; }
        public bool? Islibrary { get; set; }
        public bool? IsAdded { get; set; }
        public string CommunicationMethod { get; set; }
        public string ProbationPeriod { get; set; }
        public string PaidVacationAwarded { get; set; }
        public string BonusEligible { get; set; }
        public int? TitleLibraryId { get; set; }

    }
}
