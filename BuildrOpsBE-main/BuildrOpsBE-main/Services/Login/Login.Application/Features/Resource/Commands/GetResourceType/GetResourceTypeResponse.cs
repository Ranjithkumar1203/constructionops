using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Resource.Commands.GetResourceType
{
 public class GetResourceTypeResponse
    {
        public int Id { get; set; }
        public string ResourceType { get; set; }
        public string ResourceTypeDetails { get; set; }
        
    }
}
