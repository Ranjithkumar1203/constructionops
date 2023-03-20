using Login.API.Extensions;
using Login.Application.Features.Settings.Command.CreateSettingOption;
using Login.Application.Features.Settings.Command.GetSettingOption;
using Login.Application.Features.Settings.Command.GetSettingOptionByName;
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
    public class RoleController : ControllerBase
    {
        private readonly IMediator _mediator;
        public RoleController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }
        [HttpGet("/GetRoles")]
        public async Task<IActionResult> GetRoles()
        {
            Claim c = HttpContext.GetClaimByStringType("CompanyId");
            //var WorkSchdueleWorks = await _mediator.Send(new WorkSchduleCommand
            //{
            //    CompanyId = Convert.ToInt32(c.Value)
            //});
            return Ok("");

        }

        [HttpGet("/GetRoleSettings")]
        public async Task<IActionResult> GetRoleSettings()
        {
            var SettingWorks = await _mediator.Send(new GetSettingOptionCommand
            {
                SettingType = "Role"
            });

            return Ok(SettingWorks);

        }
        [HttpGet("/GetRoleSettingsByName")]
        public async Task<IActionResult> GetRoleSettingsByName([FromQuery] GetSettingOptionByNameCommand settingOptionByNameCommand)
        {
            var SettingWorks = await _mediator.Send(new GetSettingOptionByNameCommand
            {
                SettingType = "Role",
                SettingName = settingOptionByNameCommand.SettingName
            });

            return Ok(SettingWorks);

        }

        [HttpGet("/CreateRoleSettingOption")]
        public async Task<IActionResult> CreateRoleSettingOption(CreateSettingOptionCommand createSettingOptionCommand)
        {
            var SettingWorks = await _mediator.Send(createSettingOptionCommand);

            return Ok(SettingWorks);

        }

        [HttpPost("/CreateRole")]
        public async Task<IActionResult> CreateRole()
        {

            //var Works = await _mediator.Send(command);

            return Ok("");

        }

        [HttpDelete("/DeleteRole")]
        public async Task<IActionResult> DeletRole()
        {
            //var Works = await _mediator.Send(command);
            return Ok("");
        }

        [HttpPut("/UpdateRole")]
        public async Task<IActionResult> UpdateRole()
        {
            //var Works = await _mediator.Send(command);
            return Ok("");
        }
    }
}
