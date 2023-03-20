using BuildrOps.Application.Features.Frequents.Command.GetFrequents;
using BuildrOps.Application.Features.Frequents.Command.InsertOrUpdateFrequents;
using Login.API.Extensions;
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
    public class FrequentsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public FrequentsController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet("/GetFrequents")]
        public async Task<IActionResult> GetFrequents()
        {
            Claim userId = HttpContext.GetClaimByStringType("UserId");

            List<GetFrequentsResponse> frequents = await _mediator.Send(new GetFrequentsCommand
            {
                UserId = Convert.ToInt32(userId.Value)
            });

            return Ok(frequents);

        }

        [HttpPost("/InsertOrUpdateFrequents")]
        public async Task<IActionResult> InsertOrUpdateFrequents(InsertOrUpdateFrequentsCommand insertOrUpdateFrequentsCommand)
        {
            Claim companyId = HttpContext.GetClaimByStringType("CompanyId");
            var referer=Request.Headers["Referer"].ToString();
            Claim userId = HttpContext.GetClaimByStringType("UserId");
            if(insertOrUpdateFrequentsCommand!=null)
            {
                InsertOrUpdateFrequentsResponse UserSettings = await _mediator.Send(new InsertOrUpdateFrequentsCommand
                {
                    UserId = Convert.ToInt32(userId.Value),
                    FrequentRoute=insertOrUpdateFrequentsCommand.FrequentRoute,
                    SettingName="Favorite",
                    SettingType="Favorite"
                });
                return Ok(UserSettings);
            }
            return Ok("Failure");

        }

    }
}
