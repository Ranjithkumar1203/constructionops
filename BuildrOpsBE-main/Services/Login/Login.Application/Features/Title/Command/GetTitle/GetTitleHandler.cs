using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.Title.Command.GetTitle
{
    public class GetTitleHandler : IRequestHandler<GetTitleCommand, List<GetTitleResponse>>
    {

        ITitle _TitleRepo;
        public GetTitleHandler(ITitle Title)
        {
            _TitleRepo = Title;
        }

        public async Task<List<GetTitleResponse>> Handle(GetTitleCommand request, CancellationToken cancellationToken)
        {
            return _TitleRepo.GetTitleByCompanyId(request);
        }
    }
}
