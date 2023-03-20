using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyBasicRegistration.Command.FindCompany
{
   public class FindCompanyHandler : IRequestHandler<FindCompanyCommand, FindCompanyResponse>

    {

        ICompanyRegistration _CompanyRegistration;
        public FindCompanyHandler(ICompanyRegistration CompanyRegistration)
        {
            _CompanyRegistration = CompanyRegistration;
        }
        public async Task<FindCompanyResponse> Handle(FindCompanyCommand request, CancellationToken cancellationToken)
        {
            return _CompanyRegistration.FindCompany(request);
        }
    }
}
