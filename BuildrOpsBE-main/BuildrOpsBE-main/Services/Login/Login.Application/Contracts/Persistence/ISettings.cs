using Login.Application.Features.Settings.Command.CreateSetting;
using Login.Application.Features.Settings.Command.CreateSettingOption;
using Login.Application.Features.Settings.Command.GetSettingOption;
using Login.Application.Features.Settings.Command.GetSettingOptionByName;
using Login.Application.Features.Settings.Command.GetSettinOptionRouteByOptionValue;
using Login.Application.Features.Settings.Command.GetSettingOptionRoute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Contracts.Persistence
{
    public interface ISettings
    {
        public CreateSettingCommandResponse CreateSetting(CreateSettingCommand command);
        public CreateSettingOptionResponse CreateOptionSetting(CreateSettingOptionCommand command);
        public List<GetSettingOptionResponse> GetSettingBySettingType(GetSettingOptionCommand command);
        public GetSettingOptionByNameResponse GetSettingBySettingTypeAndName(GetSettingOptionByNameCommand command);
        public List<GetSettingOptionRouteResponse> GetSettingOptionRoute(GetSettingOptionRouteCommand command);
        public GetSettingOptionRouteByOptionValueResponse GetSettingOptionRouteByOptionValue(GetSettingOptionRouteByOptionValueCommand command);

    }
}
