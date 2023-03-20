using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Frequents.Command.GetFrequents
{
    public class GetFrequentsResponse
    {
        public int UserFrequentId { get; set; }
        public string FrequentRoute { get; set; }
        public string FrequentName { get; set; }
        public int FrequentOrder { get; set; }
        public int SettingOptionId { get; set; }

    }
}
