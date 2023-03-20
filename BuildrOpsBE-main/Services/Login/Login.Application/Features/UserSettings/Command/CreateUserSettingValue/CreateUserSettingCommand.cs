using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.UserSettings.Command.CreateUserSettingValue
{
    public class CreateUserSettingCommand : IRequest<CreateUserSettingResponse>
    {
        public int SettingId { get; set; }
        public string SettingType { get; set; }
        [IgnoreDataMember]
        public int UserId { get; set; }
        public string SelectedValue { get; set; }
        public int Sequence { get; set; }
    }
}
