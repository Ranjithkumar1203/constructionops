using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.Settings.Command.GetSettingOptionByName
{
    public class GetSettingOptionByNameHandler : IRequestHandler<GetSettingOptionByNameCommand, GetSettingOptionByNameResponse>
    {
        private ISettings _Settings;
        public GetSettingOptionByNameHandler(ISettings settings)
        {
            _Settings = settings;
        }
        public async Task<GetSettingOptionByNameResponse> Handle(GetSettingOptionByNameCommand request, CancellationToken cancellationToken)
        {
            return _Settings.GetSettingBySettingTypeAndName(request);
        }
    }
}
