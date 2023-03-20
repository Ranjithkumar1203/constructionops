using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyCustomers.Commands.GetCompanyCustomers
{
  public  class GetCompanyCustomerscommand:IRequest<List<GetCompanyCustomersResponse>>
    {
        public int CompanyId { get; set; }
    }
}
