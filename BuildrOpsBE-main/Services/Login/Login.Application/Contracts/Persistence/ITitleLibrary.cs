using Login.Application.Features.TitleLibrary.Command.CreateTitleLibrary;
using Login.Application.Features.TitleLibrary.Command.DeleteTitleLibrary;
using Login.Application.Features.TitleLibrary.Command.GetTitleLibrary;
using Login.Application.Features.TitleLibrary.Command.UpdateTitleLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Contracts.Persistence
{
    public interface ITitleLibrary
    {
        public List<GetTitleLibraryResponse> GetTitleLibraryByCompanyId(GetTitleLibraryCommand command);
        public CreateTitleLibraryResponse CreateTitleLibrary(CreateTitleLibraryCommand command);
        public DeleteTitleLibraryResponse DeleteTitleLibrary(DeleteTitleLibraryCommand commad);
        public UpdateTitleLibraryResponse UpdateTitleLibrary(UpdateTitleLibraryCommand command);
    }
}
