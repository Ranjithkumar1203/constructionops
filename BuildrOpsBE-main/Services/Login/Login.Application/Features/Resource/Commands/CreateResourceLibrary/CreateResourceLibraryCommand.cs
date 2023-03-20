using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Resource.Commands.CreateResourceLibrary
{
  public  class CreateResourceLibraryCommand:IRequest<CreateResourceLibraryResponse>
    {
        public string ResourceType { get; set; }
        public string ResourceTypeDetails { get; set; }
        public string SoftwareName { get; set; }

    }
}
