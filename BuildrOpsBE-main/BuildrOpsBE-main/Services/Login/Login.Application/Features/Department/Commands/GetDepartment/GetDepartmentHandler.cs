using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Department.Commands.GetDepartment
{
    public class GetDepartmentHandler : IRequestHandler<GetDepartmentCommand, List<GetDepartmentResponse>>
    {

        IDepartment _DepartmentRepo;
        public GetDepartmentHandler(IDepartment Department)
        {
            _DepartmentRepo = Department;
        }

        public async Task<List<GetDepartmentResponse>> Handle(GetDepartmentCommand request, CancellationToken cancellationToken)
        {
            return _DepartmentRepo.GetDepartmentByCompanyId(request);
        }
    }
}

