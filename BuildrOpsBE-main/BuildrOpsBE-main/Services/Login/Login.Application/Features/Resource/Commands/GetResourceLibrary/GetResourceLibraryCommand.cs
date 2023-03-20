using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Resource.Commands.GetResourceLibrary
{
   public class GetResourceLibraryCommand : IRequest<List<GetResourceLibraryResponse>>
    {
        public int CompanyId
        {
            get; set;
        }
    }
}
