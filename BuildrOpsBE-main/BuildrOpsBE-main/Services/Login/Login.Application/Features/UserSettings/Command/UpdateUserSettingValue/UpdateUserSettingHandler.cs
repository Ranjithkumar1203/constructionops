using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.UserSettings.Command.UpdateUserSettingValue
{
    public class UpdateUserSettingHandler : IRequestHandler<UpdateUserSettingCommand, UpdateUserSettingResponse>
    {

        IUserSetting _UserSettingRepo;
        public UpdateUserSettingHandler(IUserSetting UserSetting)
        {
            _UserSettingRepo = UserSetting;
        }

        public async Task<UpdateUserSettingResponse> Handle(UpdateUserSettingCommand request, CancellationToken cancellationToken)
        {
            return _UserSettingRepo.UpdateUserSetting(request);
        }
    }
}
