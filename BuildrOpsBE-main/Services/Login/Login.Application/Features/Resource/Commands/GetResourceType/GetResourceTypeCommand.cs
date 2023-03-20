using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Resource.Commands.GetResourceType
{
   public class GetResourceTypeCommand:IRequest<List<GetResourceTypeResponse>>
    {
        public int CompanyId
        {
            get; set;
        }
    }
}
