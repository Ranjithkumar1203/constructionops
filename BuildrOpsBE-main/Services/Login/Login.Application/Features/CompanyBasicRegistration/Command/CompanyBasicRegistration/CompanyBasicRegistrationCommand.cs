using BuildrOps.Application.Features.CompanyBasicRegistration.Command.CompanyBasicRegistration;
using MediatR;
using System;
using System.Runtime.Serialization;

namespace BuildrOps.Application.Features.CompanyBasicRegistration
{
    public class CompanyBasicRegistrationCommand: IRequest<CompanyBasicRegistrationResponse>
    {
        [IgnoreDataMember]
        public int Id { get; set; }
       
        public string CompanyName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string DomainName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Country { get; set; }
        [IgnoreDataMember]
        public DateTime CreationTime { get; set; }
        [IgnoreDataMember]
        public string EmailKey { get; set; }
        [IgnoreDataMember]
        public Boolean IsVerified { get; set; }
        [IgnoreDataMember]
        public DateTime VerificationTime { get; set; }

    }
}
