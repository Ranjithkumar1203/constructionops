using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Resource.Commands.GetResourceLibrary
{
  public  class GetResourceLibraryHandler:IRequestHandler<GetResourceLibraryCommand, List<GetResourceLibraryResponse>>
    {
        IResourceType _resourceType;
        public GetResourceLibraryHandler(IResourceType ResourceType)
        {
            _resourceType = ResourceType;
        }

        public async Task<List<GetResourceLibraryResponse>> Handle(GetResourceLibraryCommand request, CancellationToken cancellationToken)
        {
            return _resourceType.GetResourceLibrary(request);
        }
    }
}
