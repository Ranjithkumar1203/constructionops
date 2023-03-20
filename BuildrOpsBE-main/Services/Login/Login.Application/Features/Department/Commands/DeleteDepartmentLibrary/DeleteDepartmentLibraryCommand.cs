using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Department.Commands.DeleteDepartmentLibrary
{
   public class DeleteDepartmentLibraryCommand:IRequest<DeleteDepartmentLibraryResponse>
    {
        public int Id { get; set; }

    }
}
