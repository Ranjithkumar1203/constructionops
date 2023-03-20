using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Login.Application.Contracts.Infrastructure;
using Login.Application.Models;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;
using Amazon.SimpleEmail;
using Amazon.SimpleEmail.Model;
using System;
using System.Collections.Generic;
using Amazon;

namespace Login.Infrastructure.Mail
{
    public class EmailService : IEmailService
    {
        public EmailSettings _emailSettings { get; }
        public ILogger<EmailService> _logger { get; }

        public EmailService(IOptions<EmailSettings> mailSettings, ILogger<EmailService> logger)
        {
            _emailSettings = mailSettings.Value;
            _logger = logger;
        }

        public async Task<bool> SendEmail(Email email)
        {
            var client = new SendGridClient(_emailSettings.ApiKey);

            var subject = email.Subject;
            var to = new EmailAddress(email.To);
            var emailBody = email.Body;

            var from = new EmailAddress
            {
                Email = _emailSettings.FromAddress,
                Name = _emailSettings.FromName
            };

            var sendGridMessage = MailHelper.CreateSingleEmail(from, to, subject, emailBody, emailBody);
            var response = await client.SendEmailAsync(sendGridMessage);

            _logger.LogInformation("Email sent.");

            if (response.StatusCode == System.Net.HttpStatusCode.Accepted || response.StatusCode == System.Net.HttpStatusCode.OK)
                return true;

            _logger.LogError("Email sending failed.");

            return false;
        }
        public async Task SendEmailViaSES(string htmlBody, string subject, string recipient)
        {
            string source = "noreply@buildrops.com";        // Replace with the sender address.
            string awsAccessKey = "AKIASOQKCLHCSDYEYKEP";    // Replace with your AWS access key.
            string awsSecretKey = "6Ei2aJiRSGIczLCidjCSxThQ1M7hPWhFaRrRlrWi";    // Replace with your AWS secret key.

            // Setup the email recipients.
            var oDestination = new Destination();
            oDestination.ToAddresses = new List<string>() { recipient };

            // Create the email subject.
            var oSubject = new Amazon.SimpleEmail.Model.Content();
            oSubject.Data = subject;

            // Create the email body.
            var oBody = new Body();
            var bodycontent = new Amazon.SimpleEmail.Model.Content();
            bodycontent.Data = htmlBody;
            oBody.Html = bodycontent;

            // Create and transmit the email to the recipients via Amazon SES.
            var oMessage = new Message();
            oMessage.Subject = oSubject;
            oMessage.Body = oBody;
            var request = new SendEmailRequest();
            request.Source = source;
            request.Destination = oDestination;
            request.Message = oMessage;

            using (var client = new AmazonSimpleEmailServiceClient(awsAccessKey, awsSecretKey, RegionEndpoint.USEast2))
            {
                await client.SendEmailAsync(request);
            }
        }
    }
}
