using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Login.Commands.GetCompany
{
   public class GetCompanyCommand:IRequest<GetCompanyResponse>
    {
        public string Url { get; set; }
        public string CompanyName { get; set; }
        public bool IsVerified { get; set; }
    }
}
