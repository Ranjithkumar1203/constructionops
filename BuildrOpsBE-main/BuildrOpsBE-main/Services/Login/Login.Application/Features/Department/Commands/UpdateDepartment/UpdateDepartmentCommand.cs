using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Department.Commands.UpdateDepartment
{
    public class UpdateDepartmentCommand:IRequest<UpdateDepartmentResponse>
    {
        public int Id { get; set; }

        public string DepartmentName { get; set; }
        public string DepartmentDetails { get; set; }
        
        [JsonIgnore]
        public int? UpdatedBy { get; set; }

    }
}
