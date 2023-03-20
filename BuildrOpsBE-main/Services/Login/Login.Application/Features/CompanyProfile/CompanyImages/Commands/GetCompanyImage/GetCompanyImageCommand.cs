using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.CompanyProfile.CompanyImages.Commands.GetCompanyImage
{
   public class GetCompanyImageCommand:IRequest<List<GetCompanyImageResponse>>
    {
        public int CompanyId { get; set; }
    }
}
