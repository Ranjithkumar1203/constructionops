using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.TitleLibrary.Command.GetTitleLibrary
{
    public class GetTitleLibraryHandler : IRequestHandler<GetTitleLibraryCommand, List<GetTitleLibraryResponse>>
    {

        ITitleLibrary _TitleLibraryRepo;
        public GetTitleLibraryHandler(ITitleLibrary TitleLibrary)
        {
            _TitleLibraryRepo = TitleLibrary;
        }

        public async Task<List<GetTitleLibraryResponse>> Handle(GetTitleLibraryCommand request, CancellationToken cancellationToken)
        {
            return _TitleLibraryRepo.GetTitleLibraryByCompanyId(request);
        }
    }
}
