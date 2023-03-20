using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.TitleLibrary.Command.UpdateTitleLibrary
{
    public class UpdateTitleLibraryCommand : IRequest<UpdateTitleLibraryResponse>
    {
        public int TitleLibraryId { get; set; }
        public string TitleLibraryName { get; set; }
        public bool? ObservesHolidays { get; set; }
        public bool? IsProbationPeriod { get; set; }
        public bool? IsPaidVacationAwarded { get; set; }
        public string VacationTimeStructure { get; set; }
        public bool? IsBonusEligible { get; set; }
        public string BonusStructure { get; set; }
        public bool? IsImported { get; set; }
        public bool? Islibrary { get; set; }
        public bool? IsAdded { get; set; }

    }
}
