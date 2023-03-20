﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.Settings.Command.GetSettingOption
{
    public class GetSettingOptionCommand : IRequest<List<GetSettingOptionResponse>>
    {
        public string SettingType { get; set; }
    }
}
