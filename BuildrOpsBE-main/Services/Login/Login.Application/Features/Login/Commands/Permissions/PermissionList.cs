using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.Login.Commands.Permissions
{
    public class PermissionList
    {
        public int ParentPermissionID { get; set; }
        public string ParentPermission { get; set; }
        public IEnumerable<string> SubPermissions { get; set; }
    }
}
