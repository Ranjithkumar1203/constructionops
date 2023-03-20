using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Department.Commands.CreateDepartment
{
    public class CreateDepartmentHandler : IRequestHandler<CreateDepartmentCommand, CreateDepartmentResponse>
    {

        IDepartment _DepartmentRepo;
        public CreateDepartmentHandler(IDepartment Department)
        {
            _DepartmentRepo = Department;
        }

        public async Task<CreateDepartmentResponse> Handle(CreateDepartmentCommand request, CancellationToken cancellationToken)
        {
            return _DepartmentRepo.CreateDepartment(request);
        }
    }
}
