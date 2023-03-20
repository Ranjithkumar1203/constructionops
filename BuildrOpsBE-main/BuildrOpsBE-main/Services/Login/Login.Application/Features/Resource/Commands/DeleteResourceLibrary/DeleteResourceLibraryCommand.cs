using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Resource.Commands.DeleteResourceLibrary
{
  public  class DeleteResourceLibraryCommand:IRequest<DeleteResourceLibraryResponse>
    {
        public int Id { get; set; }
    }
}
