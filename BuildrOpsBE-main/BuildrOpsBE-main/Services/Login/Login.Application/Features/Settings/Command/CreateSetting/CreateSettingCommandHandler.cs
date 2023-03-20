using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.Settings.Command.CreateSetting
{
    public class CreateSettingCommandHandler : IRequestHandler<CreateSettingCommand, CreateSettingCommandResponse>
    {

        private ISettings _Settings;
        public CreateSettingCommandHandler(ISettings settings)
        {
            _Settings = settings;
        }

        public async Task<CreateSettingCommandResponse> Handle(CreateSettingCommand request, CancellationToken cancellationToken)
        {
            return _Settings.CreateSetting(request);
        }
    }
}
