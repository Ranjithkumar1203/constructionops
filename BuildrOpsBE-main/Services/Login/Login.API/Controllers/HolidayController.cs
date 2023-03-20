using Login.API.Extensions;
using Login.Application.Features.Holiday.Commands.CreateHoliday;
using Login.Application.Features.Holiday.Commands.GetHoliday;
using Login.Application.Features.Holiday.Commands.UpdateHoliday;
using Login.Application.Features.Holiday.Commands.DeleteHoliday;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Login.Application.Features.Settings.Command.GetSettingOption;
using Login.Application.Features.Settings.Command.GetSettingOptionByName;
using Login.Application.Features.Settings.Command.CreateSettingOption;
using Login.Application.Features.Settings.Command.GetSettingOptionRoute;
using BuildrOps.Application.Features.Holiday.Commands.PrepopulateCalenderificHoliday;

namespace Login.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class HolidayController : ControllerBase
    {
        private readonly IMediator _mediator;
        public HolidayController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet("/GetHoliday")]
        public async Task<IActionResult> GetHolidayByCompanyId()
        {
            Claim c = HttpContext.GetClaimByStringType("CompanyId");
            IList<GetHolidayResponse> holidays = await _mediator.Send(new GetHolidayCommand
            {
                CompanyId = Convert.ToInt32(c.Value)
            });
            return Ok(holidays);

        }
        [HttpGet("/GetHolidaySettings")]
        public async Task<IActionResult> GetHolidaySettings()
        {
            List<GetSettingOptionResponse> SettingWorks = await _mediator.Send(new GetSettingOptionCommand
            {
                SettingType = "Holiday"
            });

            return Ok(SettingWorks);

        }
        [HttpGet("/GetHolidaySettingsByName")]
        public async Task<IActionResult> GetHolidaySettingsByName([FromQuery] GetSettingOptionByNameCommand settingOptionByNameCommand)
        {
            GetSettingOptionByNameResponse SettingWorks = await _mediator.Send(new GetSettingOptionByNameCommand
            {
                SettingType = "Holiday",
                SettingName = settingOptionByNameCommand.SettingName
            });

            return Ok(SettingWorks);

        }

        [HttpPost("/CreateHolidaySettingOption")]
        public async Task<IActionResult> CreateHolidaySettingOption(CreateSettingOptionCommand createSettingOptionCommand)
        {
            CreateSettingOptionResponse SettingWorks = await _mediator.Send(createSettingOptionCommand);

            return Ok(SettingWorks);

        }
        [HttpPost("/CreateHoliday")]
        public async Task<IActionResult> CreateHoliday([FromBody] CreateHolidayCommand command)
        {
            Claim c = HttpContext.GetClaimByStringType("CompanyId");
            command.CompanyId = Convert.ToInt32(c.Value);
            CreateHolidayResponse holiday = await _mediator.Send(command);

            return Ok(holiday);

        }
        [HttpPost("/PrePopulateHolidaysForCompany")]
        public async Task<IActionResult> PrePopulateHolidaysForCompany()
        {
            Claim c = HttpContext.GetClaimByStringType("CompanyId");
            var holidays = await _mediator.Send(new PrepopulateCalendarificCommand
            {
                CompanyId = Convert.ToInt32(c.Value)
            });
            return Ok(holidays);

        }
        [HttpDelete("/DeleteHoliday")]
        public async Task<IActionResult> DeleteHoliday([FromQuery] DeleteHolidayCommand command)
        {
            DeleteHolidayResponse holiday = await _mediator.Send(command);
            return Ok(holiday);
        }

        [HttpPut("/UpdateHoliday")]
        public async Task<IActionResult> UpdateHoliday([FromBody] UpdateHolidayCommand command)
        {
            Claim c = HttpContext.GetClaimByStringType("CompanyId");
            command.CompanyId = Convert.ToInt32(c.Value);
            UpdateHolidayResponse holiday = await _mediator.Send(command);
            return Ok(holiday);
        }
        [HttpGet("/GetHolidayRoutes")]
        public async Task<IActionResult> GetHolidayRoutes()
        {
            IList<GetSettingOptionRouteResponse> UserSettings = await _mediator.Send(new GetSettingOptionRouteCommand
            {
                SettingType = "Holiday",
                SettingName = "Holiday",
            });
            return Ok(UserSettings);

        }
    }
}
