using Login.Application.Features.UserSettings.Command.CreateUserSettingValue;
using Login.Application.Features.UserSettings.Command.DeleteUserSettingValue;
using Login.Application.Features.UserSettings.Command.GetUserSettingValue;
using Login.Application.Features.UserSettings.Command.UpdateUserSettingValue;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Contracts.Persistence
{
    public interface IUserSetting
    {
        public List<GetUserSettingResponse> GetUserSettingBySettingName(GetUserSettingCommand command);
        public CreateUserSettingResponse CreateUserSetting(CreateUserSettingCommand command);
        public DeleteUserSettingResponse DeleteUserSetting(DeleteUserSettingCommand commad);
        public UpdateUserSettingResponse UpdateUserSetting(UpdateUserSettingCommand command);
    }
}
