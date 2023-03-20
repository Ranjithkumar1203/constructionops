using Login.API.Extensions;
using Login.Application.Features.Settings.Command.CreateSettingOption;
using Login.Application.Features.Settings.Command.GetSettingOption;
using Login.Application.Features.Settings.Command.GetSettingOptionByName;
using Login.Application.Features.WorkScheduele.Commands.CreateWorkSchdule;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BuildrOps.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ConstraintsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ConstraintsController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }
        [HttpGet("/GetConstraints")]
        public async Task<IActionResult> GetConstraints()
        {
            Claim c = HttpContext.GetClaimByStringType("CompanyId");
            //var WorkSchdueleWorks = await _mediator.Send(new WorkSchduleCommand
            //{
            //    CompanyId = Convert.ToInt32(c.Value)
            //});
            return Ok("");

        }

        [HttpGet("/GetConstraintsSettings")]
        public async Task<IActionResult> GetContraintsSettings()
        {
            var SettingWorks = await _mediator.Send(new GetSettingOptionCommand
            {
                SettingType = "Constraints"
            });

            return Ok(SettingWorks);

        }
        [HttpGet("/GetConstraintsSettingsByName")]
        public async Task<IActionResult> GetConstraintsSettingsByName([FromQuery] GetSettingOptionByNameCommand settingOptionByNameCommand)
        {
            var SettingWorks = await _mediator.Send(new GetSettingOptionByNameCommand
            {
                SettingType = "Constraints",
                SettingName = settingOptionByNameCommand.SettingName
            });

            return Ok(SettingWorks);

        }

        [HttpGet("/CreateConstraintsSettingOption")]
        public async Task<IActionResult> CreateContraintsSettingOption(CreateSettingOptionCommand createSettingOptionCommand)
        {
            var SettingWorks = await _mediator.Send(createSettingOptionCommand);

            return Ok(SettingWorks);

        }

        [HttpPost("/CreateConstraints")]
        public async Task<IActionResult> CreateConstraints()
        {

            //var Works = await _mediator.Send(command);

            return Ok("");

        }

        [HttpDelete("/DeleteConstraints")]
        public async Task<IActionResult> DeletConstraints()
        {
            //var Works = await _mediator.Send(command);
            return Ok("");
        }

        [HttpPut("/UpdateConstraints")]
        public async Task<IActionResult> UpdateConstraints()
        {
            //var Works = await _mediator.Send(command);
            return Ok("");
        }
    }
}
