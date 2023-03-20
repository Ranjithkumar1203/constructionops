using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.UserSettings.Command.DeleteUserSettingValue
{
    public class DeleteUserSettingCommand : IRequest<DeleteUserSettingResponse>
    {
        public int Id { get; set; }
    }
}
