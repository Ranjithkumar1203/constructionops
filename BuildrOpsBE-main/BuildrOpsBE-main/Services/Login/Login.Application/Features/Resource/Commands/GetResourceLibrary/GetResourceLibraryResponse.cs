using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Resource.Commands.GetResourceLibrary
{
   public class GetResourceLibraryResponse
    {
        public int Id { get; set; }
        public string ResourceType { get; set; }
        public string ResourceTypeDetails { get; set; }
        public string SoftwareName { get; set; }
    }
}
