using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Login.Commands.ConstructionLogin
{
   public class ConstructionLoginCommand:IRequest<ConstructionLoginResponse>
    {
        public string User { get; set; }
        public string Password { get; set; }
        public string CompanyName { get; set; }
        public int Id { get; set; }
    }
}
