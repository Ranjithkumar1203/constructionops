using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.TitleLibrary.Command.CreateTitleLibrary
{
    public class CreateTitleLibraryHandler : IRequestHandler<CreateTitleLibraryCommand, CreateTitleLibraryResponse>
    {

        ITitleLibrary _TitleLibraryRepo;
        public CreateTitleLibraryHandler(ITitleLibrary TitleLibrary)
        {
            _TitleLibraryRepo = TitleLibrary;
        }

        public async Task<CreateTitleLibraryResponse> Handle(CreateTitleLibraryCommand request, CancellationToken cancellationToken)
        {
            return _TitleLibraryRepo.CreateTitleLibrary(request);
        }
    }
}
