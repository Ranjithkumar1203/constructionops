using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.Settings.Command.GetSettingOptionRoute
{
    public class GetSettingOptionRouteHandler : IRequestHandler<GetSettingOptionRouteCommand, List<GetSettingOptionRouteResponse>>
    {
        private ISettings _Settings;
        public GetSettingOptionRouteHandler(ISettings settings)
        {
            _Settings = settings;
        }
        public async Task<List<GetSettingOptionRouteResponse>> Handle(GetSettingOptionRouteCommand request, CancellationToken cancellationToken)
        {
            return _Settings.GetSettingOptionRoute(request);
        }
    }
}
