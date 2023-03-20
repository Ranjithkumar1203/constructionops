using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Login.Domain.Common;

namespace Login.Domain.Entities
{
    [Table("RolePermissionMapping")]
    public class RolePermissionMap:EntityBase
    {
        public int PermissionId { get; set; }
        public int RoleId { get; set; }

        [ForeignKey("RoleId")]
        public virtual RoleDataModel Role { get; set; }
        [ForeignKey("PermissionId")]
        public virtual PermissionDb Permission { get; set; }
    }
}
