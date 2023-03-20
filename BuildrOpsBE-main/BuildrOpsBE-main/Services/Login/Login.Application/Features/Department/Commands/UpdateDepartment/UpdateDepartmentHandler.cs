using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Department.Commands.UpdateDepartment
{
    public class UpdateDepartmentHandler : IRequestHandler<UpdateDepartmentCommand, UpdateDepartmentResponse>
    {

        IDepartment _DepartmentRepo;
        public UpdateDepartmentHandler(IDepartment Department)
        {
            _DepartmentRepo = Department;
        }

        public async Task<UpdateDepartmentResponse> Handle(UpdateDepartmentCommand request, CancellationToken cancellationToken)
        {
            return _DepartmentRepo.UpdateDepartment(request);
        }
    }
}