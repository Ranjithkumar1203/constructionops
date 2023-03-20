using Login.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.Login.Commands.Permissions
{
    public class GetPermissionResponse
    {
        public IEnumerable<PermissionList> Permissions { get; set; }
    }
}
