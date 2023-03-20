using System.Threading.Tasks;
using BuildrOps.Application.Features.ForgetPassword;
using BuildrOps.Application.Features.Login.Commands.ConstructionLogin;
using BuildrOps.Application.Features.Login.Commands.ForgetPasswordKeyVerification;
using BuildrOps.Application.Features.Login.Commands.ForgetPasswordResend;
using BuildrOps.Application.Features.Login.Commands.GetCompany;
using Login.Application.Features.Login.Commands.ForgetPassword;
using Login.Application.Features.Login.Commands.LoginUser;
using Login.Application.Features.Login.Commands.Permissions;
using Login.Application.Features.Login.Commands.ResetPassword;
using Login.Application.Features.Login.Commands.UserRegistration;

namespace Login.Application.Contracts.Persistence
{
    public interface IUserRepository
    {
        public Task<RegistrationResponse> RegisterUserAsync (UserRegisterCommand user);
       public Task<ForgetPasswordResponse> ForgetPassword(ForgetPasswordCommand request);
        public Task<ForgotPasswordResendResponse> ForgetPasswordResend(ForgotPasswordResendCommand request);
        public Task<UserLoginResponse> LoginUser (UserLoginCommand user);
        public Task<ConstructionLoginResponse> ConstructionUser(ConstructionLoginCommand user);
        public Task<GetCompanyResponse> GetCompany(GetCompanyCommand user);
        public Task<GetPermissionResponse> GetPermissionsAsync(GetPermissionCommand command); 
        public Task<ResetPassowrdResponse> ResetPassword(ResetPasswordCommand command);
        public Task<ForgetPasswordKeyVerificationResponse> FindPasswordKey(ForgetPasswordKeyVerificationCommand command);
    }
}
