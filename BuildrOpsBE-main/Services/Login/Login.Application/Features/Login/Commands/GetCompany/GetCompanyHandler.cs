using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Login.Commands.GetCompany
{
    class GetCompanyHandler:IRequestHandler<GetCompanyCommand,GetCompanyResponse>
    {
        private IUserRepository _userRepository;
        public GetCompanyHandler(IUserRepository repository)
        {
            _userRepository = repository;
        }

        public async Task<GetCompanyResponse> Handle(GetCompanyCommand request, CancellationToken cancellationToken)
        {
            return await _userRepository.GetCompany(request);
        }
    }
}
