using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Department.Commands.DeleteDepartment
{
    public class DeleteDepartmentCommand : IRequest<DeleteDepartmentResponse>
    {
        public int Id { get; set; }
    }
}
