using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindUserName
{
   public class FindUserNameResponse
    {
        public string message { get; set; }
        public bool isUsernameAvailable { get; set; }
    }
}
