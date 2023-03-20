using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Login.Application.Contracts.Persistence;

namespace Login.Application.Features.Login.Commands.LoginUser
{
    public class UserLoginCommandHandler : IRequestHandler<UserLoginCommand, UserLoginResponse>
    {
        private IUserRepository _userRepository;
        public UserLoginCommandHandler(IUserRepository repository)
        {
            _userRepository = repository;
        }
        public async Task<UserLoginResponse> Handle(UserLoginCommand request, CancellationToken cancellationToken)
        {
            return await _userRepository.LoginUser(request);
        }
    }
}
