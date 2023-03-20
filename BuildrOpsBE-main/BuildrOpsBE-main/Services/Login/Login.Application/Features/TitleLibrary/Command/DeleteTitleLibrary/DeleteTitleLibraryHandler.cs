using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.TitleLibrary.Command.DeleteTitleLibrary
{
    public class DeleteTitleLibraryHandler : IRequestHandler<DeleteTitleLibraryCommand, DeleteTitleLibraryResponse>
    {

        ITitleLibrary _TitleLibraryRepo;
        public DeleteTitleLibraryHandler(ITitleLibrary TitleLibrary)
        {
            _TitleLibraryRepo = TitleLibrary;
        }

        public async Task<DeleteTitleLibraryResponse> Handle(DeleteTitleLibraryCommand request, CancellationToken cancellationToken)
        {
            return _TitleLibraryRepo.DeleteTitleLibrary(request);
        }
    }
}
