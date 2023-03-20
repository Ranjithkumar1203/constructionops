using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.Title.Command.DeleteTitle
{
    public class DeleteTitleHandler : IRequestHandler<DeleteTitleCommand, DeleteTitleResponse>
    {

        ITitle _TitleRepo;
        public DeleteTitleHandler(ITitle Title)
        {
            _TitleRepo = Title;
        }

        public async Task<DeleteTitleResponse> Handle(DeleteTitleCommand request, CancellationToken cancellationToken)
        {
            return _TitleRepo.DeleteTitle(request);
        }
    }
}
