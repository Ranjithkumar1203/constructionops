using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.Settings.Command.GetSettingOption
{
    public class SettingOptions
    {
        public int Id { get; set; }
        public int SettingId { get; set; }
        public string OptionValue { get; set; }
        public int OptionSequence { get; set; }

    }
}
