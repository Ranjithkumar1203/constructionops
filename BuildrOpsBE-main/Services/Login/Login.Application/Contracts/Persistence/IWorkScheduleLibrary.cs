using Login.Application.Features.WorkLibrary.Commands.CreateWorkScheduleLibrary;
using Login.Application.Features.WorkLibrary.Commands.DeleteWorkSchduleLibrary;
using Login.Application.Features.WorkLibrary.Commands.GetWorkScheduleLibrary;
using Login.Application.Features.WorkLibrary.Commands.UpdateWorkSchduleLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Contracts.Persistence
{
    public interface IWorkScheduleLibrary
    {
        public List<GetWorkScheduleLibraryResponse> GetWorkScheduleLibraryById(GetWorkScheduleLibraryCommand command);
        public CreateWorkScheduleLibraryResponse CreateWorkScheduleLibrary(CreateWorkScheduleLibraryCommand command);
        public UpdateWorkScheduleLibraryResponse UpdateWorkScheduleLibrary(UpdateWorkSchduleLibraryCommand command);
        public DeleteWorkScheduleLibraryResponse DeleteWorkSchduleLibrary(DeleteWorkScheduleLibraryCommand command);
    }
}
