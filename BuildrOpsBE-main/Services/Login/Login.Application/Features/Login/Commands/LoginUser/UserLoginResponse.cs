using Login.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.Login.Commands.LoginUser
{
    public class UserLoginResponse
    {
        public bool IsAuth { get; set; }
        public string Jwt { get; set; }
        public string Name { get; set; }
        public IEnumerable<RoleDataModel> Roles { get; set; }
    }
}
