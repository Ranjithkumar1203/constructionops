using BuildrOps.Application.Features.Notifications.Commands.UpdateNotificationRead;
using Login.API.Extensions;
using Login.Application.Features.Notifications.Commands.GetNotifications;
using Login.Application.Features.UserSettings.Command.CreateUserSettingValue;
using Login.Application.Features.UserSettings.Command.GetUserSettingValue;
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
    public class NotificationController : ControllerBase
    {
        private readonly IMediator _mediator;
        public NotificationController(IMediator m)
        {
            _mediator = m;
        }

        [HttpGet("/GetNotifications")]
        public async Task<IActionResult> GetNotificationsByUserId()
        {
            int userId = Convert.ToInt32(HttpContext.GetClaimByStringType("UserId").Value);
            var work = await _mediator.Send(new GetNotificationsCommand {
                UserId = userId
            });
            return Ok(work);
        }
        [HttpPut("/UpdateNotification")]
        public async Task<IActionResult> UpdateNotification([FromBody] UpdateNotificationCommand command)
        {
            Claim userId = HttpContext.GetClaimByStringType("UserId");
            command.UserId = Convert.ToInt32(userId.Value);


            return Ok("");

        }
        [HttpPost("/UpdateToggleButton")]
        public async Task<IActionResult> UpdateToggleButton([FromBody] CreateUserSettingCommand command)
        {
            Claim userId = HttpContext.GetClaimByStringType("UserId");
            command.UserId = Convert.ToInt32(userId.Value);
            command.SettingId = 14;

            CreateUserSettingResponse UserSetting = await _mediator.Send(command);

            return Ok(UserSetting);

        }
        [HttpGet("/GetToggleButtonSetting")]
        public async Task<IActionResult> GetUserFavoriteSetting()
        {
            Claim companyId = HttpContext.GetClaimByStringType("CompanyId");
            Claim userId = HttpContext.GetClaimByStringType("UserId");
            IList<GetUserSettingResponse> UserSettings = await _mediator.Send(new GetUserSettingCommand
            {
                CompanyId = Convert.ToInt32(companyId.Value),

                UserId = Convert.ToInt32(userId.Value),
                SettingType = "Favorite",
                SettingName = "Favorite"
            });
            return Ok(UserSettings);

        }

        [HttpGet("/GetWarnings")]
        public async Task<IActionResult> GetWarnings()
        {
            int userId = Convert.ToInt32(HttpContext.GetClaimByStringType("UserId").Value);
            var work = await _mediator.Send(new GetNotificationsCommand
            {
                UserId = userId
            });
            return Ok(work);
        }
        [HttpPut("/UpdateWarnings")]
        public async Task<IActionResult> UpdateWarnings([FromBody] UpdateNotificationCommand command)
        {
            Claim userId = HttpContext.GetClaimByStringType("UserId");
            command.UserId = Convert.ToInt32(userId.Value);


            return Ok("");

        }
        [HttpGet("/GetOpenItems")]
        public async Task<IActionResult> GetOpenItems()
        {
            int userId = Convert.ToInt32(HttpContext.GetClaimByStringType("UserId").Value);
            var work = await _mediator.Send(new GetNotificationsCommand
            {
                UserId = userId
            });
            return Ok(work);
        }
        [HttpPut("/UpdateOpenItems")]
        public async Task<IActionResult> UpdateOpenItems([FromBody] UpdateNotificationCommand command)
        {
            Claim userId = HttpContext.GetClaimByStringType("UserId");
            command.UserId = Convert.ToInt32(userId.Value);


            return Ok("");

        }
       
    }
}
