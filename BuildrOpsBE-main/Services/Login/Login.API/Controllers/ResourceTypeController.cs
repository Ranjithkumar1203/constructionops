using BuildrOps.Application.Features.Resource.Commands.CreateResourceLibrary;
using BuildrOps.Application.Features.Resource.Commands.CreateResourceType;
using BuildrOps.Application.Features.Resource.Commands.DeleteResourceLibrary;
using BuildrOps.Application.Features.Resource.Commands.DeleteResourceType;
using BuildrOps.Application.Features.Resource.Commands.GetResourceLibrary;
using BuildrOps.Application.Features.Resource.Commands.GetResourceType;
using BuildrOps.Application.Features.Resource.Commands.UpdateResourceLibrary;
using BuildrOps.Application.Features.Resource.Commands.UpdateResourceType;
using Login.API.Extensions;
using Login.Application.Features.Settings.Command.CreateSettingOption;
using Login.Application.Features.Settings.Command.GetSettingOption;
using Login.Application.Features.Settings.Command.GetSettingOptionByName;
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
    public class ResourceTypeController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ResourceTypeController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }


        [HttpGet("/GetResourceTypes")]
        public async Task<IActionResult> GetResourceType()
        {
            Claim c = HttpContext.GetClaimByStringType("CompanyId");
            var resource = await _mediator.Send(new GetResourceTypeCommand
            {
                CompanyId = Convert.ToInt32(c.Value)
            });
            return Ok(resource);

        }

        [HttpGet("/GetResourceLibrary")]
        public async Task<IActionResult> GetResourceLibrary()
        {
            Claim c = HttpContext.GetClaimByStringType("CompanyId");
            var resource = await _mediator.Send(new GetResourceLibraryCommand
            {
                CompanyId = Convert.ToInt32(c.Value)
            });
            return Ok(resource);

        }
        



        [HttpGet("/GetResourceTypeSettings")]
        public async Task<IActionResult> GetResourceTypeSettings()
        {
            var SettingWorks = await _mediator.Send(new GetSettingOptionCommand
            {
                SettingType = "ResourceType"
            });

            return Ok(SettingWorks);

        }
        [HttpGet("/GetResourceTypeSettingsByName")]
        public async Task<IActionResult> GetResourceTypeSettingsByName([FromQuery] GetSettingOptionByNameCommand settingOptionByNameCommand)
        {
            var SettingWorks = await _mediator.Send(new GetSettingOptionByNameCommand
            {
                SettingType = "ResourceType",
                SettingName = settingOptionByNameCommand.SettingName
            });

            return Ok(SettingWorks);

        }

        [HttpGet("/CreateResourceTypeSettingOption")]
        public async Task<IActionResult> CreateResourceTypeSettingOption(CreateSettingOptionCommand createSettingOptionCommand)
        {
            var SettingWorks = await _mediator.Send(createSettingOptionCommand);

            return Ok(SettingWorks);

        }

        [HttpPost("/CreateResourceLibrary")]
        public async Task<IActionResult> CreateResourceLibrary(CreateResourceLibraryCommand command)
        {
            var Works = await _mediator.Send(command);
            return Ok(Works);

        }


        [HttpPost("/CreateResourceType")]
        public async Task<IActionResult> CreateResourceType(CreateResourceTypeCommand command)
        {
            var Works = await _mediator.Send(command);
            return Ok(Works);

        }
        [HttpPost("/RequestResourceType")]
        public async Task<IActionResult> RequestResourceType()
        {

            //var Works = await _mediator.Send(command);

            return Ok("");

        }

        [HttpDelete("/DeleteResourceType")]
        public async Task<IActionResult> DeleteResourceType(DeleteResourceTypeCommand command)
        {
           var Works = await _mediator.Send(command);
            return Ok(Works);
        }

        [HttpDelete("/DeleteResourceLibrary")]
        public async Task<IActionResult> DeleteResourceTypeLibray(DeleteResourceLibraryCommand command)
        {
            var Works = await _mediator.Send(command);
            return Ok(Works);
        }

        

        [HttpPut("/UpdateResourceType")]
        public async Task<IActionResult> UpdateResourceType(UpdateResourceTypeCommand command)
        {
            var Works = await _mediator.Send(command);
            return Ok(Works);
        }


        [HttpPut("/UpdateResourceLibrary")]
        public async Task<IActionResult> UpdateResourceLibrary(UpdateResourceLibraryCommand command)
        {
            var Works = await _mediator.Send(command);
            return Ok(Works);
        }
        
    }
}