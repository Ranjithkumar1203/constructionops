using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Frequents.Command.InsertOrUpdateFrequents
{
    public class InsertOrUpdateFrequentsHandler : IRequestHandler<InsertOrUpdateFrequentsCommand, InsertOrUpdateFrequentsResponse>
    {

        IFrequents _FrequentsRepo;
        public InsertOrUpdateFrequentsHandler(IFrequents Frequents)
        {
            _FrequentsRepo = Frequents;
        }

        public async Task<InsertOrUpdateFrequentsResponse> Handle(InsertOrUpdateFrequentsCommand request, CancellationToken cancellationToken)
        {
            return _FrequentsRepo.InsertOrUpdateFrequents(request);
        }
    }
}
