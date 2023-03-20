using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Department.Commands.GetDepartment
{
    public class GetDepartmentCommand: IRequest<List<GetDepartmentResponse>>
    {
        public int CompanyId
        {
            get; set;
        }
     }
}
