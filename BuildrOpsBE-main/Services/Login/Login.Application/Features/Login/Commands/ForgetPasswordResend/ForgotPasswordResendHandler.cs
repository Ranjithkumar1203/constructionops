using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Login.Commands.ForgetPasswordResend
{
  public  class ForgotPasswordResendHandler:IRequestHandler<ForgotPasswordResendCommand,ForgotPasswordResendResponse>
    {
        private IUserRepository _userRepository;
        public ForgotPasswordResendHandler(IUserRepository repository)
        {
            _userRepository = repository;
        }

        public async Task<ForgotPasswordResendResponse> Handle(ForgotPasswordResendCommand request, CancellationToken cancellationToken)
        {
            return await _userRepository.ForgetPasswordResend(request);
        }
    }
}
