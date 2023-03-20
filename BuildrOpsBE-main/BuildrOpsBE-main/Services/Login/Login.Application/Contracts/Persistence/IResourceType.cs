using BuildrOps.Application.Features.Resource.Commands.CreateResourceLibrary;
using BuildrOps.Application.Features.Resource.Commands.CreateResourceType;
using BuildrOps.Application.Features.Resource.Commands.DeleteResourceLibrary;
using BuildrOps.Application.Features.Resource.Commands.DeleteResourceType;
using BuildrOps.Application.Features.Resource.Commands.GetResourceLibrary;
using BuildrOps.Application.Features.Resource.Commands.GetResourceType;
using BuildrOps.Application.Features.Resource.Commands.UpdateResourceLibrary;
using BuildrOps.Application.Features.Resource.Commands.UpdateResourceType;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BuildrOps.Application.Contracts.Persistence
{
    public  interface IResourceType
    {
        public List<GetResourceTypeResponse>GetResourceType(GetResourceTypeCommand command);
        public List<GetResourceLibraryResponse> GetResourceLibrary(GetResourceLibraryCommand command);
        public Task<CreateResourceTypeResponse> CreateResourceType(CreateResourceTypeCommand command);
        public Task<CreateResourceLibraryResponse> CreateResourceLibrary(CreateResourceLibraryCommand command);
        public Task<DeleteResourceTypeResponse> DeleteResourceType(DeleteResourceTypeCommand command);
        public Task<DeleteResourceLibraryResponse> DeleteResourceLibrary(DeleteResourceLibraryCommand command);
        public Task<UpdateResourceTypeResponse> UpadteResourceType(UpdateResourceTypeCommand command);
        public Task<UpdateResourceLibraryResponse> UpadteResourceLibrary(UpdateResourceLibraryCommand command);

        
    }
}
