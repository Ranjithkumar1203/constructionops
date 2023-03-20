using BuildrOps.Application.Contracts.Persistence;
using BuildrOps.Application.Features.CompanyBasicRegistration;
using BuildrOps.Application.Features.CompanyBasicRegistration.Command.CompanyBasicRegistration;
using BuildrOps.Application.Features.CompanyBasicRegistration.Command.EmailVerification;
using Dapper;
using Microsoft.Extensions.Configuration;
using Login.Domain.Entities;
using Login.Infrastructure.Dapper;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindCompany;
using BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindUserName;
using BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindDomain;
using BuildrOps.Application.Features.Login.Commands.SetDNS;
using System.Threading.Tasks;
using Amazon.Route53;
using Amazon;
using Amazon.Route53.Model;
using Amazon.CloudFront;
using Amazon.CloudFront.Model;
using Login.Application.Contracts.Infrastructure;
using Login.Application.Models;
using BuildrOps.Application.Features.CompanyBasicRegistration.Command.ResendEmail;
using BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindEmail;

namespace BuildrOps.Infrastructure.Repositories
{
    class CompanyBasicRegistrationRepository : ICompanyRegistration
    {
        private readonly IConfiguration Configuration;
        private IEmailService emailService;
        private IDapper _dapper;
        private ILogger<CompanyBasicRegistrationRepository> _Logger;

