using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.Title.Command.DeleteTitle
{
    public class DeleteTitleCommand : IRequest<DeleteTitleResponse>
    {
        public int TitleId { get; set; }

    }
}
