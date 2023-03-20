using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyDesignSelection.Commands.GetDesignSelection
{
    public class GetDesignSelectionCommand : IRequest<List<GetDesignSelectionResponse>>
    {
        public int CompanyId { get; set; }
    }
}
