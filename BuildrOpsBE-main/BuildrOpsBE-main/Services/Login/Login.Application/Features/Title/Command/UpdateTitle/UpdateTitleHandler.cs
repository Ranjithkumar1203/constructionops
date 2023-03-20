using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.Title.Command.UpdateTitle
{
    public class UpdateTitleHandler : IRequestHandler<UpdateTitleCommand, UpdateTitleResponse>
    {

        ITitle _TitleRepo;
        public UpdateTitleHandler(ITitle Title)
        {
            _TitleRepo = Title;
        }

        public async Task<UpdateTitleResponse> Handle(UpdateTitleCommand request, CancellationToken cancellationToken)
        {
            return _TitleRepo.UpdateTitle(request);
        }
    }
}
