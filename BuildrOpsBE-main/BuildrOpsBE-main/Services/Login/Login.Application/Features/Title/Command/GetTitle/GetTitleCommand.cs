using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Features.Title.Command.GetTitle
{
    public class GetTitleCommand : IRequest<List<GetTitleResponse>>
    {
        public int CompanyId { get; set; }

    }
}