        public CompanyBasicRegistrationRepository(IDapper d, IConfiguration c, ILogger<CompanyBasicRegistrationRepository> l,IEmailService _emailService)
        {
            _Logger = l;
            _dapper = d;
            Configuration = c;
            emailService = _emailService;
        }
        public async Task<CompanyBasicRegistrationResponse> CompanyRegistration(CompanyBasicRegistrationCommand command)
        {

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(command.Password);
            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var Charsarr = new char[40];
            var random = new Random();

            for (int i = 0; i < Charsarr.Length; i++)
            {
                Charsarr[i] = characters[random.Next(characters.Length)];
            }

            var resultString = new string(Charsarr);



            SetDNSCommand setDNSCommand = new SetDNSCommand();
            setDNSCommand.DomainName = command.DomainName;
            string insertcregistrationsql = @"INSERT INTO [dbo].[CompanyBasicRegistration]
           ([CompanyName]
           ,[FirstName]
           ,[LastName]
           ,[Email]
           ,[DomainName]
           ,[UserName]
           ,[Password]
           ,[Country]
           ,[CreationTime]
           ,[EmailKey]
           ,[IsVerified]
           ,[VerificationTime])
           OUTPUT inserted.Id VALUES(@CompanyName,@FirstName,@LastName,@Email,@DomainName,@UserName,@Password,@Country,
@CreationTime,@EmailKey,@IsVerified,@VerificationTime); ";
            DynamicParameters CBRDataModel = new DynamicParameters();
            CBRDataModel.Add("CompanyName", command.CompanyName);
            CBRDataModel.Add("FirstName", command.FirstName);
            CBRDataModel.Add("LastName", command.LastName);
            CBRDataModel.Add("Email", command.Email);
            CBRDataModel.Add("DomainName", command.DomainName);
            CBRDataModel.Add("UserName", command.UserName);
            CBRDataModel.Add("Password", passwordHash);
            CBRDataModel.Add("Country", command.Country);
            CBRDataModel.Add("CreationTime", DateTime.Now);
            CBRDataModel.Add("EmailKey", resultString);
            CBRDataModel.Add("IsVerified", false);
            CBRDataModel.Add("VerificationTime", null);
            try
            {
                string firstCharacterOfLastName = "";
                if (command.LastName != null && command.LastName.Length > 1)
                {
                    firstCharacterOfLastName =" "+ command.LastName.Substring(0,1);
                }
                await SetDNS(setDNSCommand);
                int CreatedcompanyId = (int)_dapper.ExecuteScalar(insertcregistrationsql, CBRDataModel, commandType: CommandType.Text);

                string verificationURL = "https://" + setDNSCommand.DomainName + "/key/" + resultString;
                string domainName = "https://" + setDNSCommand.DomainName;
                Email email = CreateEmailObject(command.CompanyName,command.FirstName + firstCharacterOfLastName, verificationURL, command.Email, domainName) ;
                await emailService.SendEmailViaSES(email.Body, email.Subject, email.To);
                return new CompanyBasicRegistrationResponse
                {
                    message = "registration successfully",
                    CompanyBasicRegistrationId = CreatedcompanyId
                };
            }
            catch (Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                throw e;
            }
        }
        private Email CreateEmailObject(string companyName,string userName,string verificationURL,string emailId,string domainName)
        {
            Email email = new Email();
            email.Subject = "BuildrOps Email Verification.";
            email.To = emailId;
            email.Body = @"<!DOCTYPE html>
<html lang='en' xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:v='urn:schemas-microsoft-com:vml'>
<head>
<title></title>
<meta content='text/html; charset=utf-8' http-equiv='Content-Type' />
<meta content='width=device-width, initial-scale=1.0' name='viewport' />

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

    * { box-sizing: border-box;}

    body {margin: 0;padding: 0;}
    .button:hover {background-color: #ffb92c !important; color: #ffffff !important;}
    .sectionborder {padding: 15px 20px}
    a[x-apple-data-detectors] {color: inherit !important;text-decoration: inherit !important;}
    #MessageViewBody a {color: inherit;text-decoration: none;}
    p {line-height: inherit;}

    @media (max-width: 600px) {
      .icons-inner {text-align: center;}
      .icons-inner td {margin: 0 auto;}
      .row-content {width: 100% !important;}
      .image_block img.big { width: auto !important;}
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
    <table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-1' role='presentation'
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
                    <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='
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
    <table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-2' role='presentation'
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
                    height: 291px;
                    background-color: #ffffff;
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
                    <table border='0' cellpadding='0' cellspacing='0' class='image_block' role='presentation' style='
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            margin-top: 41px;
                            color: #f5f3f3;
                            font-size: 24px;
                            font-weight: 600;
                            margin-left: 20px;
                            font-family: Open Sans, sans-serif;

                          ' width=''>
                      <tr valign='top'>
                        <td width='480px' valign='top'>
                          <span style='float: left;'>Welcome to </span>
                          <img width='227' style='float:left;padding-left: 5px;position: relative;top: 0px;padding-right: 5px;' src='https://staging.buildrops.com/assets/emailImages/BuildrOps-Naming-logo-email.png' alt='BuildrOps'>
                          <span style='float: left;'>{companyName}</span>
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
    <table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-3' role='presentation'
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
                            <span style='font-size: 20px; font-weight: 600;'><strong>You are now ready to Optimize {companyName}</strong></span>
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
                            <span style='font-size: 12px'>
                              We are excited to welcome you to the next generation in project management software. Please confirm your email below for <strong style='color:#ffb92c'>Enhanced Optimization</strong> through software solutions and smart technologies.
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
    <table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-4' role='presentation'
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
                                            Confirm Email         
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
                      style='margin: 0; padding: 0;font-size: 18px; font-weight:bold;padding-bottom:5px;color: #001F38;font-family: Open Sans, sans-serif;'>
                      Title One</h3>
                    <p style='font-size: 12px;margin: 0; font-weight:normal;  color: #001F38;line-height:17px !important;
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
    <table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-3' role='presentation'
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
                  <td><img src='https://staging.buildrops.com/assets/emailImages/clippath.png' width='205' height='134'  alt='Image Path'></td>
                  <td valign='top'>
                    <h3
                      style='margin: 0; padding: 0;font-size: 18px; font-weight:bold;padding-bottom:5px;color: #001F38;font-family: Open Sans, sans-serif;'>
                      Title One</h3>
                    <p style='font-size: 12px;margin: 0; font-weight:normal; color: #001F38;line-height:17px !important;
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
    <table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-3' role='presentation'
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
                  <td><img src='https://staging.buildrops.com/assets/emailImages/clippath.png' width='205' height='134'  alt='Image Path'></td>
                  <td valign='top'>
                    <h3
                      style='margin: 0; padding: 0;font-size: 18px; font-weight:bold;padding-bottom:5px;color: #001F38;font-family: Open Sans, sans-serif;'>
                      Title One</h3>
                    <p style='font-size: 12px; margin: 0; font-weight:normal;  color: #001F38;line-height:17px !important;
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
<table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-13' role='presentation'
style='mso-table-lspace: 0pt; mso-table-rspace: 0pt' width='100%'>
<tbody>
<tr>
  <td>

<table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation' style='
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          color: #000000;
          width: 600px;
        ' width='585'>
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
              role='presentation' style=' mso-table-lspace: 0pt;font-family: Open Sans, sans-serif;
                        font-size: 15px;
                        font-weight: 600;
                          color: #07b9ec;
                        mso-table-rspace: 0pt; '
                        
                        width='350px'>
              <tr>
                <td style='padding:0 20px 0 0'>
                  <a  href='#' style='color: #07b9ec !important; text-decoration: none !important;'>Title One</a>
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
              <table border='0' cellpadding='0' cellspacing='0'  role='presentation' style='
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
                                padding-top: 17px;
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
                      <strong><span style='font-size: 13px'>{userName}<span style='color: #ffb92c'>
                            <span style='padding-left: 5px;'> |</span>  <span style='padding-left: 5px;'>Admin</span></span></strong>
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
                  ' width='585'>
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
                      Our team has secured your 14 day trail  to optimize your custom environment. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
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
                  ' width='585'>
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
                  ' width='585'>
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
            email.Body = email.Body.Replace("{userName}", userName);
            email.Body = email.Body.Replace("{WebsiteName}", domainName);
            return email;
        }
        public  EmailVerificationResponse EmailVerification(EmailVerificationCommand command)
        {
            string findSqlQuery = @"SELECT * FROM [dbo].[CompanyBasicRegistration] where EmailKey =@EmailKey";
            DynamicParameters emailVerificationParameter = new DynamicParameters();
            emailVerificationParameter.Add("EmailKey", command.CompanyRegisterKey);
            var findEmailData = _dapper.Get<CompanyBasicRegistrationCommand>(findSqlQuery, emailVerificationParameter, commandType: CommandType.Text);
            if(findEmailData != null)
            {
               
                if(findEmailData.IsVerified == true)
                {
                    return new EmailVerificationResponse
                    {
                        message = "Allready verified Please login",
                        IsVarified = true
                        

                        
                    };
                }
                else
                {

                    string sqlUpdateCommand = "UPDATE [dbo].[CompanyBasicRegistration] SET IsVerified=@IsVerified, VerificationTime=@VerificationTime where Id=@Id";
                    DynamicParameters uDataModel = new DynamicParameters();
                   
                    uDataModel.Add("IsVerified", true );
                    uDataModel.Add("VerificationTime", DateTime.Now );
                    uDataModel.Add("Id", findEmailData.Id);

                    _dapper.Update<CompanyBasicRegistrationResponse>(sqlUpdateCommand, uDataModel, commandType: CommandType.Text);



                    string insertCompany = @"INSERT INTO [dbo].[Company]
                     ([CompanyName]
                       ,[CreatedOn]
                       ,[ModifiedOn])
                      OUTPUT inserted.Id VALUES(@CompanyName,@CreatedOn,@ModifiedOn);" ;
                    DynamicParameters ComapnyDataModel = new DynamicParameters();
                    ComapnyDataModel.Add("CompanyName", findEmailData.CompanyName);
                    ComapnyDataModel.Add("CreatedOn", DateTime.Now);
                    ComapnyDataModel.Add("ModifiedOn", null);

                   int instercompany = (int) _dapper.ExecuteScalar(insertCompany, ComapnyDataModel, commandType: CommandType.Text);



                    string insterIntoProfile = @"INSERT INTO [dbo].[ProfileComplete]
                        ([CompanyId]
                       ,[ProfileComplete])
                      VALUES(@CompanyId,@ProfileComplete);";

                    DynamicParameters instetedParameter = new DynamicParameters();
                    instetedParameter.Add("CompanyId", instercompany);
                    instetedParameter.Add("ProfileComplete", '0');

                    _dapper.ExecuteScalar(insterIntoProfile, instetedParameter, commandType: CommandType.Text);


                    string insertUser = @"INSERT INTO [dbo].[User]
                     ([FirstName]
                       ,[LastName]
                       ,[Email]
                       ,[UserName]
                       ,[CreatedDate]
                       ,[CompanyId])
                      OUTPUT inserted.Id VALUES(@FirstName,@LastName,@Email,@UserName,
                        @CreatedDate,@CompanyId);";
                    UserDataModel registerUser = new UserDataModel();
                    DynamicParameters UserData = new DynamicParameters();
                    registerUser.FirstName = findEmailData.FirstName;
                    registerUser.LastName = findEmailData.LastName;
                    registerUser.Email = findEmailData.Email;
                    UserData.Add("UserName", findEmailData.UserName);
                    UserData.Add("FirstName", findEmailData.FirstName);
                    UserData.Add("LastName",findEmailData.LastName);
                    UserData.Add("Email", findEmailData.Email);
                    UserData.Add("CreatedDate", DateTime.Now);
                    UserData.Add("CompanyId", instercompany);
                    try
                    {

                        int inserteduser =(int) _dapper.ExecuteScalar(insertUser, UserData, commandType: CommandType.Text);
                    registerUser.Id = inserteduser;
                    string insertuserloginsql = "INSERT INTO [dbo].[UserLogin]([UserId],[Password],[CreatedDate])VALUES(@UserId,@Password,@CreatedDate);";

                    DynamicParameters uLoginDataModel = new DynamicParameters();
                    uLoginDataModel.Add("UserId", inserteduser);
                    uLoginDataModel.Add("Password", findEmailData.Password);
                    uLoginDataModel.Add("CreatedDate", DateTime.Now);

                    _dapper.Execute(insertuserloginsql, uLoginDataModel, commandType: CommandType.Text);


                    
                        string token = GenrateToken(registerUser);
                        return new EmailVerificationResponse 
                        {
                            isAuth = true,
                            Token = token,
                            userLogin = $"{findEmailData.FirstName} {findEmailData.LastName}"
                        };
                    }
                    catch (Exception e)
                    {
                        _Logger.LogInformation(e, e.Message);
                        return null;
                    }

                }
            }
            else
            {
                return new EmailVerificationResponse
                {
                    IsVarified = true,
                    message = "no data found"
                };
            }
        }

        public FindCompanyResponse FindCompany(FindCompanyCommand command)
        {
            string getdata = @"SELECT * FROM[dbo].[CompanyBasicRegistration] where CompanyName= @CompanyName";
            DynamicParameters findCompanyNameParameter = new DynamicParameters();
            findCompanyNameParameter.Add("CompanyName", command.CompanyName);

            var findCompanyName = _dapper.Get<FindCompanyCommand>(getdata, findCompanyNameParameter, commandType: CommandType.Text);
            if (findCompanyName == null)
            {
                return new FindCompanyResponse
                {
                    message = "no Company Found",
                    IsCompanyNameAvailable = false
                };
            }
            else 
            {
                if (findCompanyName.IsVerified == false) 
                {
                    return new FindCompanyResponse
                    {
                        message = "Company Name Allready avilable",
                        IsCompanyNameAvailable = true
                    };
                }
                else
                {
                    return new FindCompanyResponse
                    {
                        message = "Company name is allready registered",
                        IsCompanyNameAvailable = true
                    };
                }
            }
        }

        public FindDomainResponse FindDomain(FindDomainCommand command)
        {
            string findSqlQuery = @"SELECT* FROM[dbo].[CompanyBasicRegistration] where DomainName = @DomainName";
            DynamicParameters domainParameter = new DynamicParameters();
            domainParameter.Add("DomainName", command.DomainName);
            var findDomain = _dapper.Get<FindDomainCommand>(findSqlQuery, domainParameter, commandType: CommandType.Text);
            if (findDomain == null)
            {
                return new FindDomainResponse
                {
                    message = "No Such UserNameFound Found",
                    isDomainAvailable = false
                };
            }
            else
            {
                if (findDomain.IsVerified == false)
                {
                    return new FindDomainResponse
                    {
                        message = "UserName Allready avilable But not Verified",
                        isDomainAvailable = true,
                        CompanyName = findDomain.CompanyName

                    };
                }
                else
                {
                    return new FindDomainResponse
                    {
                        message = "UserName is allready registered",
                        isDomainAvailable = true,
                        CompanyName = findDomain.CompanyName
                        
                    };
                }
            }

        }

        public FindUserNameResponse FindUserName(FindUserNameCommand command)
        {
            string sqlQuery = @"SELECT* FROM [dbo].[CompanyBasicRegistration] where UserName = @UserName";
            DynamicParameters usernameParameter = new DynamicParameters();
            usernameParameter.Add("UserName", command.UserName);
            var findUserName = _dapper.Get<FindUserNameCommand>(sqlQuery, usernameParameter, commandType: CommandType.Text);

            if (findUserName == null)
            {
                return new FindUserNameResponse
                {
                    message = "No Such UserNameFOund Found",
                    isUsernameAvailable = false
                };
            }
            else
            {
                if (findUserName.IsVerified == false)
                {
                    return new FindUserNameResponse
                    {
                        message ="UserName Allready avilable But not Verified",
                        isUsernameAvailable = true
                    };
                }
                else
                {
                    return new FindUserNameResponse
                    {
                        message = "UserName is allready registered",
                        isUsernameAvailable = true
                    };
                }
            }
        }
        public async Task<ResendEmailResponse>  ResendEmail(ResendEmailCommand command)
        {
            string sqlQuery = @"SELECT * FROM [dbo].[CompanyBasicRegistration] where Email = @Email";
            DynamicParameters FindEmailParameter = new DynamicParameters();
            FindEmailParameter.Add("Email", command.Email);
            var foundEmailRow = _dapper.Get<CompanyBasicRegistrationCommand>(sqlQuery, FindEmailParameter, commandType: CommandType.Text);

            if (foundEmailRow != null)
            {

                var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                var Charsarr = new char[40];
                var random = new Random();

                for (int i = 0; i < Charsarr.Length; i++)
                {
                    Charsarr[i] = characters[random.Next(characters.Length)];
                }

                var resultString = new string(Charsarr);


                string UpdateQuery = "UPDATE[dbo].[CompanyBasicRegistration] SET EmailKey = @EmailKey where Email = @Email";
                DynamicParameters UpdateEmailKeyParameter = new DynamicParameters();
                UpdateEmailKeyParameter.Add("Email", command.Email);
                UpdateEmailKeyParameter.Add("EmailKey", resultString);

                try
                {
                    string firstCharacterOfLastName = "";
                    if (foundEmailRow.LastName != null && foundEmailRow.LastName.Length > 1)
                    {
                        firstCharacterOfLastName = " " + foundEmailRow.LastName.Substring(0, 1);
                    }

                    string verificationURL = "https://" + foundEmailRow.DomainName + "/key/" + resultString;
                    string domainName = "https://" + foundEmailRow.DomainName;
                    Email email = CreateEmailObject(foundEmailRow.CompanyName, foundEmailRow.FirstName+firstCharacterOfLastName, verificationURL, command.Email, domainName);
                    await emailService.SendEmailViaSES(email.Body, email.Subject, email.To);

                    _dapper.Update<ResendEmailResponse>(UpdateQuery, UpdateEmailKeyParameter, commandType: CommandType.Text);

                    return new ResendEmailResponse
                    {
                        message = "send Email successfully",
                        IsSuccess = true
                    };

                }
                catch (Exception e)
                {
                    _Logger.LogInformation(e, e.Message);
                    throw e;
                }
            }
            else
            {
                return new ResendEmailResponse
                {
                    message = "No Email found",
                    IsSuccess = false
                };

            }

        }

        private string GenrateToken(UserDataModel user)
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

          
            var Des = new SecurityTokenDescriptor()
            {
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)), SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(claims),
            };
            var tokenHandler = token.CreateToken(Des);

