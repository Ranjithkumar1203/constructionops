using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Department.Commands.GetDepartmentLibrary
{
   public class GetDepartmentLibraryCommand: IRequest<List<GetDepartmentLibraryResponse>>
    {
        public int CompanyId
        {
            get; set;
        }
    }
}
