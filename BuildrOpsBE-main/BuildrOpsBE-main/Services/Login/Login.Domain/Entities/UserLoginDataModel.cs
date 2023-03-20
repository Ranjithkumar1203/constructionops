using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Login.Domain.Common;

namespace Login.Domain.Entities
{
    [Table("UserLogin")]
    public class UserLoginDataModel : EntityBase
    { 
        public int UserId { get; set; }

        [Required]
        public string Password { get; set; }

        [ForeignKey("UserId")]
        public UserDataModel User { get; set; }

    }
}