            string GenJwtToken = token.WriteToken(tokenHandler).ToString();

            return GenJwtToken;
        }
        private async Task<SetDNSResponse> SetDNS(SetDNSCommand command)
        {
            var client = new AmazonRoute53Client("AKIASOQKCLHC6TMMUSOR", "72wMqHX04NG6rOV46i9je5gCoExVCGBvw3JlAjb4", RegionEndpoint.USEast1);
            //var client = AWSClientFactory.CreateAmazonRoute53Client("AKIASOQKCLHCVWVFDOE7", "jgtGgnhf79HkVDhTDog/eT+uBXnKok+gYgXS1RHB", RegionEndpoint.USEast1);
            string name = command.DomainName;
            string value = "staging.buildrops.com";
            var request = new ChangeResourceRecordSetsRequest()
            {
                HostedZoneId = "Z07382722910MW638GK7T",
                ChangeBatch = new ChangeBatch()
                {
                    Changes =
                        new List<Change>()
                        {
                            new Change() { Action = "UPSERT", ResourceRecordSet = new ResourceRecordSet()
                            {
                                Name = name,
                                Type = "CNAME",
                                TTL = 300,
                                ResourceRecords = new List<ResourceRecord>()
                                {
                                    new ResourceRecord()
                                    {
                                        Value = value
                                    }
                                }
                            } }
                        }
                }
            };
            await CloudfrontChanges(name);
            await client.ChangeResourceRecordSetsAsync(request);
            return new SetDNSResponse() { };
        }
        private async Task CloudfrontChanges(string domainName)
        {
            string distributionId = "ERJSJQ8T4XH0R";
            var client = new AmazonCloudFrontClient("AKIASOQKCLHC6TMMUSOR", "72wMqHX04NG6rOV46i9je5gCoExVCGBvw3JlAjb4", RegionEndpoint.USEast1);
            var distribution = await client.GetDistributionAsync(new GetDistributionRequest
            {
                Id = distributionId
            });
            var list = distribution.Distribution.DistributionConfig.Aliases.Items;
            distribution.Distribution.DistributionConfig.Aliases.Items.Add(domainName);
            distribution.Distribution.DistributionConfig.Aliases.Quantity++;
            await client.UpdateDistributionAsync(new UpdateDistributionRequest
            {
                Id = distributionId,
                DistributionConfig = distribution.Distribution.DistributionConfig,
                IfMatch = distribution.ETag
            });
            client.Dispose();
        }

        public async Task<FindEmailResponse> FindEmail(FindEmailCommand command)
        {
            string sqlQuery = @"SELECT* FROM [dbo].[CompanyBasicRegistration] where Email = @Email";
            DynamicParameters usernameParameter = new DynamicParameters();
            usernameParameter.Add("Email", command.Email);
            var findUserName = _dapper.Get<FindEmailCommand>(sqlQuery, usernameParameter, commandType: CommandType.Text);

            if (findUserName == null)
            {
                return new FindEmailResponse
                {
                    isEmailAvailable = false
                };
            }
            else
            {
                return new FindEmailResponse
                {
                    isEmailAvailable = true
                };
            }

        }

       
    }
}
