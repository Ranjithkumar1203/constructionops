using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.Settings.Command.CreateSettingOption
{
    public class CreateSettingOptionCommandHandler : IRequestHandler<CreateSettingOptionCommand, CreateSettingOptionResponse>
    {
        private ISettings _Settings;
        public CreateSettingOptionCommandHandler(ISettings settings)
        {
            _Settings = settings;
        }
        public async Task<CreateSettingOptionResponse> Handle(CreateSettingOptionCommand request, CancellationToken cancellationToken)
        {
            return _Settings.CreateOptionSetting(request);
        }
    }
}
