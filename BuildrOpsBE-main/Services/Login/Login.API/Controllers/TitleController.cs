using Login.API.Extensions;
using Login.Application.Features.Title.Command.CreateTitle;
using Login.Application.Features.Title.Command.GetTitle;
using Login.Application.Features.Title.Command.UpdateTitle;
using Login.Application.Features.Title.Command.DeleteTitle;
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

namespace Login.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class TitleController : ControllerBase
    {
        private readonly IMediator _mediator;
        public TitleController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet("/GetTitle")]
        public async Task<IActionResult> GetTitleByCompanyId()
        {
            Claim c = HttpContext.GetClaimByStringType("CompanyId");
            IList<GetTitleResponse> Titles = await _mediator.Send(new GetTitleCommand
            {
                CompanyId = Convert.ToInt32(c.Value)
            });
            return Ok(Titles);

        }



        [HttpPost("/CreateTitle")]
        public async Task<IActionResult> CreateTitle([FromBody] CreateTitleCommand command)
        {
            Claim c = HttpContext.GetClaimByStringType("CompanyId");
            command.CompanyId = Convert.ToInt32(c.Value);

            CreateTitleResponse Title = await _mediator.Send(command);

            return Ok(Title);

        }

        [HttpDelete("/DeleteTitle")]
        public async Task<IActionResult> DeleteTitle([FromQuery] DeleteTitleCommand command)
        {

            DeleteTitleResponse Title = await _mediator.Send(command);
            return Ok(Title);
        }
        [HttpDelete("/DeleteMultipleTitle")]
        public async Task<IActionResult> DeleteMultipleTitle([FromBody] List<DeleteTitleCommand> command)
        {
            List<DeleteTitleResponse> response = new List<DeleteTitleResponse>();
            if(command!=null)
            {
                foreach(DeleteTitleCommand deleteTitleCommand in command)
                {
                    DeleteTitleResponse Title = await _mediator.Send(deleteTitleCommand);
                    response.Add(Title);
                }
            }
            return Ok(response);
        }
        [HttpPut("/UpdateMultipleTitle")]
        public async Task<IActionResult> UpdateMultipleTitle([FromBody] List<UpdateTitleCommand> command)
        {
            List<UpdateTitleResponse> response = new List<UpdateTitleResponse>();
            if (command != null)
            {

                foreach (UpdateTitleCommand updateTitleCommand in command)
                {
                    UpdateTitleResponse Title = await _mediator.Send(updateTitleCommand);
                    response.Add(Title);
                }
            }
            return Ok(response);
        }

        [HttpPut("/UpdateTitle")]
        public async Task<IActionResult> UpdateTitle([FromBody] UpdateTitleCommand command)
        {
            UpdateTitleResponse Title = await _mediator.Send(command);
            return Ok(Title);
        }
    }
}
