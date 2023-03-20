using Login.API.Extensions;
using Login.Application.Features.WorkLibrary.Commands.CreateWorkScheduleLibrary;
using Login.Application.Features.WorkLibrary.Commands.DeleteWorkSchduleLibrary;
using Login.Application.Features.WorkLibrary.Commands.GetWorkScheduleLibrary;
using Login.Application.Features.WorkLibrary.Commands.UpdateWorkSchduleLibrary;
using MediatR;
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
    public class WorkLibraryController : ControllerBase
    {
        private readonly IMediator _mediator;
        public WorkLibraryController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet("/GetWorkLibrary")]
        public async Task<IActionResult> GetWorkLibrary()
        {
            Claim c = HttpContext.GetClaimByStringType("CompanyId");

            var work = await _mediator.Send(new GetWorkScheduleLibraryCommand() { CompanyId= Convert.ToInt32(c.Value) });
            return Ok(work);
        }

        [HttpPost("/CreateWorkLibrary")]
        public async Task<IActionResult> CreateWorkLibrary([FromBody] CreateWorkScheduleLibraryCommand command)
        {
            var work = await _mediator.Send(command);
            return Ok(work);
        }

        [HttpPut("/UpdateWorkLibrary")]
        public async Task<IActionResult> UpdateWorkLibrary([FromBody] UpdateWorkSchduleLibraryCommand command)
        {
            var work = await _mediator.Send(command);
            return Ok(work);
        }
        
        [HttpDelete("/DeleteWorkLibrary")]
        public async Task<IActionResult> DeleteWorkLibrary([FromBody    ] DeleteWorkScheduleLibraryCommand command)
        {
            var work = await _mediator.Send(command);
            return Ok(work);
        }
    }
}
