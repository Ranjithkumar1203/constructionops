﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.Settings.Command.CreateSettingOption
{
    public class CreateSettingOptionCommand : IRequest<CreateSettingOptionResponse>
    {
        public int SettingId { get; set; }
        public string OptionValue { get; set; }
        public int OptionSequence { get; set; }
    }
}
