using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Department.Commands.UpdateDepartmentLibrary
{
  public  class UpdateDepartmentLibraryHandler:IRequestHandler<UpdateDepartmentLibraryCommand,UpdateDepartmentLibraryResponse>
    {
        IDepartment _DepartmentRepo;
        public UpdateDepartmentLibraryHandler(IDepartment Department)
        {
            _DepartmentRepo = Department;
        }

        public async Task<UpdateDepartmentLibraryResponse> Handle(UpdateDepartmentLibraryCommand request, CancellationToken cancellationToken)
        {
            return _DepartmentRepo.UpdateDepartmentLibrary(request);
        }
    }
}
