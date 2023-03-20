using MediatR;

namespace BuildrOps.Application.Features.Resource.Commands.UpdateResourceType
{
    public class UpdateResourceTypeCommand:IRequest<UpdateResourceTypeResponse>
    {
        public int Id { get; set; }
        public string ResourceType { get; set; }
        public string ResourceTypeDetails { get; set; }
    }
}
