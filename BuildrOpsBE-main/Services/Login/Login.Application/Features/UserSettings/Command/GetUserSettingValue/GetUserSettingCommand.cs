using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.UserSettings.Command.GetUserSettingValue
{
    public class GetUserSettingCommand : IRequest<List<GetUserSettingResponse>>
    {
        public string SettingType
        {
            get; set;
        }
        public string SettingName { get; set; }
        public int UserId { get; set; }
        public int CompanyId { get; set; }
     }
}
