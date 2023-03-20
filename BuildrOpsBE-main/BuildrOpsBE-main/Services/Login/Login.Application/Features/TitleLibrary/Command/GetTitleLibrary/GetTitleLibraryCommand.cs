using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.TitleLibrary.Command.GetTitleLibrary
{
    public class GetTitleLibraryCommand : IRequest<List<GetTitleLibraryResponse>>
    {
        public int CompanyId { get; set; }

    }
}
