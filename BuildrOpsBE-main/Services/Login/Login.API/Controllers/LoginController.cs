    using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using Login.Application.Features.Login.Commands.UserRegistration;
using Login.Application.Features.Login.Commands.LoginUser;
using Login.Application.Features.Login.Commands.ForgetPassword;
using Login.Application.Features.Login.Commands.ResetPassword;
using BuildrOps.Application.Features.Login.Commands.SetDNS;
using BuildrOps.Application.Features.Login.Commands.ForgetPasswordKeyVerification;
using BuildrOps.Application.Features.Login.Commands.GetCompany;
using BuildrOps.Application.Features.Login.Commands.ConstructionLogin;
using BuildrOps.Application.Features.Login.Commands.ForgetPasswordResend;

namespace Login.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IMediator _mediator;
        public LoginController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }


        [HttpPost("/register")]
        public async Task<IActionResult> RegisterUserEndpoint([FromBody] UserRegisterCommand command)
        {
            var token = await _mediator.Send(command);
            return Ok(token);
        }
        [HttpPost("/SetDNS")]
        public async Task<IActionResult> SetDNS([FromBody] SetDNSCommand command)
        {
            var token = await _mediator.Send(command);
            return Ok(token);
        }
        [HttpGet("/Env")]
        public async Task<IActionResult> ENVGET()
        {


            var token = Environment.GetEnvironmentVariable("Test");
            //await emailService.SendEmailViaSES("<p>test</p>", "test", "anandkumar.ss@smartdatainc.net");
            return Ok("TestVariableValue");
        }

        [HttpGet("/GetCompany")]
        public async Task<IActionResult> GetCompany()
        {
            string referer = Request.Headers["origin"].ToString();
            Uri myUri = new Uri(referer);
            string host = myUri.Host;
            var response = await _mediator.Send(new GetCompanyCommand { Url = host });

            return Ok(response);
        }

        [HttpPost("/login")]
        public async Task<IActionResult> LoginUserEndpoint([FromBody] UserLoginCommand command)
        {
            var response = await _mediator.Send(command);
            if (response.IsAuth)
            {


                return Ok(new
                {
                    accessToken = response.Jwt,
                    roles = response.Roles.Select(x => x.RoleName).ToArray(),
                    name = response.Name
                });
            }
            return Unauthorized(new
            {
                message = "Email or password is incorrect"
            });

        }

        [HttpPost("/Constructionlogin")]
        public async Task<IActionResult> ConstructionLoginEndpoint([FromBody] ConstructionLoginCommand command)
        {
            var response = await _mediator.Send(command);
            if (response.IsAuth)
            {
                return Ok(new
                {
                    accessToken = response.Jwt,
                    name = response.Name
                });
            }
            return Unauthorized(new
            {
                message = "Email or password is incorrect"
            });

        }


        [HttpPost("/ForgetPassword")]
        public async Task<IActionResult> ForgetPassword([FromBody] ForgetPasswordCommand command)
        {

            var response = await _mediator.Send(command);
            return Ok(response);

        }


        [HttpPost("/ForgetPasswordResend")]
        public async Task<IActionResult> ForgetPasswordResend([FromBody] ForgotPasswordResendCommand command)
        {
            var response = await _mediator.Send(command);
            return Ok(response);
        }



        [HttpPost("/FindForgetPasswordKey")]
        public async Task<IActionResult> FindPasswordKey([FromBody] ForgetPasswordKeyVerificationCommand command)
        {

            var response = await _mediator.Send(command);
            return Ok(response);

        }



        [HttpPost("/ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordCommand command)
        {

            var response = await _mediator.Send(command);
            return Ok(response);

        }

        [HttpGet("/GetUserCompany")]
        public async Task<IActionResult> GetUserCompany()
        {
            return Ok(" ");
        }



    }
}
