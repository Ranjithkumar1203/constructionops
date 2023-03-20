using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace Login.Application.Features.Login.Commands.LoginUser
{
    public class UserLoginCommand : IRequest<UserLoginResponse>
    {
        public string UserEmail { get; set; }
        public string Password { get; set; }
        public string CompanyName { get; set; }
        public int Id { get; set; }


    }
}
