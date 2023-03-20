using Login.Application.Features.Settings.Command.CreateSetting;
using Login.Application.Features.Settings.Command.CreateSettingOption;
using Login.Application.Features.Settings.Command.GetSettingOption;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Login.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class SettingsController:ControllerBase
    {
        private readonly IMediator _mediator;
        public SettingsController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpPost("/CreateSettings")]
        public async Task<IActionResult> CreateSettings(CreateSettingCommand command)
        {
            var Works = await _mediator.Send(command);

            return Ok(Works);
        }

        [HttpPost("/CreateSettingOption")]
        public async Task<IActionResult> CreateSettingOption(CreateSettingOptionCommand command)
        {
            var Works = await _mediator.Send(command);

            return Ok(Works);

        }
        
        [HttpGet("/GetSettingOptions")]
        public async Task<IActionResult> GetSettingOptions([FromQuery]GetSettingOptionCommand command)
        {
            var Works = await _mediator.Send(command);

            return Ok(Works);

        }

    }
}
