using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Department.Commands.CreateDepartment
{
    public class CreateDepartmentCommand : IRequest<CreateDepartmentResponse>
    {
        public string DepartmentName { get; set; }
        public string DepartmentDetails { get; set; }
        [JsonIgnore]
        public int? CompanyId { get; set; }
        [JsonIgnore]
        public int? CreatedBy { get; set; }

    }
}
