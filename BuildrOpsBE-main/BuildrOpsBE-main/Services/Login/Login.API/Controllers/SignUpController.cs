using BuildrOps.Application.Features.CompanyBasicRegistration;
using BuildrOps.Application.Features.ForgetPassword;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BuildrOps.API.Controllers
{
    public class SignUpController : ControllerBase
    {
        private readonly IMediator _mediator;
        public SignUpController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpPost("/CreateDomain")]
        public async Task<IActionResult> CreateDomain()
        {
            return Ok("Success");
        }
        [HttpPost("/SubmitCompanyRegistrationForm")]
        public async Task<IActionResult> SubmitCompanyRegistrationForm()
        {
            return Ok("Success");
        }
        [HttpGet("/PasswordValidaterAPI")]
        public async Task<IActionResult> PasswordValidaterAPI(string passwordString)
        {
            return Ok("Success");
        }
        [HttpGet("/GetCountryList")]
        public async Task<IActionResult> GetCountryList()
        {
            return Ok("Success");
        }
        [HttpGet("/ContinueRegistration")]
        public async Task<IActionResult> ContinueRegistration(string key)
        {
            return Ok("Success");
        }
        [HttpPost("/SubmitBasicRegistrationForm")]
        public async Task<IActionResult> SubmitBasicRegistrationForm(CompanyBasicRegistrationCommand companyBasicRegistrationCommand)
        {
            return Ok("Success");
        }

        [HttpPost("/ForgetPasswordRequest")]
        public async Task<IActionResult> ForgetPasswordRequest(ForgotPasswordCommand forgotPasswordCommand)
        {
            return Ok("Success");
        }

        [HttpPost("/ForgetPasswordRedirection")]
        public async Task<IActionResult> ForgetPasswordRedirection(ForgotPasswordRedirectionCommand forgotPasswordCommand)
        {
            return Ok("Success");
        }
    }

}