using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Login.Application.Contracts.Persistence;

namespace Login.Application.Features.Login.Commands.UserRegistration
{
    public class UserRegisterCommandHandler : IRequestHandler<UserRegisterCommand, RegistrationResponse>
    {
        private IUserRepository _userRepository;
        public UserRegisterCommandHandler(IUserRepository repository)
        {
            _userRepository = repository;
        }

        public async Task<RegistrationResponse> Handle(UserRegisterCommand request, CancellationToken cancellationToken)
        {
            return await _userRepository.RegisterUserAsync(request);

        }
    }
}
