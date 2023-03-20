using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.TitleLibrary.Command.DeleteTitleLibrary
{
    public class DeleteTitleLibraryCommand : IRequest<DeleteTitleLibraryResponse>
    {
        public int TitleLibraryId { get; set; }

    }
}
