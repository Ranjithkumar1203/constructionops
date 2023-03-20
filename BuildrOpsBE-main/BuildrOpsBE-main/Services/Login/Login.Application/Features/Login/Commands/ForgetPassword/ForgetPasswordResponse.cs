using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.Login.Commands.ForgetPassword
{
    public class ForgetPasswordResponse
    {
        public string message { get; set; }
        public bool isEmailAvailable { get; set; }
    }
}
