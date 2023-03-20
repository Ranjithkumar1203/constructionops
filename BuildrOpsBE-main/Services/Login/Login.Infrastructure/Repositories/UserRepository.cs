using System;
using System.Collections.Generic;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;
using Login.Application.Contracts.Persistence;
using Login.Application.Features.Login.Commands.UserRegistration;
using Login.Domain.Entities;
using Login.Infrastructure.Persistence;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Login.Application.Features.Login.Commands.LoginUser;
using BC = BCrypt.Net.BCrypt;
using Login.Application.Features.Login.Commands.Permissions;
using Login.Infrastructure.Dapper;
using System.Data;
using Dapper;
using Microsoft.Extensions.Logging;
using Login.Application.Features.Login.Commands.ForgetPassword;
using Login.Application.Features.Login.Commands.ResetPassword;
using BuildrOps.Application.Features.Login.Commands.ForgetPasswordKeyVerification;
using Login.Application.Models;
using Login.Application.Contracts.Infrastructure;
using BuildrOps.Application.Features.Login.Commands.GetCompany;
using BuildrOps.Application.Features.Login.Commands.ConstructionLogin;
using BuildrOps.Application.Features.Login.Commands.ForgetPasswordResend;

namespace Login.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {

        private readonly IConfiguration Configuration;
        //private LoginContext _DbContext;
        private IDapper _dapper;
        private IEmailService emailService;
        private ILogger<UserRepository> _Logger;
        public UserRepository(LoginContext dbContext, IConfiguration c, IEmailService _emailService, IDapper dapper, ILogger<UserRepository> l)
        {
            _Logger = l;
            _dapper = dapper;
            Configuration = c;
            emailService = _emailService;

        }
        public async Task<RegistrationResponse> RegisterUserAsync(UserRegisterCommand user)
        {

            //UserDataModel UserRow = _dapper.Users.Where(x => x.Email == user.Email).FirstOrDefault();
            UserDataModel UserRow = _dapper.Get<UserDataModel>($"Select * from [dbo].[User] where Email = '{user.Email}'", null, commandType: CommandType.Text);

            if (UserRow != null)
            {

                return null;
            }
            else
            {
                string insertusersql = "INSERT INTO [dbo].[User]([FirstName],[MiddleName],[LastName],[Email],[Address],[CreatedDate]) " +
                    "OUTPUT inserted.id VALUES(@FirstName,@MiddleName,@LastName,@Email,@Address,@CreatedDate);SELECT CAST(SCOPE_IDENTITY() as int);";
                UserDataModel RegisterdUserRow = new UserDataModel();
                DynamicParameters uDataModel = new DynamicParameters();
                RegisterdUserRow.FirstName = user.FirstName;
                RegisterdUserRow.LastName = user.LastName;
                RegisterdUserRow.MiddleName = user.MiddleName;
                RegisterdUserRow.Email = user.Email;
                RegisterdUserRow.Address = user.Address;
                uDataModel.Add("FirstName", user.FirstName);
                uDataModel.Add("LastName", user.LastName);
                uDataModel.Add("MiddleName", user.MiddleName);
                uDataModel.Add("Email", user.Email);
                uDataModel.Add("Address", user.Address);
                uDataModel.Add("CreatedDate", DateTime.Now);
                try
                {
                    //await _DbContext.Users.AddAsync(uDataModel);
                    int inserteduser = (int)_dapper.ExecuteScalar(insertusersql, uDataModel);
                    RegisterdUserRow.Id = inserteduser;
                    string insertuserloginsql = "INSERT INTO [dbo].[UserLogin]([UserId],[Password],[CreatedDate])VALUES(@UserId,@Password,@CreatedDate);";

                    DynamicParameters uLoginDataModel = new DynamicParameters();
                    uLoginDataModel.Add("UserId", inserteduser);
                    uLoginDataModel.Add("Password", user.Password);
                    uLoginDataModel.Add("CreatedDate", DateTime.Now);

                    _dapper.Execute(insertuserloginsql, uLoginDataModel);

                    string token = GenrateToken(RegisterdUserRow);
                    return new RegistrationResponse { Token = token, userLoginId = RegisterdUserRow.Id };
                }
                catch (Exception e)
                {
                    _Logger.LogInformation(e, e.Message);
                    return null;
                }

            }
        }


        public async Task<UserLoginResponse> LoginUser(UserLoginCommand user)
        {
            UserDataModel UserRow = null;

            if (user.CompanyName=="Chad Builds Homes")
            {
                UserRow = await Task.FromResult(_dapper.Get<UserDataModel>($"Select * from [dbo].[User] where (Email = '{user.UserEmail}' or UserName = '{user.UserEmail} ')", null, commandType: CommandType.Text));
            }
            else
            {
                var findCompanyQyery = @"SELECT * From [dbo].[Company] WHERE CompanyName=@CompanyName;";
                DynamicParameters findComapnyParameter = new DynamicParameters();
                findComapnyParameter.Add("CompanyName", user.CompanyName);
                var findData = _dapper.Get<UserLoginCommand>(findCompanyQyery, findComapnyParameter, commandType: CommandType.Text);

                UserRow = await Task.FromResult(_dapper.Get<UserDataModel>($"Select * from [dbo].[User] where ((Email = '{user.UserEmail}' or UserName = '{user.UserEmail} ') And CompanyId='{findData.Id}')", null, commandType: CommandType.Text));
            }
            // UserDataModel UserRow = await Task.FromResult(_dapper.Get<UserDataModel>($"Select * from [dbo].[User] where (Email = '{user.UserEmail}' or UserName = '{user.UserEmail} ')", null, commandType: CommandType.Text));
            if (UserRow != null)
            {
                var userLogin = _dapper.Get<UserLoginDataModel>($"Select * from [dbo].[UserLogin] where UserId = {UserRow.Id}", null, commandType: CommandType.Text);
                if (BC.Verify(user.Password, userLogin.Password))
                {
                    List<UserRoleMap> Roles = _dapper.GetAll<UserRoleMap>($"Select * from [dbo].[UserRoleMapping] where UserId = {UserRow.Id}", null, commandType: CommandType.Text);
                    List<RoleDataModel> roleDatas = new List<RoleDataModel>();
                    List<RoleDataModel> AllRoles = _dapper.GetAll<RoleDataModel>($"Select * from [dbo].[Role];", null, commandType: CommandType.Text);
                    foreach (UserRoleMap r in Roles)
                    {
                        RoleDataModel role = AllRoles.Where(x => x.Id == r.RoleId).FirstOrDefault();
                        if (role != null)
                        {
                            roleDatas.Add(role);
                        }
                    }

                    string token = GenrateToken(UserRow, roleDatas);

                    return new UserLoginResponse
                    {
                        IsAuth = true,
                        Jwt = token,
                        Name = $"{UserRow.FirstName} {UserRow.LastName}",
                        Roles = roleDatas
                    };
                }
                else
                {
                    return new UserLoginResponse
                    {
                        IsAuth = false,
                        Jwt = null
                    };
                }
            }
            else
            {
                return new UserLoginResponse
                {
                    IsAuth = false,
                    Jwt = null
                };
            }
        }

