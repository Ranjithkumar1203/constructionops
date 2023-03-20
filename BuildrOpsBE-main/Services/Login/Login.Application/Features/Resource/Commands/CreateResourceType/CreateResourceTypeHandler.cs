using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Resource.Commands.CreateResourceType
{
  public  class CreateResourceTypeHandler:IRequestHandler<CreateResourceTypeCommand,CreateResourceTypeResponse>
    {
        IResourceType _resourceType;
        public CreateResourceTypeHandler(IResourceType ResourceType)
        {
            _resourceType = ResourceType;
        }

        public async Task<CreateResourceTypeResponse> Handle(CreateResourceTypeCommand request, CancellationToken cancellationToken)
        {
            return await _resourceType.CreateResourceType(request);
        }
    }
}
