using Login.Application.Contracts.Persistence;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Login.Commands.ConstructionLogin
{
    public class ConstructionLoginHandler:IRequestHandler<ConstructionLoginCommand, ConstructionLoginResponse>
    {
        private IUserRepository _userRepository;
        public ConstructionLoginHandler(IUserRepository repository)
        {
            _userRepository = repository;
        }

        public async Task<ConstructionLoginResponse> Handle(ConstructionLoginCommand request, CancellationToken cancellationToken)
        {
            return await _userRepository.ConstructionUser(request);
        }
    }
}
