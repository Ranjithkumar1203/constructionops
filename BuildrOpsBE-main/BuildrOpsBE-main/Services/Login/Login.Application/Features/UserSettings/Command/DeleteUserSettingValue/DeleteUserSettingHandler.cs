using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.UserSettings.Command.DeleteUserSettingValue
{
    public class DeleteUserSettingHandler : IRequestHandler<DeleteUserSettingCommand, DeleteUserSettingResponse>
    {

        IUserSetting _UserSettingRepo;
        public DeleteUserSettingHandler(IUserSetting UserSetting)
        {
            _UserSettingRepo = UserSetting;
        }

        public async Task<DeleteUserSettingResponse> Handle(DeleteUserSettingCommand request, CancellationToken cancellationToken)
        {
            return _UserSettingRepo.DeleteUserSetting(request);
        }
    }
}
