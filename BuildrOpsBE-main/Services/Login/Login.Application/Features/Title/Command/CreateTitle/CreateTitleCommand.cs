using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.Title.Command.CreateTitle
{
    public class CreateTitleCommand : IRequest<CreateTitleResponse>
    {
        public int TitleId { get; set; }
        public string TitleName { get; set; }
        public bool ObservesHolidays { get; set; }
        public bool IsProbationPeriod { get; set; }
        public bool IsPaidVacationAwarded { get; set; }
        public string VacationTimeStructure { get; set; }
        public bool IsBonusEligible { get; set; }
        public string BonusStructure { get; set; }
        public int DepartmentId { get; set; }
        public int WorkScheduleId { get; set; }
        public bool? IsAdded { get; set; }
        public bool? IsImported { get; set; }
        public int CompanyId { get; set; }
        public bool? Islibrary { get; set; }
        public int? TitleLibraryId { get; set; }
        public string CommunicationMethod { get; set; }
        public string ProbationPeriod { get; set; }
        public string PaidVacationAwarded { get; set; }
        public string BonusEligible { get; set; }



    }
}
