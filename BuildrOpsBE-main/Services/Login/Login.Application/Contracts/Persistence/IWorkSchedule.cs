using Login.Application.Features.WorkScheduele.Commands.CreateWorkSchdule;
using Login.Application.Features.WorkScheduele.Commands.DeleteWorkSchedule;
using Login.Application.Features.WorkScheduele.Commands.GetWorkSchedule;
using Login.Application.Features.WorkScheduele.Commands.UpdateWorkSchedule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Contracts.Persistence
{
    public interface IWorkSchedule
    {
        public List<WorkScheduleResponse> GetScheduleByCompanyId(WorkSchduleCommand command);
        public CreateWorkSchduleResponse CreateWorkSchdule(CreateWrokScheduleCommand command);
        public DeleteWorkCommandResponse DeleteSchduleWork(DeleteWorkCommad commad);
        public UpdateWorkScheduleResponse UpdateWorkSchedule(UpdateWorkScheduleCommand command);
    }
}
