using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.Settings.Command.GetSettinOptionRouteByOptionValue
{
    public class GetSettingOptionRouteByOptionValueHandler : IRequestHandler<GetSettingOptionRouteByOptionValueCommand, GetSettingOptionRouteByOptionValueResponse>
    {
        private ISettings _Settings;
        public GetSettingOptionRouteByOptionValueHandler(ISettings settings)
        {
            _Settings = settings;
        }
        public async Task<GetSettingOptionRouteByOptionValueResponse> Handle(GetSettingOptionRouteByOptionValueCommand request, CancellationToken cancellationToken)
        {
            return _Settings.GetSettingOptionRouteByOptionValue(request);
        }
    }
}

