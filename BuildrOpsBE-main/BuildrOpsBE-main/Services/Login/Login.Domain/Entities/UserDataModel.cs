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
    [Table("User")]
    public class UserDataModel : EntityBase
    {

        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }
        [MaxLength(100)]
        public string MiddleName { get; set; }
        [MaxLength(100)]
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string ProfilePic { get; set; }

        public int CompanyId { get; set; }

    }
}
