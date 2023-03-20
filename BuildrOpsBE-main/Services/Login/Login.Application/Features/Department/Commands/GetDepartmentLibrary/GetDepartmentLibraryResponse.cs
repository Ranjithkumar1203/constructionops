using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Department.Commands.GetDepartmentLibrary
{
   public class GetDepartmentLibraryResponse
    {
        public int Id { get; set; }
        public string DepartmentName { get; set; }
        public string DepartmentDetails { get; set; }
        public string SoftwareName { get; set; }
    }
}
