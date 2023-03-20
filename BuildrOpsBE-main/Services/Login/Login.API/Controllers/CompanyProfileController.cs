using BuildrOps.Application.Contracts.Infrastructure;
using BuildrOps.Application.Features.CompanyProfile.CompanyCommunication.Command.GetCompanyCommunication;
using BuildrOps.Application.Features.CompanyProfile.CompanyCostControl.Commands.GetCompanyCostControl;
using BuildrOps.Application.Features.CompanyProfile.CompanyCustomers.Commands.GetCompanyCustomers;
using BuildrOps.Application.Features.CompanyProfile.CompanyDesignSelection.Commands.GetDesignSelection;
using BuildrOps.Application.Features.CompanyProfile.CompanyDetails.Commands;
using BuildrOps.Application.Features.CompanyProfile.CompanyImages.Commands.GetCompanyImage;
using BuildrOps.Application.Features.CompanyProfile.CompanyPlanSpecification.Commands.GetCompanyPlan;
using BuildrOps.Application.Features.CompanyProfile.CompanyProjects.Commands.GetCompanyProject;
using BuildrOps.Application.Features.CompanyProfile.CompanyQualityAssurance.Commands.GetCompanyQuality;
using BuildrOps.Application.Features.CompanyProfile.CompanySchedules.Commands.GetCompanySchedules;
using BuildrOps.Application.Features.CompanyProfile.CompanyTask.Commands.GetCompanyTask;
using BuildrOps.Application.Features.CompanyProfile.CompanyUsers.Commands.GetCompanyUser;
using BuildrOps.Application.Features.CompanyProfile.ProfilePercentage.Commands.GetProfilePercentage;
using Login.API.Extensions;
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
    public class CompanyProfileController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IAmazonS3Services _amazonS3Services;
        public CompanyProfileController(IMediator mediator, IAmazonS3Services amazonS3Services)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _amazonS3Services = amazonS3Services;
        }
        [HttpPost("/UploadLogo")]
        public async Task<IActionResult> UploadLogo(
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
        [HttpGet("/GetCompanyLogo")]
        public async Task<IActionResult> GetCompanyLogo()
        {

            return Ok("50");

        }
        [HttpGet("/GetProfileCompletionPercentage")]
        public async Task<IActionResult> GetProfileCompletionPercentage()
        {
           
            return Ok("50");

        }
        [HttpGet("/GetCompanyEntityData")]
        public async Task<IActionResult> GetCompanyEntityData()
        {

            return Ok("50");

        }

       


        [HttpPost("/PostCompanyEntityData")]
        public async Task<IActionResult> PostCompanyEntityData([FromBody] CreateUserSettingCommand command)
        {
            Claim userId = HttpContext.GetClaimByStringType("UserId");
            command.UserId = Convert.ToInt32(userId.Value);
            command.SettingId = 14;

            var SettingWorks = await _mediator.Send(command);

            return Ok(SettingWorks);

        }


        [HttpGet("/GetCompanyCommunication")]
        public async Task<IActionResult> GetCompanyCommunication()
        {

            Claim c = HttpContext.GetClaimByStringType("CompanyId");
            var departmentList = await _mediator.Send(new GetCompanyCommunicationCommand
            {
                CompanyId = Convert.ToInt32(c.Value)
            });

            return Ok(departmentList);

        }
        [HttpGet("/getCompanyCostControl")]
        public async Task<IActionResult> getCompanyCostControl()
        {

            Claim c = HttpContext.GetClaimByStringType("CompanyId");
            var ControlList = await _mediator.Send(new GetCompanyCostControlCommand
            {
                CompanyId = Convert.ToInt32(c.Value)
            });

            return Ok(ControlList);

        }
        [HttpGet("/getCompanyCustomers")]
        public async Task<IActionResult> getCompanyCustomers()
        {

            Claim c = HttpContext.GetClaimByStringType("CompanyId");

            var CustomersList = await _mediator.Send(new GetCompanyCustomerscommand
            {
                CompanyId = Convert.ToInt32(c.Value)
            });

            return Ok(CustomersList);

        }
        [HttpGet("/getCompanyDesignSelection")]
        public async Task<IActionResult> getCompanyDesign()
        {

            Claim c = HttpContext.GetClaimByStringType("CompanyId");

            var CustomersList = await _mediator.Send(new GetDesignSelectionCommand
            {
                CompanyId = Convert.ToInt32(c.Value)
            });

            return Ok(CustomersList);

        }

        [HttpGet("/getCompanyImage")]
        public async Task<IActionResult> getCompanyImage()
        {

            Claim c = HttpContext.GetClaimByStringType("CompanyId");

            var CustomersList = await _mediator.Send(new GetCompanyImageCommand
            {
                CompanyId = Convert.ToInt32(c.Value)
            });

            return Ok(CustomersList);

        }

        [HttpGet("/getCompanyPlan")]
        public async Task<IActionResult> getCompanyPlan()
        {

            Claim c = HttpContext.GetClaimByStringType("CompanyId");

            var CustomersList = await _mediator.Send(new GetCompanyPlanCommand
            {
                CompanyId = Convert.ToInt32(c.Value)
            });

            return Ok(CustomersList);

        }

        [HttpGet("/getCompanyProject")]
        public async Task<IActionResult> getCompanyProject()
        {

            Claim c = HttpContext.GetClaimByStringType("CompanyId");

            var CustomersList = await _mediator.Send(new GetCompanyProjectCommand
            {
                CompanyId = Convert.ToInt32(c.Value)
            });

            return Ok(CustomersList);

        }


        [HttpGet("/getCompanyQuality")]
        public async Task<IActionResult> getCompanyQuality()
        {

            Claim c = HttpContext.GetClaimByStringType("CompanyId");

            var CustomersList = await _mediator.Send(new GetCompanyQualityCommand
            {
                CompanyId = Convert.ToInt32(c.Value)
            });

            return Ok(CustomersList);

        }

        [HttpGet("/getCompanySchedules")]
        public async Task<IActionResult> getCompanySchedules()
        {

            Claim c = HttpContext.GetClaimByStringType("CompanyId");

            var CustomersList = await _mediator.Send(new GetCompanySchedulesCommand
            {
                CompanyId = Convert.ToInt32(c.Value)
            });

            return Ok(CustomersList);

        }



        [HttpGet("/getCompanyTask")]
        public async Task<IActionResult> getCompanyTask()
        {

            Claim c = HttpContext.GetClaimByStringType("CompanyId");

            var CustomersList = await _mediator.Send(new GetCompanyTaskCommand
            {
                CompanyId = Convert.ToInt32(c.Value)
            });

            return Ok(CustomersList);

        }


        [HttpGet("/getCompanyUser")]
        public async Task<IActionResult> getCompanyUser()
        {

            Claim c = HttpContext.GetClaimByStringType("CompanyId");

            var CustomersList = await _mediator.Send(new GetCompanyUserCommand
            {
                CompanyId = Convert.ToInt32(c.Value)
            });

            return Ok(CustomersList);

        }

        [HttpGet("/getCompanyDetails")]
        public async Task<IActionResult> getCompanyDetails()
        {

            Claim c = HttpContext.GetClaimByStringType("CompanyId");

            var CustomersList = await _mediator.Send(new GetCompanyDetailCommand
            {
                companyId = Convert.ToInt32(c.Value)
            });

            return Ok(CustomersList);

        }

        [HttpGet("/getProfilePercentage")]
        public async Task<IActionResult> getProfilePercentage()
        {

            Claim c = HttpContext.GetClaimByStringType("CompanyId");

            var CustomersList = await _mediator.Send(new GetProfilePercentageCommand
            {
                CompanyId = Convert.ToInt32(c.Value)
            });

            return Ok(CustomersList);

        }












    }
}
