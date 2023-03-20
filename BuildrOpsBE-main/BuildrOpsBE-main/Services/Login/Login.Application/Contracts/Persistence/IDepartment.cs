using BuildrOps.Application.Features.Department.Commands.CreateDepartment;
using BuildrOps.Application.Features.Department.Commands.CreateDepartmentLibrary;
using BuildrOps.Application.Features.Department.Commands.DeleteDepartment;
using BuildrOps.Application.Features.Department.Commands.DeleteDepartmentLibrary;
using BuildrOps.Application.Features.Department.Commands.GetDepartment;
using BuildrOps.Application.Features.Department.Commands.GetDepartmentLibrary;
using BuildrOps.Application.Features.Department.Commands.UpdateDepartment;
using BuildrOps.Application.Features.Department.Commands.UpdateDepartmentLibrary;
using System.Collections.Generic;

namespace BuildrOps.Application.Contracts.Persistence
{
    public interface IDepartment
    {

        public List<GetDepartmentResponse> GetDepartmentByCompanyId(GetDepartmentCommand command);
        public List<GetDepartmentLibraryResponse> GetDepartmentLibrary(GetDepartmentLibraryCommand command);

        
        public CreateDepartmentResponse CreateDepartment(CreateDepartmentCommand command);
        public CreateDepartmentLibraryResponse CreateDepartmentlibrary(CreateDepartmentLibraryCommand command);

        public DeleteDepartmentResponse DeleteDepartment(DeleteDepartmentCommand commad);
        public DeleteDepartmentLibraryResponse DeleteDepartmentLibrary(DeleteDepartmentLibraryCommand commad);
        public UpdateDepartmentResponse UpdateDepartment(UpdateDepartmentCommand command);
        public UpdateDepartmentLibraryResponse UpdateDepartmentLibrary(UpdateDepartmentLibraryCommand command);

        
    }
}
