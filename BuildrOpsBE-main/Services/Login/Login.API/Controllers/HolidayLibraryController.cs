using Login.API.Extensions;
using Login.Application.Features.HolidayLibrary.Commands.CreateHolidayLibrary;
using Login.Application.Features.HolidayLibrary.Commands.DeleteHolidayLibrary;
using Login.Application.Features.HolidayLibrary.Commands.GetHolidayLibrary;
using Login.Application.Features.HolidayLibrary.Commands.UpdateHolidayLibrary;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;


namespace Login.API.Controllers
{
    public class HolidayLibraryController : ControllerBase
    {
        private readonly IMediator _mediator;
        public HolidayLibraryController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet("/GetHolidayLibrary")]
        public async Task<IActionResult> GetHolidayLibrary()
        {
            Claim c = HttpContext.GetClaimByStringType("CompanyId");

            var work = await _mediator.Send(new GetHolidayLibraryCommand() { CompanyId = Convert.ToInt32(c.Value) });
            return Ok(work);
        }

        [HttpPost("/CreateHolidayLibrary")]
        public async Task<IActionResult> CreateHolidayLibrary([FromBody] CreateHolidayLibraryCommand command)
        {
            var work = await _mediator.Send(command);
            return Ok(work);
        }

        [HttpPut("/UpdateHolidayLibrary")]
        public async Task<IActionResult> UpdateHolidayLibrary([FromBody] UpdateHolidayLibraryCommand command)
        {
            var work = await _mediator.Send(command);
            return Ok(work);
        }

        [HttpDelete("/DeleteHolidayLibrary")]
        public async Task<IActionResult> DeleteHolidayLibrary([FromQuery] DeleteHolidayLibraryCommand command)
        {
            var work = await _mediator.Send(command);
            return Ok(work);
        }
    }
}