        private string GenrateToken(UserDataModel user, IEnumerable<RoleDataModel> roles = null)
        {
            var token = new JwtSecurityTokenHandler();
            var key = Configuration["SecurityKey"];
            List<Claim> claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Name, user.FirstName),
                    new Claim("UserId", Convert.ToString(user.Id)),
                    new Claim("CompanyId" , Convert.ToString(user.CompanyId))
            };

            if (roles != null)
            {
                foreach (RoleDataModel r in roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, r.RoleName));
                    claims.Add(new Claim("RoleId", Convert.ToString(r.Id)));
                }
            }
            //Adding Roles

            //var g = UserKey;
            var Des = new SecurityTokenDescriptor()
            {
                Expires = DateTime.UtcNow.AddDays(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)), SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(claims),
            };
            var tokenHandler = token.CreateToken(Des);

            string GenJwtToken = token.WriteToken(tokenHandler).ToString();

            return GenJwtToken;
        }

        public async Task<GetPermissionResponse> GetPermissionsAsync(GetPermissionCommand command)
        {
            IEnumerable<RolePermissionMap> permissionMapDb = _dapper.GetAll<RolePermissionMap>($"Select * from [dbo].[RolePermissionMapping]", null, commandType: CommandType.Text); ;
            SortedSet<int> permissionKeys = new SortedSet<int>();
            foreach (Claim c in command.RoleIdClaims)
            {
                List<int> temp = permissionMapDb.Where(x => x.RoleId == Convert.ToInt32(c.Value)).Select(x => x.PermissionId).ToList();
                foreach (var i in temp)
                {
                    permissionKeys.Add(i);
                }
            }
            List<PermissionList> permissions = new List<PermissionList>();
            List<PermissionDb> AllPermissions = _dapper.GetAll<PermissionDb>($"Select * from [dbo].[Permission];", null, commandType: CommandType.Text);

            foreach (int i in permissionKeys)
            {
                PermissionDb temprow = AllPermissions.FirstOrDefault(a => a.Id == i);
                IEnumerable<PermissionDb> tempsubrow = AllPermissions.Where(x => (x.ParentId == i) && x.ParentId != null);
                IEnumerable<string> subrow = tempsubrow.Select(x => x.PermissionName);
                permissions.Add(new PermissionList
                {
                    ParentPermissionID = temprow.Id,
                    ParentPermission = temprow.PermissionName,
                    SubPermissions = subrow
                });
            }

            return new GetPermissionResponse
            {
                Permissions = permissions
            };
        }

        public async Task<ForgetPasswordResponse> ForgetPassword(ForgetPasswordCommand command)
        {
            string findEmailQuery = @"SELECT * FROM [dbo].[User] where Email =@Email";
            DynamicParameters findEmailParameter = new DynamicParameters();
            findEmailParameter.Add("Email", command.EmailId);
            var findEmailData = _dapper.Get<ForgetPasswordCommand>(findEmailQuery, findEmailParameter, commandType: CommandType.Text);

            if (findEmailData != null)
            {
                string domainNameQuery = @"select CBR.DomainName from [User] as U inner join [Company] as C on U.CompanyId = C.Id inner join [CompanyBasicRegistration] as CBR on C.CompanyName= CBR.CompanyName where U.Email = @Email";
                string queryResult = _dapper.Get<string>(domainNameQuery, findEmailParameter, commandType: CommandType.Text);

                string domainName = queryResult ?? "staging.buildrOps.com";

                var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                var Charsarr = new char[30];
                var random = new Random();

                for (int i = 0; i < Charsarr.Length; i++)
                {
                    Charsarr[i] = characters[random.Next(characters.Length)];
                }

                var resultString = findEmailData.Id + new string(Charsarr);

                string InsertEmailKeyQuery = @"INSERT INTO [dbo].[ForgotPassword]([Email],[EmailKey],[RequestTime],[IsExpired]) 
                    OUTPUT inserted.id VALUES(@Email,@EmailKey,@RequestTime,@IsExpired);";
                DynamicParameters EmailKeyParameter = new DynamicParameters();
                EmailKeyParameter.Add("Email", command.EmailId);
                EmailKeyParameter.Add("EmailKey", resultString);
                EmailKeyParameter.Add("RequestTime", DateTime.Now);
                EmailKeyParameter.Add("IsExpired", false);

                try
                {
                    string firstCharacterOfLastName = "";
                    if (findEmailData.LastName != null && findEmailData.LastName.Length > 1)
                    {
                        firstCharacterOfLastName = " " + findEmailData.LastName.Substring(0, 1);
                    }


                    int CreatedcompanyId = (int)_dapper.ExecuteScalar(InsertEmailKeyQuery, EmailKeyParameter, commandType: CommandType.Text);
                    string verificationURL = "https://" + domainName + "/forgotpassword/" + resultString;
                    string websiteName = "https://" + domainName;
                    Email email = CreateEmailObjectForResetPassword("Buildrops", verificationURL, findEmailData.FirstName + firstCharacterOfLastName, command.EmailId, websiteName);
                    await emailService.SendEmailViaSES(email.Body, email.Subject, email.To);
                    return new ForgetPasswordResponse
                    {
                        isEmailAvailable = true,
                        message = "Email sent successfully",

                    };
                }
                catch (Exception e)
                {
                    _Logger.LogInformation(e, e.Message);
                    return null;
                }


            }
            else
            {
                return new ForgetPasswordResponse
                {
                    isEmailAvailable = false,
                    message = "Email Not Found"

                };
            }

        }
        private Email CreateEmailObjectForResetPassword(string companyName, string verificationURL, string userName,string emailId ,string websiteName)
        {
            Email email = new Email();
            email.Subject = "Reset Password.";
            email.To = emailId;
            email.Body = @"<!DOCTYPE html>

<html lang='en' xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:v='urn:schemas-microsoft-com:vml'>

<head>
  <title></title>
  <meta content='text/html; charset=utf-8' http-equiv='Content-Type' />
  <meta content='width=device-width, initial-scale=1.0' name='viewport' />
  <style>
    * {box-sizing: border-box;}
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
    body {margin: 0;padding: 0;}
    .button:hover {background-color: #ffb92c !important;color: #ffffff !important;}
    .sectionborder {padding: 15px 20px}
    a[x-apple-data-detectors] {color: inherit !important;text-decoration: inherit !important;}
    #MessageViewBody a {color: inherit;text-decoration: none;}
    p {line-height: inherit;}

    @media (max-width: 605px) {
      .icons-inner {text-align: center;}
      .icons-inner td { margin: 0 auto;}
      .row-content {width: 100% !important;}
      .image_block img.big {width: auto !important;}
      .column .border {display: none;}
      .stack .column {width: 100%;}
    }
  </style>

</head>

<body style='margin: 0;background-color: #EDEEEF;padding: 0;-webkit-text-size-adjust: none;text-size-adjust: none;'>

<table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-13' role='presentation'
style='mso-table-lspace: 0pt; mso-table-rspace: 0pt' width='100%'>
<tbody>
<tr>
  <td>

<table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-13' role='presentation'
style='mso-table-lspace: 0pt; mso-table-rspace: 0pt' width='100%'>
<tbody>
<tr>
<td>
    <table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack'
      role='presentation' style='
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            color: #000000;
            width: 600px;
          ' width='600'>
      <tbody>
        <tr>
          <td class='column column-1' style='
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  font-weight: 400;
                  text-align: left;
                  vertical-align: top;
                  border-top: 0px;
                  border-right: 0px;
                  border-bottom: 0px;
                  border-left: 0px;
                  padding: 10px 0;
                ' width='220px'>
            <table border='0' cellpadding='0' cellspacing='0'  role='presentation' style='
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                  ' width='100%'>
              <tr>
                <td style='
                        width: 100%;
                        padding-right: 0px;
                        padding-left: 0px;
                        padding-top: 5px;
                        padding-bottom: 5px;
                      '>
                  <img src='https://staging.buildrops.com/assets/emailImages/BuildrOps-outside-rectangle-all-taglines-email.png' alt='BUILDROPS' style='
                            height: auto;
                            border: 0;
                            width: 220px;
                            max-width: 100%;
                          ' width='220' />
                </td>
              </tr>
            </table>
          </td>
          <td class='column column-2' style='
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  font-weight: 400;
                  text-align: left;
                  vertical-align: top;
                  border-top: 0px;
                  border-right: 0px;
                  border-bottom: 0px;
                  border-left: 0px;
                ' width=380px'>
            <table border='0' cellpadding='0' cellspacing='0' class='empty_block' role='presentation' style='
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                  ' width='100%'>
              <tr>
                <td style='
                        padding-right: 0px;
                        padding-bottom: 5px;
                        padding-left: 0px;
                        padding-top: 5px;
                      '>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
</td>
</tr>
</tbody>
</table>
<table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-13' role='presentation'
style='mso-table-lspace: 0pt; mso-table-rspace: 0pt' width='100%'>
<tbody>
<tr>
<td>
    <table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack'
      role='presentation' style='
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            color: #000000;
            background-repeat: no-repeat;
            background-size: contain;
            background-image: url(https://staging.buildrops.com/assets/emailImages/email-banner.png);
            width: 600px;
            background-color: #ffffff;
            height: 291px;
          ' width='600'>
      <tbody>
        <tr>
          <td class='column column-1' style='
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  vertical-align: top;
                  padding-top: 5px;
                  padding-bottom: 5px;
                  border-top: 0px;
                  border-right: 0px;
                  border-bottom: 0px;
                  border-left: 0px;
                ' width='100%'>
            <table border='0' cellpadding='0' cellspacing='0'  role='presentation' style='
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    margin-top: 41px;
                    color: #f5f3f3;
                    font-size: 24px;
      font-weight: 600;
                    margin-left: 20px;
                    font-family: Open Sans, sans-serif;

                  ' width='440'>
              <tr valign='top'>
                  <td width='480px' valign='top'>
                  <span style='float: left;'> Reset</span>
                <img width='217' style='float: left;
                          position: relative;
                      top: 0px;
                      padding-left: 5px;
                      padding-right: 5px;' src='https://staging.buildrops.com/assets/emailImages/BuildrOps-Naming-logo-email.png' alt='BuildrOps'>
                <span style='float: left;'>Password</span></td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
</td>
</tr></tbody>
</table>
<table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-13' role='presentation'
style='mso-table-lspace: 0pt; mso-table-rspace: 0pt' width='100%'>
<tbody>
<tr>
<td>
  <table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack'
    role='presentation' style='
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          color: #000000;
          width: 600px;
        ' width='600'>
    <tbody>
      <tr>
        <td class='column column-1' style='
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                font-weight: 400;
                text-align: left;
                vertical-align: top;
                padding-left: 15px;
                padding-right: 15px;
                padding-top: 0px;
                padding-bottom: 0px;
                border-top: 0px;
                border-right: 0px;
                border-bottom: 0px;
                border-left: 0px;
                background-color: #ffffff;

              ' width='100%'>
          <table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  word-break: break-word;
                ' width='100%'>
            <tr>
              <td style='
                  font-size: 12px;
                  mso-line-height-alt: 14.399999999999999px;
                  color: #07b9ec;
                  line-height: 1.2;
                  font-family: Open Sans, sans-serif;
                '>

                <p style='
                            margin: 0;padding-bottom: 5px;
                            letter-spacing: normal;
                          '>
                  <span style='font-size: 20px'><strong>Reset your password. </strong></span>
                </p>


              </td>
            </tr>
          </table>
          <table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  word-break: break-word;
                ' width='100%'>
            <tr>
              <td style='
                  font-size: 14px;
                  mso-line-height-alt: 16.8px;
                  color: #555555;
                  line-height: 1.2;
                  font-family: Open Sans, sans-serif;
                '>

                <p style='margin: 0; '>
                  <span style='font-size: 12px; color: #001F38;'>
                      We are sending this email because because you requested a password reset. Click on this link to create a new password. 
                    </span>
                </p>

              </td>
            </tr>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</td>
</tr>
</tbody>
</table>
<table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-13' role='presentation'
style='mso-table-lspace: 0pt; mso-table-rspace: 0pt' width='100%'>
<tbody>
<tr>
<td>
    <table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack'
      role='presentation' style='
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            color: #000000;
            width: 600px;
            background-color: #ffffff;
          ' width='600'>
      <tbody>
        <tr>
          <td class='column column-1' style='
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  font-weight: 400;
                  text-align: left;
                  vertical-align: top;
                  padding-top: 5px;
                  padding-bottom: 5px;
                  border-top: 0px;
                  border-right: 0px;
                  border-bottom: 0px;
                  border-left: 0px;
                  background-color: #ffffff;
                ' width='100%'>
            <table border='0' cellpadding='10' cellspacing='0' class='button_block' role='presentation'
              style='
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                  ' width='100%'>
              <tr>
                <td align='center' style='border-radius: 2px;'>
                  <a class='button' href={verificationURL} target='_blank' style='width:177px; text-align: center; font-family: Open Sans, sans-serif;font-size: 18px;line-height: 40px; border: 2px solid #ffb92c; border-radius:4px; color: #ffb92c;text-decoration: none !important;font-weight:bold;display: inline-block;'>
                    Reset Password    
                  </a>
              </td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
</td>
</tr>
</tbody>
</table>
<table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-13' role='presentation'
style='mso-table-lspace: 0pt; mso-table-rspace: 0pt' width='100%'>
<tbody>
<tr>
<td>
  <table align='center' cellpadding='0' cellspacing='0' style='
        color: #000000;
        width: 600px;
        background: #ffffff;
      ' width='600'>
    <tbody>
      <tr>

        <td>
          <table cellpadding='12' cellspacing='0' width='570'
            style='margin:10px 15px 0px 15px; border:1px solid #edeeef; border-radius:5px; mso-table-lspace:0pt; mso-table-rspace:0pt;'>
            <tbody>
              <tr>
                <td><img src='https://staging.buildrops.com/assets/emailImages/clippath.png' width='205' height='134' alt='Image Path'></td>
                <td valign='top'>
                  <h3
                    style='margin: 0; padding: 0;font-size: 18px; font-weight:bold;padding-bottom:5px;color: #001F38; font-family: Open Sans, sans-serif;'>
                    Title One</h3>
                  <p style='font-size: 12px; margin: 0; font-weight:normal; color: #001F38;line-height: 17px !important;
                          font-family: Open Sans, sans-serif;'>
                    Lorem Ipsum is simply dummy text of
                    the printing and typesetting
                    industry. Lorem Ipsum has been the
                    industry's standard dummy text ever
                    since the 1500s, when an unknown
                    printer took a galley of type and
                    scrambled it to make a type specimen
                    book.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </td>

      </tr>
    </tbody>
  </table>
</td></tr>
</tbody>
</table>
<table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-13' role='presentation'
style='mso-table-lspace: 0pt; mso-table-rspace: 0pt' width='100%'>
<tbody>
<tr>
<td>
  <table align='center' cellpadding='0' cellspacing='0' style='
                color: #000000;
                width: 600px;
                background: #ffffff;
              ' width='600'>
    <tbody>
      <tr>

        <td>
          <table cellpadding='12' cellspacing='0' width='570'
            style='margin:10px 15px 0px 15px; border:1px solid #edeeef; border-radius:5px; mso-table-lspace:0pt; mso-table-rspace:0pt;'>
            <tbody>
              <tr>
                <td><img src='https://staging.buildrops.com/assets/emailImages/clippath.png' width='205' height='134' alt='Image Path'></td>
                <td valign='top'>
                  <h3
                    style='margin: 0; padding: 0;font-size: 18px; font-weight:bold;padding-bottom:5px;color: #001F38; font-family: Open Sans, sans-serif;'>
                    Title One</h3>
                  <p style='font-size: 12px; margin: 0; font-weight:normal;  color: #001F38;line-height: 17px !important;
                                    font-family: Open Sans, sans-serif;'>
                    Lorem Ipsum is simply dummy text of
                    the printing and typesetting
                    industry. Lorem Ipsum has been the
                    industry's standard dummy text ever
                    since the 1500s, when an unknown
                    printer took a galley of type and
                    scrambled it to make a type specimen
                    book.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </td>

      </tr>
    </tbody>
  </table>
</td>
</tr>
</tbody>
</table>
<table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-13' role='presentation'
style='mso-table-lspace: 0pt; mso-table-rspace: 0pt' width='100%'>
<tbody>
<tr>
<td> 
  <table align='center' cellpadding='0' cellspacing='0' style='
                        color: #000000;
                        width: 600px;
                        background: #ffffff;
                      ' width='600'>
    <tbody>
      <tr>

        <td>
          <table cellpadding='12' cellspacing='0' width='570'
            style='margin:10px 15px 15px 15px; border:1px solid #edeeef; border-radius:5px; mso-table-lspace:0pt; mso-table-rspace:0pt;'>
            <tbody>
              <tr>
                <td><img src='https://staging.buildrops.com/assets/emailImages/clippath.png' width='205' height='134' alt='Image Path'></td>
                <td valign='top'>
                  <h3
                    style='margin: 0; padding: 0;font-size: 18px; font-weight:bold;padding-bottom:5px;color: #001F38; font-family: Open Sans, sans-serif;'>
                    Title One</h3>
                  <p style='font-size: 12px; margin: 0; font-weight:normal; color: #001F38;line-height: 17px !important;
                                          font-family: Open Sans, sans-serif;'>
                    Lorem Ipsum is simply dummy text of
                    the printing and typesetting
                    industry. Lorem Ipsum has been the
                    industry's standard dummy text ever
                    since the 1500s, when an unknown
                    printer took a galley of type and
                    scrambled it to make a type specimen
                    book.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </td>

      </tr>
    </tbody>
  </table>
  </td>
  </tr>
  </tbody>
</table>
  
    </td>
  </tr>
</tbody>
</table>
<table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-9' role='presentation'
style='mso-table-lspace: 0pt; mso-table-rspace: 0pt' width='100%'>
<tbody>
  <tr>
    <td>
<table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation' style='
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            color: #000000;
            width: 600px;
          ' width='600'>
  <tbody>
    <tr>
      <td class='column column-1' style='
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  font-weight: 400;
                  text-align: left;
                  vertical-align: top;
                  background-color: #ffffff;
                  border-top: 0px;
                  border-right: 0px;
                  border-bottom: 0px;
                  border-left: 0px;
                ' width='100%'>
        <table border='0' cellpadding='5' cellspacing='0' class='social_block' role='presentation' style='
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                  ' width='100%'>
          <tr>
            <td>
              <table align='center' border='0' cellpadding='0' cellspacing='0' class='social-table'
                role='presentation' style='
                          mso-table-lspace: 0pt;
                          font-family: Open Sans, sans-serif;
                          font-size: 15px;
                          font-weight: 600; color: #07b9ec;
                          mso-table-rspace: 0pt;
                        ' width='350px'>
                <tr>
                  <td style='padding:0 20px 0 0'>
                      <a href='#' style='color: #07b9ec !important; text-decoration: none !important;'>Title One</a>
                    </td>
                    <td style='padding:0 20px 0 0'>
                      |
                    </td>
                    <td style='padding:0 20px 0 0'>
                      <a href='#' style='color: #07b9ec !important; text-decoration: none !important;'>Title Two</a>
                    </td>
                    <td style='padding:0 20px 0 0'>
                      |
                    </td>
                    <td>
                      <a href='#' style='color: #07b9ec !important; text-decoration: none !important;'>Title Three</a>
                    </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-9' role='presentation'
  style='mso-table-lspace: 0pt; mso-table-rspace: 0pt' width='100%'>
  <tbody>
    <tr>
      <td>
        <table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation'
          style='
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      color: #000000;
                      width: 600px;
                      background-color: #ffffff;
                    ' width='600'>
          <tbody>
            <tr>
              <td class='column column-1' style='
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            font-weight: 400;
                            text-align: left;
                            vertical-align: top;
                            border-top: 0px;
                            border-right: 0px;
                            border-bottom: 0px;
                            border-left: 0px;
                          ' width='17%'>
                <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                            ' width='100%'>
                  <tr>
                    <td style='
                                  width: 100%;
                                  padding-right: 0px;
                                  padding-left: 15px;
                                  padding-top: 15px;
                                  padding-bottom: 5px;
                                '>
                      <img src='https://staging.buildrops.com/assets/emailImages/ConstructionOps-software-tagline-email.png' alt='Construction Ops' style='
                                      height: auto;
                                      border: 0;
                                      width: 76px;
                                      max-width: 100%;
                                    ' width='76' />
                    </td>
                  </tr>
                </table>
              </td>
              <td class='column column-2' style='
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            font-weight: 400;
                            text-align: left;
                            vertical-align: top;
                            border-top: 0px;
                            border-right: 0px;
                            border-bottom: 0px;
                            border-left: 0px;
                          ' width='50%'>
                <table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              word-break: break-word;
                            ' width='100%'>
                  <tr>
                    <td style='
                                  padding-top:17px;
                                  padding-right: 10px;
                                  padding-bottom: 5px; font-size: 14px;
                                      mso-line-height-alt: 16.8px;
                                      color: #555555;
                                      line-height: 1.2;
                                      font-family: Open Sans, sans-serif;
                                '>

                      <p style='margin: 0; font-size: 14px'>
                        <span style='font-size: 13px'>Keep Optimizing</span>
                      </p>

                    </td>
                  </tr>
                </table>
                <table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              word-break: break-word;
                            ' width='100%'>
                  <tr>
                    <td style='padding-bottom: 5px;  font-size: 12px;
                              mso-line-height-alt: 14.399999999999999px;
                              color: #555555;
                              line-height: 1.2;
                              font-family: Open Sans, sans-serif;'>

                      <p style='margin: 0; font-size: 12px'>
                        <strong><span style='font-size: 13px'>{OfficerName}<span style='color: #ffb92c'>
                              <span style='padding-left: 5px;'> |</span>  <span style='padding-left: 5px;'>{OfficerTitle}

                          </span></span></strong>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
              <td class='column column-3' style='
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            font-weight: 400;
                            text-align: left;
                            vertical-align: top;
                            border-top: 0px;
                            border-right: 0px;
                            border-bottom: 0px;
                            border-left: 0px;
                          ' width='41.666666666666664%'>

              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-10' role='presentation'
  style='mso-table-lspace: 0pt; mso-table-rspace: 0pt' width='100%'>
  <tbody>
    <tr>
      <td>
        <table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation'
          style='
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      color: #000000;
                      width: 600px;
                    ' width='600'>
          <tbody>
            <tr>
              <td class='column column-1' style='
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            font-weight: 400;
                            text-align: left;
                            vertical-align: top;
                            border-top: 0px;
                            border-right: 0px;
                            border-bottom: 0px;
                            border-left: 0px;
                          ' width='100%'>
                <table border='0' cellpadding='15' cellspacing='0' class='text_block' role='presentation' style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              word-break: break-word;
                            ' width='100%'>
                  <tr>
                    <td style='background-color: #ffffff; padding: 15px 15px 25px 15px;'>

                      <p style='margin: 0;  font-size: 12px;
                                    mso-line-height-alt: 14.399999999999999px;
                                    color: #001F38;
                                    line-height: 1.2;
                                    font-family: Open Sans, sans-serif;'>
                        Our team has secured your 14 day trail to optimize your custom environment. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.


                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-11' role='presentation'
  style='mso-table-lspace: 0pt; mso-table-rspace: 0pt' width='100%'>
  <tbody>
    <tr>
      <td>
        <table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation'
          style='
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      color: #000000;
                      width: 600px;
                    ' width='600'>
          <tbody>
            <tr>
              <td class='column column-1' style='
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            font-weight: 400;
                            text-align: left;
                            vertical-align: top;
                            background-color: #07b9ec;
                            border-top: 0px;
                            border-right: 0px;
                            border-bottom: 0px;
                            border-left: 0px;
                          ' width='100%'>
                <table border='0' cellpadding='5' cellspacing='0' class='social_block' role='presentation' style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                            ' width='100%'>
                  <tr>
                    <td style='padding: 6px;'>
                      <table align='center' border='0' cellpadding='0' cellspacing='0' class='social-table'
                        role='presentation' style='
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  ' width='208px'>
                            <tr>
                              <td style='padding: 0 10px 0 10px'>
                                <a href='https://www.facebook.com/' target='_blank'><img alt='Facebook' height='22'
                                    src='https://staging.buildrops.com/assets/emailImages/facebook.png' style='
                                                height: auto;
                                                border: 0;
                                              ' title='Facebook' width='22' /></a>
                              </td>
                              <td style='padding: 0 10px 0 10px'>
                                <a href='https://twitter.com/' target='_blank'><img alt='Twitter' height='22'
                                    src='https://staging.buildrops.com/assets/emailImages/twitter.png' style='
                                                height: auto;
                                                border: 0;
                                              ' title='Twitter' width='22' /></a>
                              </td>
                              <td style='padding: 0 10px 0 10px'>
                                <a href='https://instagram.com/' target='_blank'><img alt='Instagram' height='22'
                                    src='https://staging.buildrops.com/assets/emailImages/instagram.png' style='
                                                height: auto;
                                                border: 0;
                                              ' title='Instagram' width='22' /></a>
                              </td>
                              <td style='padding: 0 10px 0 10px'>
                                <a href='https://www.linkedin.com/' target='_blank'><img alt='LinkedIn' height='22'
                                    src='https://staging.buildrops.com/assets/emailImages/linkedin.png' style='
                                                height: auto;
                                                border: 0;
                                              ' title='LinkedIn' width='22' /></a>
                              </td>
                            </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-12' role='presentation'
  style='mso-table-lspace: 0pt; mso-table-rspace: 0pt' width='100%'>
  <tbody>
    <tr>
      <td>
        <table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation'
          style='
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      color: #000000;
                      width: 600px;
                    ' width='600'>
          <tbody>
            <tr>
              <td class='column column-1' style='
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            font-weight: 400;
                            text-align: left;
                            vertical-align: top;
                            border-top: 0px;
                            border-right: 0px;
                            border-bottom: 0px;
                            border-left: 0px;
                          ' width='100%'>
                <table border='0' cellpadding='5' cellspacing='0' class='text_block' role='presentation' style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              word-break: break-word;
                              background-color: #ffffff;
                            ' width='100%'>
                  <tr>
                    <td style='
                              font-size: 11px;
                              mso-line-height-alt: 16.8px;
                              color: #555555;
                              line-height: 1.2;
                              font-family: Open Sans, sans-serif;
                                padding-top: 20px;
                            '>

                      <p style='
                                        margin: 0;
                                        font-size: 11px;
                                        text-align: center;
                                        letter-spacing: normal;
                                      '>
                        {WebsiteName} | {PhoneNumber} |
                        {InternationalNumber}
                      </p>

                    </td>
                  </tr>
                </table>
                <table border='0' cellpadding='5' cellspacing='0' class='text_block' role='presentation' style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              word-break: break-word;
                              background-color: #ffffff;
                            ' width='100%'>
                  <tr>
                    <td style='
                              font-size: 11px;
                              mso-line-height-alt: 16.8px;
                              color: #555555;
                              padding: 0;
                              line-height: 1.2;
                              font-family: Open Sans, sans-serif;
                            '>

                      <p style='
                                        margin: 0;
                                        font-size: 11px;
                                        text-align: center;
                                      '>
                          {ConstructionOpsAddress}
                      </p>

                    </td>
                  </tr>
                </table>
                <table border='0' cellpadding='10' cellspacing='0' class='text_block' role='presentation' style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              word-break: break-word;
                              background-color: #ffffff;
                            ' width='100%'>
                  <tr>
                    <td style='
                              font-size: 11px;
                              mso-line-height-alt: 16.8px;
                              color: #555555;
                              line-height: 1.2;
                              padding: 5px;
                              font-family: Open Sans, sans-serif;
                            '>

                      <p style='
                                        margin: 0;
                                        font-size: 11px;
                                        text-align: center;
                                        padding-bottom: 20px;
                                      '>
                        ConstructionOps Software Co - All
                        Rights Reserved ©
                      </p>

                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-13' role='presentation'
  style='mso-table-lspace: 0pt; mso-table-rspace: 0pt' width='100%'>
  <tbody>
    <tr>
      <td>
        <table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation'
          style='
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      color: #000000;
                      width: 600px;
                    ' width='600'>
          <tbody>
            <tr>
              <td class='column column-1' style='
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            font-weight: 400;
                            text-align: left;
                            vertical-align: top;
                            padding-top: 5px;
                            padding-bottom: 5px;
                            border-top: 0px;
                            border-right: 0px;
                            border-bottom: 0px;
                            border-left: 0px;
                          ' width='100%'>
                <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                            '>
                  <tr>
                    <td style='
                                  vertical-align: middle;
                                  color: #9d9d9d;
                                  font-family: inherit;
                                  font-size: 15px;
                                  padding-bottom: 5px;
                                  padding-top: 5px;
                                  text-align: center;
                                '>
                      <table cellpadding='0' cellspacing='0' role='presentation' style='
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  '>
                        <tr>
                          <td style='
                                        vertical-align: middle;
                                        text-align: center;
                                      '></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>

</body>

</html>
";
            email.Body = email.Body.Replace("{verificationURL}", verificationURL);
            email.Body = email.Body.Replace("{companyName}", companyName);
            email.Body = email.Body.Replace("{WebsiteName}", websiteName);
            email.Body = email.Body.Replace("{OfficerName}", userName);
            return email;
        }
        public async Task<ForgetPasswordKeyVerificationResponse> FindPasswordKey(ForgetPasswordKeyVerificationCommand command)
        {
            string findEmailKeyQuery = @"SELECT * FROM [dbo].[ForgotPassword] WHERE EmailKey=@EmailKey AND IsExpired=@IsExpired";
            DynamicParameters findEmailKeyParameter = new DynamicParameters();
            findEmailKeyParameter.Add("EmailKey", command.EmailKey);
            findEmailKeyParameter.Add("IsExpired", false);
            var findEmailData = _dapper.Get<ForgetPasswordCommand>(findEmailKeyQuery, findEmailKeyParameter, commandType: CommandType.Text);

            if (findEmailData != null)
            {
                return new ForgetPasswordKeyVerificationResponse
                {
                    message = "Key verified",
                    IsKeyAvailable = true,
                    IsKeyExpired = false
                };
            }
            else
            {
                return new ForgetPasswordKeyVerificationResponse
                {
                    message = "Key not available",
                    IsKeyAvailable = false,
                    IsKeyExpired = true
                };

            }

        }
        public async Task<ResetPassowrdResponse> ResetPassword(ResetPasswordCommand command)
        {
            string findEmailKeyQuery = @"SELECT * FROM [dbo].[ForgotPassword] WHERE EmailKey=@EmailKey AND IsExpired=@IsExpired;";
            DynamicParameters findEmailKeyParameter = new DynamicParameters();
            findEmailKeyParameter.Add("EmailKey", command.EmailKey);
            findEmailKeyParameter.Add("IsExpired", false);
            var findEmailData = _dapper.Get<ResetPasswordCommand>(findEmailKeyQuery, findEmailKeyParameter, commandType: CommandType.Text);
            if (findEmailData != null)
            {
                string findUserQuery = @"SELECT * FROM [dbo].[User] WHERE Email=@Email;";
                DynamicParameters findUserParameter = new DynamicParameters();
                findUserParameter.Add("Email", findEmailData.Email);
                var findUserData = _dapper.Get<ResetPasswordCommand>(findUserQuery, findUserParameter, commandType: CommandType.Text);



                string passwordHash = BC.HashPassword(command.NewPassword);
                string updatePasswordQuery = "UPDATE [dbo].[UserLogin] SET Password=@Password, LastModifiedDate=@LastModifiedDate  WHERE UserId=@UserId;";
                DynamicParameters findUserIdParameter = new DynamicParameters();
                findUserIdParameter.Add("UserId", findUserData.Id);
                findUserIdParameter.Add("Password", passwordHash);
                findUserIdParameter.Add("LastModifiedDate", DateTime.Now);

                _dapper.Update<ResetPassowrdResponse>(updatePasswordQuery, findUserIdParameter, commandType: CommandType.Text);



                string updateQuery = "UPDATE [dbo].[ForgotPassword] SET IsExpired=@IsExpired WHERE EmailKey=@EmailKey;";
                DynamicParameters verifyKeyparameter = new DynamicParameters();
                verifyKeyparameter.Add("IsExpired", true);
                verifyKeyparameter.Add("EmailKey", command.EmailKey);
                _dapper.Update<ResetPassowrdResponse>(updateQuery, verifyKeyparameter, commandType: CommandType.Text);



                return new ResetPassowrdResponse
                {
                    message = "Password changer Successfully",
                    IsSuccess = true
                };
            }
            else
            {
                return new ResetPassowrdResponse
                {
                    message = "Key not available",
                    IsSuccess = false

                };

            }

        }

        public async Task<GetCompanyResponse> GetCompany(GetCompanyCommand user)
        {

            string findCompanyQuery = @"SELECT * FROM [dbo].[CompanyBasicRegistration] WHERE DomainName like @DomainName";
            DynamicParameters findCompanyParameter = new DynamicParameters();
            findCompanyParameter.Add("DomainName", "%"+user.Url+"%");
            var findCompanyData = _dapper.Get<GetCompanyCommand>(findCompanyQuery, findCompanyParameter, commandType: CommandType.Text);

            if(findCompanyData != null)
            {
                if (findCompanyData.IsVerified == true)
                {
                    var CompanyQyery = @"SELECT * From [dbo].[Company] WHERE CompanyName=@CompanyName;";
                    DynamicParameters ComapnyParameter = new DynamicParameters();
                    ComapnyParameter.Add("CompanyName", findCompanyData.CompanyName);
                    var findData = _dapper.Get<GetCompanyResponse>(CompanyQyery, ComapnyParameter, commandType: CommandType.Text);

                    if (findData != null)
                    {
                        return new GetCompanyResponse
                        {
                            CompanyName = findData.CompanyName,
                            CompanyLogo = findData.CompanyLogo,
                            CompanyTagline = findData.CompanyTagline
                        };

                    }
                    else
                    {
                        return new GetCompanyResponse
                        {
                            CompanyName = null
                        };
                    }
                }
                else
                {
                    return new GetCompanyResponse
                    {
                        CompanyName = findCompanyData.CompanyName
                    };
                }

            }
            else
            {
                return new GetCompanyResponse
                {
                    CompanyName = null
                };
            }


        }



        public async Task<ConstructionLoginResponse> ConstructionUser(ConstructionLoginCommand user)
        {
            /*UserDataModel UserRow = null;*/
            /*if(user.User == "anand@gmail.com") 
            {*/
                /*if (user.CompanyName == "Chad Builds Homes")
                {
                    UserRow = await Task.FromResult(_dapper.Get<UserDataModel>($"Select * from [dbo].[User] where (Email = '{user.User}' or UserName = '{user.User} ')", null, commandType: CommandType.Text));
                }
                else
                {
                    var findCompanyQyery = @"SELECT * From [dbo].[Company] WHERE CompanyName=@CompanyName;";
                    DynamicParameters findComapnyParameter = new DynamicParameters();
                    findComapnyParameter.Add("CompanyName", user.CompanyName);
                    var findData = _dapper.Get<UserLoginCommand>(findCompanyQyery, findComapnyParameter, commandType: CommandType.Text);

                  *//*  UserRow = await Task.FromResult(_dapper.Get<UserDataModel>($"Select * from [dbo].[User] where ((Email = '{user.User}' or UserName = '{user.User} ') And CompanyId='{findData.Id}')", null, commandType: CommandType.Text));*//*
                    UserRow = await Task.FromResult(_dapper.Get<UserDataModel>($"Select * from [dbo].[User] where ((Email = '{user.User}' or UserName = '{user.User} ')", null, commandType: CommandType.Text));

                }*/
                 UserDataModel UserRow = await Task.FromResult(_dapper.Get<UserDataModel>($"Select * from [dbo].[User] where (Email = '{user.User}' or UserName = '{user.User} ')", null, commandType: CommandType.Text));
                if (UserRow != null)
                {

                    var userLogin = _dapper.Get<UserLoginDataModel>($"Select * from [dbo].[UserLogin] where UserId = {UserRow.Id}", null, commandType: CommandType.Text);
                    if (BC.Verify(user.Password, userLogin.Password))
                    {
                        List<UserRoleMap> Roles = _dapper.GetAll<UserRoleMap>($"Select * from [dbo].[UserRoleMapping] where UserId = {UserRow.Id}", null, commandType: CommandType.Text);
                        List<RoleDataModel> roleDatas = new List<RoleDataModel>();
                        List<RoleDataModel> AllRoles = _dapper.GetAll<RoleDataModel>($"Select * from [dbo].[Role];", null, commandType: CommandType.Text);
                        foreach (UserRoleMap r in Roles)
                        {
                            RoleDataModel role = AllRoles.Where(x => x.Id == r.RoleId).FirstOrDefault();
                            if (role != null)
                            {
                                roleDatas.Add(role);
                            }
                        }
                        string token = GenrateToken(UserRow, roleDatas);
                        return new ConstructionLoginResponse
                        {
                            IsAuth = true,
                            Jwt = token,
                            Name = $"{UserRow.FirstName} {UserRow.LastName}",
                        };
                    }
                    else
                    {
                        return new ConstructionLoginResponse

                        {
                            Jwt = null
                        };
                    }
                }
                else
                {
                    return new ConstructionLoginResponse
                    {
                        IsAuth = false,
                        Jwt = null
                    };
                }

          /*  }*/
           /* else
            {
                return new ConstructionLoginResponse
                {
                    IsAuth = false,
                    Jwt = null,

                };
            }*/

        }

        public async Task<ForgotPasswordResendResponse> ForgetPasswordResend(ForgotPasswordResendCommand request)
        {

            string findUserQuery = @"SELECT * FROM [dbo].[User] where Email =@Email";
            DynamicParameters findUserParameter = new DynamicParameters();
            findUserParameter.Add("Email", request.EmailId);
            var findUserData = _dapper.Get<ForgotPasswordResendCommand>(findUserQuery, findUserParameter, commandType: CommandType.Text);




            string findEmailQuery = @"SELECT * FROM [dbo].[ForgotPassword] where Email =@Email and IsExpired = @IsExpired";
            DynamicParameters findEmailParameter = new DynamicParameters();
            findEmailParameter.Add("Email", request.EmailId);
            findEmailParameter.Add("IsExpired",false);
            var findEmailData = _dapper.Get<ForgotPasswordResendCommand>(findEmailQuery, findEmailParameter, commandType: CommandType.Text);

            if (findEmailData != null)
            {
                string domainNameQuery = @"select CBR.DomainName from [User] as U inner join [Company] as C on U.CompanyId = C.Id inner join [CompanyBasicRegistration] as CBR on C.CompanyName= CBR.CompanyName where U.Email = @Email";
                DynamicParameters findParameter = new DynamicParameters();
                findParameter.Add("Email", request.EmailId);
                string queryResult = _dapper.Get<string>(domainNameQuery, findParameter, commandType: CommandType.Text);

                string domainName = queryResult ?? "staging.buildrOps.com";

                var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                var Charsarr = new char[30];
                var random = new Random();

                for (int i = 0; i < Charsarr.Length; i++)
                {
                    Charsarr[i] = characters[random.Next(characters.Length)];
                }

                var resultString = findEmailData.Id + new string(Charsarr);

                string updatePasswordKeyQuery = "UPDATE [dbo].[ForgotPassword] SET EmailKey=@EmailKey, RequestTime=@RequestTime ,IsExpired=@IsExpired  WHERE Id=@Id;";
                DynamicParameters findKeyParameter = new DynamicParameters();
                findKeyParameter.Add("EmailKey", resultString);
                findKeyParameter.Add("RequestTime", DateTime.Now);
                findKeyParameter.Add("IsExpired", false );
                findKeyParameter.Add("Id", findEmailData.Id);


                try
                {


                    string firstCharacterOfLastName = "";
                    if (findUserData.LastName != null && findUserData.LastName.Length > 1)
                    {
                        firstCharacterOfLastName = " " + findUserData.LastName.Substring(0, 1);
                    }



                    _dapper.Update<ForgotPasswordResendResponse>(updatePasswordKeyQuery, findKeyParameter, commandType: CommandType.Text);
                    string verificationURL = "https://" + domainName + "/forgotpassword/" + resultString;
                    string websiteName = "https://" + domainName;
                    Email email = CreateEmailObjectForResetPassword("Buildrops", verificationURL, findUserData.FirstName + firstCharacterOfLastName, request.EmailId, websiteName);
                    await emailService.SendEmailViaSES(email.Body, email.Subject, email.To);

                    return new ForgotPasswordResendResponse
                    {
                        isEmailAvailable = true,
                        message = "Email sent successfully",
                    };


                }
                catch (Exception e)
                {
                    _Logger.LogInformation(e, e.Message);
                    return null;
                }
            }
            else
            {
                return new ForgotPasswordResendResponse
                {
                    isEmailAvailable = false,
                    message = "Email Not Found"

                };
            }
        }
    }
}


