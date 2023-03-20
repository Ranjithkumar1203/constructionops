using Login.Application.Models;
using System.Threading.Tasks;

namespace Login.Application.Contracts.Infrastructure
{
    public interface IEmailService
    {
        Task<bool> SendEmail(Email email);
        Task SendEmailViaSES(string htmlBody, string subject, string recipient);
    }
}
