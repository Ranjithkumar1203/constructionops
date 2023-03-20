using MediatR;
using System;
using System.Runtime.Serialization;

namespace BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindUserName
{
    public  class FindUserNameCommand :IRequest<FindUserNameResponse>
    {
        public string UserName { get; set; }
        [IgnoreDataMember]
        public Boolean IsVerified { get; set; }

    }
}
