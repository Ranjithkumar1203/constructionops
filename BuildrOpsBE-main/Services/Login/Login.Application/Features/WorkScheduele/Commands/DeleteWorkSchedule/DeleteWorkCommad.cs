using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.WorkScheduele.Commands.DeleteWorkSchedule
{
    public class DeleteWorkCommad : IRequest<DeleteWorkCommandResponse>
    {
        public int WorkScheduleId { get; set; }
    }
    public class DeleteWorkScheduleListCommand
    {
        public List<DeleteWorkCommad> DeleteWorkScheduleCommands { get; set; }
    }
}
