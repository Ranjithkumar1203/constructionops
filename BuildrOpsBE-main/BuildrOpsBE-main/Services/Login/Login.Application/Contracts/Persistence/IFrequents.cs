using BuildrOps.Application.Features.Frequents.Command.GetFrequents;
using BuildrOps.Application.Features.Frequents.Command.InsertOrUpdateFrequents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Contracts.Persistence
{
    public interface IFrequents
    {
        public List<GetFrequentsResponse> GetFrequents(GetFrequentsCommand command);
        public InsertOrUpdateFrequentsResponse InsertOrUpdateFrequents(InsertOrUpdateFrequentsCommand command);
    }
}
