using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Department.Commands.DeleteDepartment
{
    public class DeleteDepartmentHandler : IRequestHandler<DeleteDepartmentCommand, DeleteDepartmentResponse>
    {

        IDepartment _DepartmentRepo;
        public DeleteDepartmentHandler(IDepartment Department)
        {
            _DepartmentRepo = Department;
        }

        public async Task<DeleteDepartmentResponse> Handle(DeleteDepartmentCommand request, CancellationToken cancellationToken)
        {
            return _DepartmentRepo.DeleteDepartment(request);
        }
    }
}