using MediatR;
using System;
using System.Runtime.Serialization;

namespace BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindCompany
{
    public class FindCompanyCommand : IRequest<FindCompanyResponse>
    {
        public string CompanyName { get; set; }
        [IgnoreDataMember]
        public Boolean IsVerified { get; set; }
    }
}
