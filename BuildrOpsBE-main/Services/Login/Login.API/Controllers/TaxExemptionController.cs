using BuildrOps.Application.Contracts.Infrastructure;
using Login.API.Extensions;
using Login.Application.Features.Settings.Command.GetSettingOption;
using Login.Application.Features.UserSettings.Command.CreateUserSettingValue;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BuildrOps.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class TaxExemptionController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IAmazonS3Services _amazonS3Services;
        public TaxExemptionController(IMediator mediator,IAmazonS3Services amazonS3Services)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _amazonS3Services = amazonS3Services;
        }
        [HttpPost]
        public async Task<IActionResult> UploadDocument(
        [FromHeader] String documentType,
        [FromForm] IFormFile file
        )
        {
            if (file.Length > 0)
            {
                var ms = new MemoryStream();
                file.CopyTo(ms);
                //await _amazonS3Services.UploadFileToS3("buildropsclientattachments", file.FileName, ms);
            }
            // TODO: handle file upload
            return await Task.FromResult(Ok());
        }

        [HttpGet("/GetTaxExemptionSettings")]
        public async Task<IActionResult> GetTaxExemptionSettings()
        {
            var SettingWorks = await _mediator.Send(new GetSettingOptionCommand
            {
                SettingType = "TaxExemption"
            });

            return Ok(SettingWorks);

        }
        [HttpPost("/SetReminder")]
        public async Task<IActionResult> SetReminder([FromBody] CreateUserSettingCommand command)
        {
            Claim userId = HttpContext.GetClaimByStringType("UserId");
            command.UserId = Convert.ToInt32(userId.Value);
            command.SettingId = 14;

            var SettingWorks = await _mediator.Send(command);

            return Ok(SettingWorks);

        }
        [HttpPut("/UpdateReminder")]
        public async Task<IActionResult> UpdateReminder([FromBody] CreateUserSettingCommand command)
        {
            Claim userId = HttpContext.GetClaimByStringType("UserId");
            command.UserId = Convert.ToInt32(userId.Value);
            command.SettingId = 14;

            var SettingWorks = await _mediator.Send(command);

            return Ok(SettingWorks);

        }
        [HttpGet("/GetReminders")]
        public async Task<IActionResult> GetReminders()
        {
            var SettingWorks = await _mediator.Send(new GetSettingOptionCommand
            {
                SettingType = "TaxExemption"
            });

            return Ok(SettingWorks);

        }
    }
}
