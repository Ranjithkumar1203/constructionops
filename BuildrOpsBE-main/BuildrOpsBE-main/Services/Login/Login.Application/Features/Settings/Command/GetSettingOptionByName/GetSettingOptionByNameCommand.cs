using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.Settings.Command.GetSettingOptionByName
{
    public class GetSettingOptionByNameCommand : IRequest<GetSettingOptionByNameResponse>
    {
        public string SettingType { get; set; }
        public string SettingName { get; set; }
        public int UserId { get; set; }
    }
}
