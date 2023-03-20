using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Login.Domain.Common;

namespace Login.Domain.Entities
{
    [Table("Permission")]
    public class PermissionDb:EntityBase
    {
        public string PermissionName { get; set; }
        public int? ParentId { get; set; }

        [ForeignKey("ParentId")]
        public virtual PermissionDb ParentRow { get; set; }
    }
}
