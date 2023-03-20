using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Department.Commands.UpdateDepartmentLibrary
{
   public class UpdateDepartmentLibraryCommand:IRequest<UpdateDepartmentLibraryResponse>
    {
        public int Id { get; set; }

        public string DepartmentName { get; set; }
        public string DepartmentDetails { get; set; }
        public string SoftwareName { get; set; }

        [JsonIgnore]
        public int? UpdatedBy { get; set; }
    }
}
