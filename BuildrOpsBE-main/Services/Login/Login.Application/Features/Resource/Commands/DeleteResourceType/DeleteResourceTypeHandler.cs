using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Resource.Commands.DeleteResourceType
{
    public class DeleteResourceTypeHandler : IRequestHandler<DeleteResourceTypeCommand, DeleteResourceTypeResponse>
    {
        IResourceType _resourceType;
        public DeleteResourceTypeHandler(IResourceType ResourceType)
        {
            _resourceType = ResourceType;
        }
        public async Task<DeleteResourceTypeResponse> Handle(DeleteResourceTypeCommand request, CancellationToken cancellationToken)
        {
            return await _resourceType.DeleteResourceType(request);   
        }
    }
}
