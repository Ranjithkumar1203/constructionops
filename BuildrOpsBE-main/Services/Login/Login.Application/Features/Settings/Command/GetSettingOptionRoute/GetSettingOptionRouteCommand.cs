using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.Settings.Command.GetSettingOptionRoute
{
    public class GetSettingOptionRouteCommand: IRequest<List<GetSettingOptionRouteResponse>>
    {
        public string SettingType { get; set; }

        public string SettingName { get; set; }
    }
}
