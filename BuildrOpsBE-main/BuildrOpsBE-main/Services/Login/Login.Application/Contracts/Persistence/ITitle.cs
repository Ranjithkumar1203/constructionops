using Login.Application.Features.Title.Command.CreateTitle;
using Login.Application.Features.Title.Command.DeleteTitle;
using Login.Application.Features.Title.Command.GetTitle;
using Login.Application.Features.Title.Command.UpdateTitle;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Contracts.Persistence
{
    public interface ITitle
    {
        public List<GetTitleResponse> GetTitleByCompanyId(GetTitleCommand command);
        public CreateTitleResponse CreateTitle(CreateTitleCommand command);
        public DeleteTitleResponse DeleteTitle(DeleteTitleCommand commad);
        public UpdateTitleResponse UpdateTitle(UpdateTitleCommand command);
    }
}
