using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Department.Commands.DeleteDepartmentLibrary
{
   public class DeleteDepartmentLibraryHandler:IRequestHandler<DeleteDepartmentLibraryCommand,DeleteDepartmentLibraryResponse>
    {
        IDepartment _DepartmentRepo;
        public DeleteDepartmentLibraryHandler(IDepartment Department)
        {
            _DepartmentRepo = Department;
        }

        public async Task<DeleteDepartmentLibraryResponse> Handle(DeleteDepartmentLibraryCommand request, CancellationToken cancellationToken)
        {
            return _DepartmentRepo.DeleteDepartmentLibrary(request);
        }
    }
}
