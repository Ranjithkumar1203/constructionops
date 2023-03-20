using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Login.Commands.ForgetPasswordResend
{
   public class ForgotPasswordResendResponse
    {
        public string message { get; set; }
        public bool isEmailAvailable { get; set; }
    }
}
