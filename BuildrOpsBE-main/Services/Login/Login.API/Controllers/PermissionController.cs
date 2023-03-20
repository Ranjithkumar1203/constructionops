using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Login.Application.Features.Login.Commands.Permissions;
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
    public class PermissionController : ControllerBase
    {

        private readonly IMediator _mediator;

        public PermissionController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet("/GetPermissions")]
        public async Task<IActionResult> GetPermissions()
        {
            List<Claim> r = HttpContext.User.Claims.Where(x => x.Type == "RoleId").ToList();
            GetPermissionResponse response = await _mediator.Send(new GetPermissionCommand { RoleIdClaims = r });
            return Ok(response.Permissions);
        }

    }
}
