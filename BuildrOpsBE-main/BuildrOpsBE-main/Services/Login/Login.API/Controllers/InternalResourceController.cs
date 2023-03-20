using Login.API.Extensions;
using Login.Application.Features.Holiday.Commands.CreateHoliday;
using Login.Application.Features.Holiday.Commands.GetHoliday;
using Login.Application.Features.Holiday.Commands.UpdateHoliday;
using Login.Application.Features.Holiday.Commands.DeleteHoliday;
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
    public class InternalResourceController : ControllerBase
    {
        private readonly IMediator _mediator;
        public InternalResourceController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet("/GetInteralResources")]
        public async Task<IActionResult> GetInteralResources()
        {
            Claim c = HttpContext.GetClaimByStringType("CompanyId");
            IList<GetHolidayResponse> holidays = await _mediator.Send(new GetHolidayCommand
            {
                CompanyId = Convert.ToInt32(c.Value)
            });
            return Ok(holidays);

        }
        [HttpGet("/GetInteralResourceTypes")]
        public async Task<IActionResult> GetInteralResourceTypes()
        {
            Claim c = HttpContext.GetClaimByStringType("CompanyId");
            IList<GetHolidayResponse> holidays = await _mediator.Send(new GetHolidayCommand
            {
                CompanyId = Convert.ToInt32(c.Value)
            });
            return Ok(holidays);

        }



        [HttpPost("/CreateInternalResources")]
        public async Task<IActionResult> CreateInternalResources([FromBody] CreateHolidayCommand command)
        {

            CreateHolidayResponse holiday = await _mediator.Send(command);

            return Ok(holiday);

        }

        [HttpDelete("/DeleteInternalResources")]
        public async Task<IActionResult> DeleteInternalResources([FromQuery] DeleteHolidayCommand command)
        {
            DeleteHolidayResponse holiday = await _mediator.Send(command);
            return Ok(holiday);
        }

        [HttpPut("/UpdateInternalResources")]
        public async Task<IActionResult> UpdateInternalResources([FromBody] UpdateHolidayCommand command)
        {
            UpdateHolidayResponse holiday = await _mediator.Send(command);
            return Ok(holiday);
        }
    }
}
