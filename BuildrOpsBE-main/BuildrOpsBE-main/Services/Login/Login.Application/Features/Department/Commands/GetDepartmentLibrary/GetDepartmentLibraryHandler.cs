using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Department.Commands.GetDepartmentLibrary
{
   public class GetDepartmentLibraryHandler:IRequestHandler<GetDepartmentLibraryCommand, List<GetDepartmentLibraryResponse>>
    {
        IDepartment _DepartmentRepo;
        public GetDepartmentLibraryHandler(IDepartment Department)
        {
            _DepartmentRepo = Department;
        }

        public async Task<List<GetDepartmentLibraryResponse>> Handle(GetDepartmentLibraryCommand request, CancellationToken cancellationToken)
        {
            return  _DepartmentRepo.GetDepartmentLibrary(request);
        }
    }
}
