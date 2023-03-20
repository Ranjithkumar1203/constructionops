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
namespace BuildrOps.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class FavoriteController : ControllerBase
    {
        private readonly IMediator _mediator;
        public FavoriteController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet("/GetFavoriteOptions")]
        public async Task<IActionResult> GetFavoriteOptions()
        {
            var SettingWorks = await _mediator.Send(new GetSettingOptionCommand
            {
                SettingType = "Favorite",
            });

            return Ok(SettingWorks);

        }

        [HttpGet("/GetUserFavoriteSetting")]
        public async Task<IActionResult> GetUserFavoriteSetting()
        {
            Claim companyId = HttpContext.GetClaimByStringType("CompanyId");
            Claim userId = HttpContext.GetClaimByStringType("UserId");
            List<GetUserSettingResponse> UserSettings = await _mediator.Send(new GetUserSettingCommand
            {
                CompanyId = Convert.ToInt32(companyId.Value),

                UserId = Convert.ToInt32(userId.Value),
                SettingType = "Favorite",
                SettingName = "Favorite"
            });
            List<GetSettingOptionRouteResponse> settingOptionRoutes = await _mediator.Send(new GetSettingOptionRouteCommand
            {
                SettingType = "Favorite",
                SettingName = "Favorite",
            });
            foreach(GetUserSettingResponse userSetting in UserSettings)
            {
                GetSettingOptionRouteResponse getSettingOptionRoute = settingOptionRoutes.FirstOrDefault(a => a.OptionValue == userSetting.SelectedValue);
                if(getSettingOptionRoute!=null)
                {
                    userSetting.Route = getSettingOptionRoute.Route.SingleClickRoute;
                    userSetting.IsAdded = true;
                }
                else
                {
                    userSetting.IsAdded = false;
                }
            }
            return Ok(UserSettings);

        }

        [HttpDelete("/DeleteUserFavoriteSetting")]
        public async Task<IActionResult> DeleteUserFavoriteSetting([FromQuery] DeleteUserSettingCommand command)
        {
            DeleteUserSettingResponse UserSetting = await _mediator.Send(command);
            return Ok(UserSetting);
        }

        [HttpPut("/UpdateUserFavoriteSetting")]
        public async Task<IActionResult> UpdateUserFavoriteSetting([FromBody] UpdateUserSettingCommand command)
        {
            Claim userId = HttpContext.GetClaimByStringType("UserId");
            command.UserId = Convert.ToInt32(userId.Value);
            UpdateUserSettingResponse UserSetting = await _mediator.Send(command);
            return Ok(UserSetting);
        }

       [HttpPost("/CreateUserFavoriteSetting")]
        public async Task<IActionResult> CreateUserFavoriteSetting([FromBody] CreateUserSettingCommand command)
        {
            Claim userId = HttpContext.GetClaimByStringType("UserId");
            command.UserId = Convert.ToInt32(userId.Value);
            command.SettingId = 14;

            CreateUserSettingResponse UserSetting = await _mediator.Send(command);

            return Ok(UserSetting);

        }
    }
}
