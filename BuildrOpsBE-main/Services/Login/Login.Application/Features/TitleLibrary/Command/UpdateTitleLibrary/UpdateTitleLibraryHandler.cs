using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.TitleLibrary.Command.UpdateTitleLibrary
{
    public class UpdateTitleLibraryHandler : IRequestHandler<UpdateTitleLibraryCommand, UpdateTitleLibraryResponse>
    {

        ITitleLibrary _TitleLibraryRepo;
        public UpdateTitleLibraryHandler(ITitleLibrary TitleLibrary)
        {
            _TitleLibraryRepo = TitleLibrary;
        }

        public async Task<UpdateTitleLibraryResponse> Handle(UpdateTitleLibraryCommand request, CancellationToken cancellationToken)
        {
            return _TitleLibraryRepo.UpdateTitleLibrary(request);
        }
    }
}
