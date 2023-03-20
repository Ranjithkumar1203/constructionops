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
    public class TradeTypesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public TradeTypesController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }
        [HttpGet("/GetTradeTypes")]
        public async Task<IActionResult> GetTradeTypes()
        {
            Claim c = HttpContext.GetClaimByStringType("CompanyId");
            //var WorkSchdueleWorks = await _mediator.Send(new WorkSchduleCommand
            //{
            //    CompanyId = Convert.ToInt32(c.Value)
            //});
            return Ok("");

        }

        [HttpGet("/GetTradeTypesSettings")]
        public async Task<IActionResult> GetContraintsSettings()
        {
            var SettingWorks = await _mediator.Send(new GetSettingOptionCommand
            {
                SettingType = "TradeTypes"
            });

            return Ok(SettingWorks);

        }
        [HttpGet("/GetTradeTypesSettingsByName")]
        public async Task<IActionResult> GetTradeTypesSettingsByName([FromQuery] GetSettingOptionByNameCommand settingOptionByNameCommand)
        {
            var SettingWorks = await _mediator.Send(new GetSettingOptionByNameCommand
            {
                SettingType = "TradeTypes",
                SettingName = settingOptionByNameCommand.SettingName
            });

            return Ok(SettingWorks);

        }

        [HttpGet("/CreateTradeTypesSettingOption")]
        public async Task<IActionResult> CreateContraintsSettingOption(CreateSettingOptionCommand createSettingOptionCommand)
        {
            var SettingWorks = await _mediator.Send(createSettingOptionCommand);

            return Ok(SettingWorks);

        }

        [HttpPost("/CreateTradeTypes")]
        public async Task<IActionResult> CreateTradeTypes()
        {

            //var Works = await _mediator.Send(command);

            return Ok("");

        }

        [HttpDelete("/DeleteTradeTypes")]
        public async Task<IActionResult> DeleteTradeTypes()
        {
            //var Works = await _mediator.Send(command);
            return Ok("");
        }

        [HttpPut("/UpdateTradeTypes")]
        public async Task<IActionResult> UpdateTradeTypes()
        {
            //var Works = await _mediator.Send(command);
            return Ok("");
        }
    }
}