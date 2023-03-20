using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyTask.Commands.GetCompanyTask
{
   public class GetCompanyTaskCommand : IRequest<List<GetCompanyTaskResponse>>
    {
        public int CompanyId { get; set; }
    }
}
