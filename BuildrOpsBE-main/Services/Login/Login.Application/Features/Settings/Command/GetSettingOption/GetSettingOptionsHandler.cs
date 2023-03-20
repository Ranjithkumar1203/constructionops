using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.Settings.Command.GetSettingOption
{
    public class GetSettingOptionsHandler : IRequestHandler<GetSettingOptionCommand, List<GetSettingOptionResponse>>
    {
        private ISettings _Settings;
        public GetSettingOptionsHandler(ISettings settings)
        {
            _Settings = settings;
        }
        public async Task<List<GetSettingOptionResponse>> Handle(GetSettingOptionCommand request, CancellationToken cancellationToken)
        {
            return _Settings.GetSettingBySettingType(request);
        }
    }
}
