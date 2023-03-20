﻿using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Resource.Commands.DeleteResourceLibrary
{
  public  class DeleteResourceLibraryHandler:IRequestHandler<DeleteResourceLibraryCommand,DeleteResourceLibraryResponse>
    {
        IResourceType _resourceType;
        public DeleteResourceLibraryHandler(IResourceType ResourceType)
        {
            _resourceType = ResourceType;
        }

        public async Task<DeleteResourceLibraryResponse> Handle(DeleteResourceLibraryCommand request, CancellationToken cancellationToken)
        {
            return await _resourceType.DeleteResourceLibrary(request);
        }
    }
}
