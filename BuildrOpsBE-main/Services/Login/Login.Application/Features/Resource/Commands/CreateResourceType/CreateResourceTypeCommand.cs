using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Resource.Commands.CreateResourceType
{
   public class CreateResourceTypeCommand:IRequest<CreateResourceTypeResponse>
    {
        public string ResourceType { get; set; }
        public string ResourceTypeDetails { get; set; }
    }
}
