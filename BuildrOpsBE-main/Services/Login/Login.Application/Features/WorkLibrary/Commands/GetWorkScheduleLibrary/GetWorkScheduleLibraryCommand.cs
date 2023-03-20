using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.WorkLibrary.Commands.GetWorkScheduleLibrary
{
    public class GetWorkScheduleLibraryCommand : IRequest< List<GetWorkScheduleLibraryResponse>>
    {
        public int CompanyId { get; set; } 
    }
}
