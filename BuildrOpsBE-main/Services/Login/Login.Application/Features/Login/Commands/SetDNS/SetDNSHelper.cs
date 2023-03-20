using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Login.Commands.SetDNS
{
    class SetDNSHelper : IRequestHandler<SetDNSCommand, SetDNSResponse>
    {
        private IUserRepository _userRepository;
        public SetDNSHelper(IUserRepository repository)
        {
            _userRepository = repository;
        }

        public async Task<SetDNSResponse> Handle(SetDNSCommand request, CancellationToken cancellationToken)
        {
            return null;
            /*return await _userRepository.SetDNS(request);*/

        }
    }
}