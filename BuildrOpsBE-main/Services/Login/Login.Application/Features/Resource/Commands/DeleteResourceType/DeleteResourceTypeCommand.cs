using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Resource.Commands.DeleteResourceType
{
  public  class DeleteResourceTypeCommand:IRequest<DeleteResourceTypeResponse>
    {
        public int Id { get; set; }
    }
}
