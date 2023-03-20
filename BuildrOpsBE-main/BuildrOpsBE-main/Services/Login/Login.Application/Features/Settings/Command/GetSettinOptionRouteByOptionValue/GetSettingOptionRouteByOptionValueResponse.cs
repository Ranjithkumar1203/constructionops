using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.Settings.Command.GetSettinOptionRouteByOptionValue
{
    public class GetSettingOptionRouteByOptionValueResponse
    {
        public string SingleClickRoute { get; set; }

        public string DoubleClickRoute { get; set; }

        public string RightClickRoute { get; set; }
    }
}
