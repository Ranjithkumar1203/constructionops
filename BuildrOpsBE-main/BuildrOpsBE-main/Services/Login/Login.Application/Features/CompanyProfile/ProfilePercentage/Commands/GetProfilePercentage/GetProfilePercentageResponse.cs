using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.ProfilePercentage.Commands.GetProfilePercentage
{
   public class GetProfilePercentageResponse
    {
        public int Id { get; set; }
        public int ProfileComplete { get; set; }
        public bool isDataAvilable { get; set; }
    }
}
