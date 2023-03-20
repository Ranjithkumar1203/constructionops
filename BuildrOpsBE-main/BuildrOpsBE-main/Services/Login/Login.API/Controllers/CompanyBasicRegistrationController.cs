using BuildrOps.Application.Contracts.Infrastructure;
using BuildrOps.Application.Features.CompanyBasicRegistration;
using BuildrOps.Application.Features.CompanyBasicRegistration.Command.CompanyBasicRegistration;
using BuildrOps.Application.Features.CompanyBasicRegistration.Command.EmailVerification;
using BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindCompany;
using BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindDomain;
using BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindEmail;
using BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindUserName;
using BuildrOps.Application.Features.CompanyBasicRegistration.Command.ResendEmail;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace BuildrOps.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    
    public class CompanyBasicRegistrationController:ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IAmazonS3Services _amazonS3Services;
        public CompanyBasicRegistrationController(IMediator mediator, IAmazonS3Services amazonS3Services)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _amazonS3Services = amazonS3Services;
        }

        [HttpPost("/CompanyRegistration")]
        public async Task<IActionResult> CompanyRegistration([FromBody] CompanyBasicRegistrationCommand command)
        {

            CompanyBasicRegistrationResponse registration = await _mediator.Send(command);

            return Ok(registration);
        }

        [HttpPost("/EmailVerification")]

        public async Task<IActionResult> EmailVerification([FromBody] EmailVerificationCommand command)
        {

            EmailVerificationResponse vierification = await _mediator.Send(command);

            return Ok(vierification);
        }


        [HttpPost("/FindCompany")]
        public async Task<IActionResult> FindCompany([FromBody] FindCompanyCommand command)
        {

            FindCompanyResponse verification = await _mediator.Send(command);

            return Ok(verification);
        }


        [HttpPost("/FindUserName")]
        public async Task<IActionResult> FindUserName([FromBody] FindUserNameCommand command)
        {

            FindUserNameResponse verification = await _mediator.Send(command);

            return Ok(verification);
        }
        [HttpPost("/FindDomain")]
        public async Task<IActionResult> FindDomain([FromBody] FindDomainCommand command)
        {

            FindDomainResponse verification = await _mediator.Send(command);

            return Ok(verification);
        }



        [HttpPost("/FindEmail")]
        public async Task<IActionResult> FindEmail([FromBody] FindEmailCommand command)
        {

            FindEmailResponse verification = await _mediator.Send(command);

            return Ok(verification);
        }



        [HttpPost("/ResendEmail")]
        public async Task<IActionResult> ResendEmail([FromBody] ResendEmailCommand command)
        {

            ResendEmailResponse verification = await _mediator.Send(command);

            return Ok(verification);
        }





    }
}
