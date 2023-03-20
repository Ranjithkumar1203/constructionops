using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.Login.Commands.ForgetPassword
{
    public class ForgetPasswordHandler : IRequestHandler<ForgetPasswordCommand, ForgetPasswordResponse>
    {
        private IUserRepository _userRepository;
        public ForgetPasswordHandler(IUserRepository repository)
        {
            _userRepository = repository;
        }
        public async Task<ForgetPasswordResponse> Handle(ForgetPasswordCommand request, CancellationToken cancellationToken)
        {
            return await _userRepository.ForgetPassword(request);
        }
    }
}
