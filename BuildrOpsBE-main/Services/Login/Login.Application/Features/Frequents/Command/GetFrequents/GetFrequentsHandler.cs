using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Frequents.Command.GetFrequents
{
    public class GetFrequentsHandler : IRequestHandler<GetFrequentsCommand, List<GetFrequentsResponse>>
    {

        IFrequents _FrequentsRepo;
        public GetFrequentsHandler(IFrequents Frequents)
        {
            _FrequentsRepo = Frequents;
        }

        public async Task<List<GetFrequentsResponse>> Handle(GetFrequentsCommand request, CancellationToken cancellationToken)
        {
            return _FrequentsRepo.GetFrequents(request);
        }
    }
}
