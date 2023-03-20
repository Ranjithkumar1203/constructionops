using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Login.Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace Login.Domain.Entities
{
    [Table("Role")]
    public class RoleDataModel:EntityBase
    {
        public string RoleName { get; set; }
    }
}
