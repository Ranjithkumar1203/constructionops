using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.WorkLibrary.Commands.DeleteWorkSchduleLibrary
{
    public class DeleteWorkScheduleLibraryCommand : IRequest<DeleteWorkScheduleLibraryResponse>
    {
        public int LibraryId { get; set; }
    }
}
