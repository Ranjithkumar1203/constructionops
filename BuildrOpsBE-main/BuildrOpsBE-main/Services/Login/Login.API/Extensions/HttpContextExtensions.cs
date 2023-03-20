using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Login.API.Extensions
{
    public static class HttpContextExtensions
    {
        public static Claim GetClaimByStringType(this HttpContext context , string type )
        {
            return context.User.Claims.Where(x => x.Type == type).FirstOrDefault();
        }
    }
}
