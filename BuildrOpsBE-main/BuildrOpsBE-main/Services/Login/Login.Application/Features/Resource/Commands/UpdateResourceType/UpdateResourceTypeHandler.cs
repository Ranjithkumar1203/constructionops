using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Resource.Commands.UpdateResourceType
{
    class UpdateResourceTypeHandler : IRequestHandler<UpdateResourceTypeCommand, UpdateResourceTypeResponse>
    {
        IResourceType _resourceType;
        public UpdateResourceTypeHandler(IResourceType ResourceType)
        {
            _resourceType = ResourceType;
        }

        public async Task<UpdateResourceTypeResponse> Handle(UpdateResourceTypeCommand request, CancellationToken cancellationToken)
        {
            return await _resourceType.UpadteResourceType(request);
        }
    }
}
