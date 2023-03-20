using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Resource.Commands.GetResourceType
{
    class GetResourceTypeHandler : IRequestHandler<GetResourceTypeCommand, List<GetResourceTypeResponse>>
    {

        IResourceType _resourceType;
        public GetResourceTypeHandler(IResourceType ResourceType)
        {
            _resourceType = ResourceType;
        }

        public async Task<List<GetResourceTypeResponse>> Handle(GetResourceTypeCommand request, CancellationToken cancellationToken)
        {
            return  _resourceType.GetResourceType(request);
        }

        /* public async Task<GetResourceTypeResponse> Handle(GetResourceTypeCommand request, CancellationToken cancellationToken)
         {
             return await _resourceType.GetResourceType(request);
         }
 */

    }
}
