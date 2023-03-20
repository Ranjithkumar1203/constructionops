using Login.API.Extensions;
using Login.Application.Features.Settings.Command.GetSettingOption;
using Login.Application.Features.Settings.Command.GetSettingOptionRoute;
using Login.Application.Features.Settings.Command.GetSettinOptionRouteByOptionValue;
using Login.Application.Features.UserSettings.Command.CreateUserSettingValue;
using Login.Application.Features.UserSettings.Command.DeleteUserSettingValue;
using Login.Application.Features.UserSettings.Command.GetUserSettingValue;
using Login.Application.Features.UserSettings.Command.UpdateUserSettingValue;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Login.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UserSettingController : ControllerBase
    {
        private readonly IMediator _mediator;
        public UserSettingController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }
        [HttpGet("/GetUserRightPanelSetting")]
        public async Task<IActionResult> GetUserRightPanelSetting()
        {
            Claim companyId = HttpContext.GetClaimByStringType("CompanyId");
            Claim userId = HttpContext.GetClaimByStringType("UserId");
            IList<GetUserSettingResponse> UserSettings = await _mediator.Send(new GetUserSettingCommand
            {
                CompanyId = Convert.ToInt32(companyId.Value),

                UserId = Convert.ToInt32(userId.Value),
                SettingType= "RightPanelTabs",
                SettingName= "Right Side Panel Tab"
            });
            return Ok(UserSettings);

        }
        [HttpGet("/GetUserRightPanelSettingRoutes")]
        public async Task<IActionResult> GetUserRightPanelSettingRoutes()
        {
            IList<GetSettingOptionRouteResponse> UserSettings = await _mediator.Send(new GetSettingOptionRouteCommand
            {
                SettingType = "RightPanelTabs",
                SettingName = "Right Side Panel Tab",
            });
            return Ok(UserSettings);

        }
        [HttpGet("/GetUserRightPanelSettingSouteByValue")]
        public async Task<IActionResult> GetUserRightPanelSettingSouteByValue(string settingValue)
        {
            GetSettingOptionRouteByOptionValueResponse UserSettings = await _mediator.Send(new GetSettingOptionRouteByOptionValueCommand
            {
                SettingType = "RightPanelTabs",
                SettingName = "Right Side Panel Tab",
                OptionValue=settingValue
            });
            return Ok(UserSettings);

        }
        [HttpGet("/GetRightPanelUserSettingOptions")]
        public async Task<IActionResult> GetRightPanelUserSettingOptions()
        {
            var SettingWorks = await _mediator.Send(new GetSettingOptionCommand
            {
                SettingType = "RightPanelTabs",
            });

            return Ok(SettingWorks);

        }
        [HttpGet("/GetRightPanelTaskListOptions")]
        public async Task<IActionResult> GetRightPanelTaskListOptions()
        {
            var SettingWorks = await _mediator.Send(new GetSettingOptionCommand
            {
                SettingType = "RightPanelTaskList",
            });

            return Ok(SettingWorks);

        }
        [HttpGet("/GetRightPanelProjectListOptions")]
        public async Task<IActionResult> GetRightPanelProjectListOptions()
        {
            var SettingWorks = await _mediator.Send(new GetSettingOptionCommand
            {
                SettingType = "RightPanelProjectList",
            });

            return Ok(SettingWorks);

        }
        [HttpGet("/GetRightPanelUserListOptions")]
        public async Task<IActionResult> GetRightPanelUserListOptions()
        {
            var SettingWorks = await _mediator.Send(new GetSettingOptionCommand
            {
                SettingType = "RightPanelUserList",
            });

            return Ok(SettingWorks);

        }
        [HttpGet("/GetRightPanelCustomerListOptions")]
        public async Task<IActionResult> GetRightPanelCustomerListOptions()
        {
            var SettingWorks = await _mediator.Send(new GetSettingOptionCommand
            {
                SettingType = "RightPanelCustomerList",
            });

            return Ok(SettingWorks);

        }
        [HttpPost("/CreateUserRightPanelSetting")]
        public async Task<IActionResult> CreateUserRightPanelSetting([FromBody] CreateUserSettingCommand command)
        {
            Claim userId = HttpContext.GetClaimByStringType("UserId");
            command.UserId = Convert.ToInt32( userId.Value);

            CreateUserSettingResponse UserSetting = await _mediator.Send(command);

            return Ok(UserSetting);

        }
        [HttpPost("/CreateUserRightPanelAssignment")]
        public async Task<IActionResult> CreateUserRightPanelAssignment([FromBody] CreateUserSettingCommand command)
        {
            Claim userId = HttpContext.GetClaimByStringType("UserId");
            command.UserId = Convert.ToInt32(userId.Value);

            CreateUserSettingResponse UserSetting = await _mediator.Send(command);

            return Ok(UserSetting);

        }
        [HttpPut("/UpdateUserRightPanelAssignment")]
        public async Task<IActionResult> UpdateUserRightPanelAssignment([FromBody] UpdateUserSettingCommand command)
        {

            Claim userId = HttpContext.GetClaimByStringType("UserId");
            command.UserId = Convert.ToInt32(userId.Value);
            UpdateUserSettingResponse UserSetting = await _mediator.Send(command);
            return Ok(UserSetting);
        }
        [HttpDelete("/DeleteUserSetting")]
        public async Task<IActionResult> DeleteUserSetting([FromQuery] DeleteUserSettingCommand command)
        {
            DeleteUserSettingResponse UserSetting = await _mediator.Send(command);
            return Ok(UserSetting);
        }

        [HttpPut("/UpdateUserSetting")]
        public async Task<IActionResult> UpdateUserSetting([FromBody] UpdateUserSettingCommand command)
        {
            Claim userId = HttpContext.GetClaimByStringType("UserId");
            command.UserId = Convert.ToInt32(userId.Value);
            UpdateUserSettingResponse UserSetting = await _mediator.Send(command);
            return Ok(UserSetting);
        }
    }
}
