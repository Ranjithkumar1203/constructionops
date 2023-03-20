using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.UserSettings.Command.UpdateUserSettingValue
{
    public class UpdateUserSettingCommand : IRequest<UpdateUserSettingResponse>
    {
        public int Id { get; set; }
        public int SettingId { get; set; }
        public int UserId { get; set; }
        public string SelectedValue { get; set; }
        public int Sequence { get; set; }

    }
}
