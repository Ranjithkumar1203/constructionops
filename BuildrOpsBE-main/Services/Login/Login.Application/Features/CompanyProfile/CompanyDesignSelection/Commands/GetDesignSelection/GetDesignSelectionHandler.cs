using BuildrOps.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyDesignSelection.Commands.GetDesignSelection
{
    class GetDesignSelectionHandler : IRequestHandler<GetDesignSelectionCommand, List<GetDesignSelectionResponse>>
    {
        ICompanyProfile _CompanyProfileRepo;
        public GetDesignSelectionHandler(ICompanyProfile CompanyProfile)
        {
            _CompanyProfileRepo = CompanyProfile;
        }

        public async Task<List<GetDesignSelectionResponse>> Handle(GetDesignSelectionCommand request, CancellationToken cancellationToken)
        {
            return _CompanyProfileRepo.getCompanyDesign(request);
        }
    }
}
