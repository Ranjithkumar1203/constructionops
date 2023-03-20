using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.Settings.Command.GetSettinOptionRouteByOptionValue
{
    public class GetSettingOptionRouteByOptionValueCommand : IRequest<GetSettingOptionRouteByOptionValueResponse>
    {
        public string SettingType { get; set; }

        public string SettingName { get; set; }
        public string OptionValue { get; set; }
    }
}
