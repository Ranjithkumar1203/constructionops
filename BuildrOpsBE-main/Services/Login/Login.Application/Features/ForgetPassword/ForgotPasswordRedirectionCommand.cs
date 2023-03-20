using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.ForgetPassword
{
    public class ForgotPasswordRedirectionCommand
    {
        public string Key { get; set; }
        public string NewPassword { get; set; }
    }
}
