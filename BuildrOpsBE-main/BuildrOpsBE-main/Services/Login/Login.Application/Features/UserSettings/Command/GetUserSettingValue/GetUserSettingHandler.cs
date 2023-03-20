using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.UserSettings.Command.GetUserSettingValue
{
    public class GetUserSettingHandler : IRequestHandler<GetUserSettingCommand, List<GetUserSettingResponse>>
    {

        IUserSetting _UserSettingRepo;
        public GetUserSettingHandler(IUserSetting UserSetting)
        {
            _UserSettingRepo = UserSetting;
        }

        public async Task<List<GetUserSettingResponse>> Handle(GetUserSettingCommand request, CancellationToken cancellationToken)
        {
            return _UserSettingRepo.GetUserSettingBySettingName(request);
        }
    }
}
