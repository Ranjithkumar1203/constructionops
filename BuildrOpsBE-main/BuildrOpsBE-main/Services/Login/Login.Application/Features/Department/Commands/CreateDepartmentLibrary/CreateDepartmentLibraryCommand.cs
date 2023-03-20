using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Department.Commands.CreateDepartmentLibrary
{
    public class CreateDepartmentLibraryCommand : IRequest<CreateDepartmentLibraryResponse>
    {
        public string DepartmentName { get; set; }
        public string DepartmentDetails { get; set; }
        public string SoftwareName { get; set; }
        [JsonIgnore]
        public int? CompanyId { get; set; }
        [JsonIgnore]
        public int? CreatedBy { get; set; }
    }
}
