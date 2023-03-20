using BuildrOps.Application.Features.Department.Commands.CreateDepartment;
using BuildrOps.Application.Features.Department.Commands.CreateDepartmentLibrary;
using BuildrOps.Application.Features.Department.Commands.DeleteDepartment;
using BuildrOps.Application.Features.Department.Commands.DeleteDepartmentLibrary;
using BuildrOps.Application.Features.Department.Commands.GetDepartment;
using BuildrOps.Application.Features.Department.Commands.GetDepartmentLibrary;
using BuildrOps.Application.Features.Department.Commands.UpdateDepartment;
using BuildrOps.Application.Features.Department.Commands.UpdateDepartmentLibrary;
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
    public class DepartmentController : ControllerBase
    {
        private readonly IMediator _mediator;
        public DepartmentController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }
        [HttpGet("/GetDepartments")]
        public async Task<IActionResult> GetDepartments()
        {
            Claim c = HttpContext.GetClaimByStringType("CompanyId");
            var departmentList = await _mediator.Send(new GetDepartmentCommand
            {
                CompanyId = Convert.ToInt32(c.Value)
            });
            return Ok(departmentList);

        }
        [HttpPost("/RequestDepartment")]
        public async Task<IActionResult> RequestDepartment(CreateDepartmentCommand command)
        {
            Claim userId = HttpContext.GetClaimByStringType("UserId");
            command.CreatedBy = Convert.ToInt32(userId.Value);
            var department = await _mediator.Send(command);

            return Ok(department);
        }


        [HttpPost("/CreateDepartment")]
        public async Task<IActionResult> CreateDepartment(CreateDepartmentCommand command)
        {
            Claim userId = HttpContext.GetClaimByStringType("UserId");
            command.CreatedBy = Convert.ToInt32(userId.Value);
            var department = await _mediator.Send(command);

            return Ok(department);

        }

        [HttpDelete("/DeleteDepartment")]
        public async Task<IActionResult> DeleteDepartment(DeleteDepartmentCommand command)
        {
            var department = await _mediator.Send(command);
            return Ok(department);
        }

        [HttpPut("/UpdateDepartment")]
        public async Task<IActionResult> UpdateDepartment(UpdateDepartmentCommand command)
        {
            Claim userId = HttpContext.GetClaimByStringType("UserId");
            command.UpdatedBy = Convert.ToInt32(userId.Value);
            var department = await _mediator.Send(command);
            return Ok(department);
        }

        [HttpPost("/CreateDepartmentLibrary")]
        public async Task<IActionResult> CreateDepartmentLibray(CreateDepartmentLibraryCommand command)
        {
            Claim userId = HttpContext.GetClaimByStringType("UserId");
            command.CreatedBy = Convert.ToInt32(userId.Value);
            var department = await _mediator.Send(command);

            return Ok(department);

        }
        [HttpDelete("/DeleteDepartmentLibrary")]
        public async Task<IActionResult> DeleteDepartmentLibrary(DeleteDepartmentLibraryCommand command)
        {
            var department = await _mediator.Send(command);
            return Ok(department);
        }
        [HttpGet("/GetDepartmentsLibrary")]


        public async Task<IActionResult> GetDepartmentsLibrary()
        {
            Claim c = HttpContext.GetClaimByStringType("CompanyId");
            var departmentList = await _mediator.Send(new GetDepartmentLibraryCommand
            {
                CompanyId = Convert.ToInt32(c.Value)
            });
            return Ok(departmentList);

        }
        [HttpPut("/UpdateDepartmentLibrary")]
        public async Task<IActionResult> UpdateDepartmentLibrary(UpdateDepartmentLibraryCommand command)
        {
            Claim userId = HttpContext.GetClaimByStringType("UserId");
            command.UpdatedBy = Convert.ToInt32(userId.Value);
            var department = await _mediator.Send(command);
            return Ok(department);
        }

    }
}