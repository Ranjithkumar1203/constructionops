using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyBasicRegistration.Command.EmailVerification
{
   public class EmailVerificationResponse
    {
        public bool isAuth { get; set; }
        public int EmailVerificationId { get; set; }
        public string message { get; set; }
        public string Token { get; set; }
        public string userLogin{ get; set; }
        public bool IsVarified { get; set; }

    }
}
