using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.Title.Command.CreateTitle
{
    public class CreateTitleHandler : IRequestHandler<CreateTitleCommand, CreateTitleResponse>
    {

        ITitle _TitleRepo;
        public CreateTitleHandler(ITitle Title)
        {
            _TitleRepo = Title;
        }

        public async Task<CreateTitleResponse> Handle(CreateTitleCommand request, CancellationToken cancellationToken)
        {
            return _TitleRepo.CreateTitle(request);
        }
    }
}
