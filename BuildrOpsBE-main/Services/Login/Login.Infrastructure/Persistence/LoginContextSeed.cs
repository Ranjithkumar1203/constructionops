using Microsoft.Extensions.Logging;
using Login.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Login.Infrastructure.Persistence
{
    public class LoginContextSeed
    {
        public static async Task SeedAsync(LoginContext loginContext, ILogger<LoginContextSeed> logger)
        {
            //if (!loginContext.UserLogins.Any())
            //{
            //    loginContext.UserLogins.AddRange();
            //    await LoginContext.SaveChangesAsync();
            //    logger.LogInformation("Seed database associated with context {DbContextName}", typeof(LoginContext).Name);
            //}
        }


    }
}
