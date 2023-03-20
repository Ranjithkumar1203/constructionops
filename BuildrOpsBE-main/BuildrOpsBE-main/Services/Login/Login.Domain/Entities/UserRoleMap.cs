using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Login.Domain.Common;

namespace Login.Domain.Entities
{
    [Table("UserRoleMapping")]
    public class UserRoleMap:EntityBase
    {

        public int UserId { get; set; }
        public int RoleId { get; set; }

        [ForeignKey("RoleId")]
        public virtual RoleDataModel Role { get; set; }
        [ForeignKey("UserId")]
        public virtual UserDataModel User { get; set; }
    }
}
