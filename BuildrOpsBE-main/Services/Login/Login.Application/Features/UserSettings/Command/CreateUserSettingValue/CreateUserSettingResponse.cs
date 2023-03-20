using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.UserSettings.Command.CreateUserSettingValue
{
    public class CreateUserSettingResponse
    {
        public int Id { get; set; }

        public int SettingId { get; set; }
        public string SettingType { get; set; }
        
        public int UserId { get; set; }
        public string SelectedValue { get; set; }
        public int Sequence { get; set; }
    }
}
