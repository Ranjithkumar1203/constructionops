using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Login.Commands.ForgetPasswordKeyVerification
{
    public class ForgetPasswordKeyVerificationHandler : IRequestHandler<ForgetPasswordKeyVerificationCommand, ForgetPasswordKeyVerificationResponse>
    {
        private IUserRepository _userRepository;
        public ForgetPasswordKeyVerificationHandler(IUserRepository repository)
        {
            _userRepository = repository;
        }

        public async Task<ForgetPasswordKeyVerificationResponse> Handle(ForgetPasswordKeyVerificationCommand request, CancellationToken cancellationToken)
        {
            return await _userRepository.FindPasswordKey(request);
        }
    }
}
