using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Frequents.Command.InsertOrUpdateFrequents
{
    public class InsertOrUpdateFrequentsCommand : IRequest<InsertOrUpdateFrequentsResponse>
    {
        public int UserId { get; set; }
        public string FrequentRoute { get; set; }
        public string SettingName { get; set; }
        public string SettingType { get; set; }
    }
}
