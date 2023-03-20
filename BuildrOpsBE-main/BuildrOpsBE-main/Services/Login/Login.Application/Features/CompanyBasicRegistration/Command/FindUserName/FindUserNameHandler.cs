using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindUserName
{
    public class FindUserNameHandler : IRequestHandler<FindUserNameCommand, FindUserNameResponse>
    {
        ICompanyRegistration _CompanyRegistration;
        public FindUserNameHandler(ICompanyRegistration CompanyRegistration)
        {
            _CompanyRegistration = CompanyRegistration;
        }

        public async Task<FindUserNameResponse> Handle(FindUserNameCommand request, CancellationToken cancellationToken)
        {
            return _CompanyRegistration.FindUserName(request);
        }
    }
}
