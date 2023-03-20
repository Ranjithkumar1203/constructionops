using MediatR;
using Login.Application.Contracts.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.Login.Commands.Permissions
{
    class GetPermissionCommandHandler : IRequestHandler<GetPermissionCommand, GetPermissionResponse>
    {
        private IUserRepository _userRepository;
        public GetPermissionCommandHandler(IUserRepository repository)
        {
            _userRepository = repository;
        }
        public async Task<GetPermissionResponse> Handle(GetPermissionCommand request, CancellationToken cancellationToken)
        {
            return await _userRepository.GetPermissionsAsync(request);
        }
    }
}
