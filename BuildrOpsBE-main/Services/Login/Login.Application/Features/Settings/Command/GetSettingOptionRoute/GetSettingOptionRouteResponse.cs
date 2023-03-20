using Login.Application.Features.Settings.Command.GetSettingOption;
using Login.Application.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.Settings.Command.GetSettingOptionRoute
{
    public class GetSettingOptionRouteResponse:SettingOptions
    {
        public SettingOptionRoute Route { get; set; }
    }
}
