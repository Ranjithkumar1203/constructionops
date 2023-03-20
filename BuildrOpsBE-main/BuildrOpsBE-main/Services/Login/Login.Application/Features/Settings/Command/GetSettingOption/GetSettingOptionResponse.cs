using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.Settings.Command.GetSettingOption
{
    public class GetSettingOptionResponse
    {
        public int Id { get; set; }
        public string SettingName { get; set; }
        public string SettingType { get; set; }
        public string SettingLevel { get; set; }
        public string DataType { get; set; }
        public int SettingSequence { get; set; }
        public List<SettingOptions> SettingOptions { get; set; }
    }
}
