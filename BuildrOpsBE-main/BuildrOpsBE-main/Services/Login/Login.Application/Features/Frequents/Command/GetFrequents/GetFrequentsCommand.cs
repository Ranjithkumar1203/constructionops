using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Frequents.Command.GetFrequents
{
    public class GetFrequentsCommand: IRequest<List<GetFrequentsResponse>>
    {
        public int UserId { get; set; }
    }
}
