using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Resource.Commands.UpdateResourceLibrary
{
  public  class UpdateResourceLibraryHandler:IRequestHandler<UpdateResourceLibraryCommand,UpdateResourceLibraryResponse>
    {
        IResourceType _resourceType;
        public UpdateResourceLibraryHandler(IResourceType ResourceType)
        {
            _resourceType = ResourceType;
        }

        public async Task<UpdateResourceLibraryResponse> Handle(UpdateResourceLibraryCommand request, CancellationToken cancellationToken)
        {
            return await _resourceType.UpadteResourceLibrary(request);
        }
    }
}
