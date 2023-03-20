using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.Login.Commands.ResetPassword
{
    public class ResetPasswordHandler : IRequestHandler<ResetPasswordCommand, ResetPassowrdResponse>
    {
        private IUserRepository _userRepository;
        public ResetPasswordHandler(IUserRepository repository)
        {
            _userRepository = repository;
        }

        public async Task<ResetPassowrdResponse> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
        {
            return await _userRepository.ResetPassword(request);
        }
    }
}
