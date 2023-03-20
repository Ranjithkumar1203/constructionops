using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace Login.Application.Features.Login.Commands.UserRegistration
{
    public class UserRegisterCommand : IRequest<RegistrationResponse>
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
    }
}
