using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyBasicRegistration.Command.CompanyBasicRegistration
{
    public class CompanyBasicRegistrationHandler : IRequestHandler<CompanyBasicRegistrationCommand, CompanyBasicRegistrationResponse>

    {
        ICompanyRegistration _CompanyRegistration;
        public CompanyBasicRegistrationHandler(ICompanyRegistration CompanyRegistration)
        {
            _CompanyRegistration = CompanyRegistration;
        }
        public async Task<CompanyBasicRegistrationResponse> Handle(CompanyBasicRegistrationCommand request, CancellationToken cancellationToken)
        {
            return await _CompanyRegistration.CompanyRegistration(request);
        }
    }
}
