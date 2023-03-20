using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Login.Commands.ForgetPasswordKeyVerification
{
    public class ForgetPasswordKeyVerificationResponse
    {
        public string message { get; set; }
        public bool IsKeyAvailable { get; set; }
        public bool IsKeyExpired { get; set; }
    }
}
