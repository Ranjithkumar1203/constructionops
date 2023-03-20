using Login.API.Extensions;
using Login.Application.Features.TitleLibrary.Command.CreateTitleLibrary;
using Login.Application.Features.TitleLibrary.Command.GetTitleLibrary;
using Login.Application.Features.TitleLibrary.Command.UpdateTitleLibrary;
using Login.Application.Features.TitleLibrary.Command.DeleteTitleLibrary;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
    public class TitleLibraryController : ControllerBase
    {
        private readonly IMediator _mediator;
        public TitleLibraryController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet("/GetTitleLibrary")]
        public async Task<IActionResult> GetTitleLibraryByCompanyId()
        {
            Claim c = HttpContext.GetClaimByStringType("CompanyId");
            IList<GetTitleLibraryResponse> TitleLibrarys = await _mediator.Send(new GetTitleLibraryCommand
            {
                CompanyId = Convert.ToInt32(c.Value)
            });
            return Ok(TitleLibrarys);

        }



        [HttpPost("/CreateTitleLibrary")]
        public async Task<IActionResult> CreateTitleLibrary([FromBody] CreateTitleLibraryCommand command)
        {

            CreateTitleLibraryResponse TitleLibrary = await _mediator.Send(command);

            return Ok(TitleLibrary);

        }

        [HttpDelete("/DeleteTitleLibrary")]
        public async Task<IActionResult> DeleteTitleLibrary([FromQuery] DeleteTitleLibraryCommand command)
        {
            DeleteTitleLibraryResponse TitleLibrary = await _mediator.Send(command);
            return Ok(TitleLibrary);
        }

        [HttpPut("/UpdateTitleLibrary")]
        public async Task<IActionResult> UpdateTitleLibrary([FromBody] UpdateTitleLibraryCommand command)
        {
            UpdateTitleLibraryResponse TitleLibrary = await _mediator.Send(command);
            return Ok(TitleLibrary);
        }
    }
}
