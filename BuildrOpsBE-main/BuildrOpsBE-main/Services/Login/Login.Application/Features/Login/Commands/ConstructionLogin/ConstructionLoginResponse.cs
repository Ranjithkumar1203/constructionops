using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Login.Commands.ConstructionLogin
{
   public class ConstructionLoginResponse
    {
        public bool IsAuth { get; set; }
        public string Jwt { get; set; }
        public string Name { get; set; }
    }
}
