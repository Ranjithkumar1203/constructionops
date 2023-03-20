using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.Login.Commands.Permissions
{
    public class GetPermissionCommand : IRequest<GetPermissionResponse>
    {
        public IEnumerable<Claim> RoleIdClaims { get; set; }
    }
}
