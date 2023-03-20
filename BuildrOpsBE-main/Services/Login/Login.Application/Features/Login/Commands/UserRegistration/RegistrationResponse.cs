using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.Login.Commands.UserRegistration
{
    public class RegistrationResponse
    {
        public string Token { get; set; }
        public int userLoginId { get; set; }
    }
}
