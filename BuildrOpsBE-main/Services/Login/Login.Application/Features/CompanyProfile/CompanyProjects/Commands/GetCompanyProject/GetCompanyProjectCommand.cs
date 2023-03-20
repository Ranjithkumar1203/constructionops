using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyProjects.Commands.GetCompanyProject
{
    public class GetCompanyProjectCommand : IRequest<List<GetCompanyProjectResponse>>
    {
        public int CompanyId { get; set; }
    }
}
