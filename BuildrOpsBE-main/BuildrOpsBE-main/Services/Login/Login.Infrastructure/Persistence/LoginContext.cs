using Microsoft.EntityFrameworkCore;
using Login.Domain.Common;
using Login.Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;
using BC = BCrypt.Net.BCrypt;

namespace Login.Infrastructure.Persistence
{
    public class LoginContext : DbContext
    {
        public LoginContext() { }

        public LoginContext(DbContextOptions<LoginContext> options) : base(options)
        {
        }
}
}
