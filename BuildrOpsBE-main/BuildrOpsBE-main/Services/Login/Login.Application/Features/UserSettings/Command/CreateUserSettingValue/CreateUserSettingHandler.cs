using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.UserSettings.Command.CreateUserSettingValue
{
    public class CreateUserSettingHandler : IRequestHandler<CreateUserSettingCommand, CreateUserSettingResponse>
    {

        IUserSetting _UserSettingRepo;
        public CreateUserSettingHandler(IUserSetting UserSetting)
        {
            _UserSettingRepo = UserSetting;
        }

        public async Task<CreateUserSettingResponse> Handle(CreateUserSettingCommand request, CancellationToken cancellationToken)
        {
            return _UserSettingRepo.CreateUserSetting(request);
        }
    }
}