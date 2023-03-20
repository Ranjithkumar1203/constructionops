using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.Holiday.Commands.GetHoliday
{
    public class GetHolidayHandler : IRequestHandler<GetHolidayCommand, List<GetHolidayResponse>>
    {

        IHoliday _HolidayRepo;
        public GetHolidayHandler(IHoliday holiday)
        {
            _HolidayRepo = holiday;
        }

        public async Task<List<GetHolidayResponse>> Handle(GetHolidayCommand request, CancellationToken cancellationToken)
        {
            return _HolidayRepo.GetHolidayByCompanyId(request);
        }
    }
}
