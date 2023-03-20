using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyUsers.Commands.GetCompanyUser
{
    public class GetCompanyUserCommand : IRequest<List<GetCompanyUserResponse>>
    {
        public int CompanyId { get; set; }
    }
}
