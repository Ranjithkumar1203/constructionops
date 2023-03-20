using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.Holiday.Commands.UpdateHoliday
{
    public class UpdateHolidayHandler : IRequestHandler<UpdateHolidayCommand, UpdateHolidayResponse>
    {

        IHoliday _HolidayRepo;
        public UpdateHolidayHandler(IHoliday holiday)
        {
            _HolidayRepo = holiday;
        }

        public async Task<UpdateHolidayResponse> Handle(UpdateHolidayCommand request, CancellationToken cancellationToken)
        {
            return _HolidayRepo.UpdateHoliday(request);
        }
    }
}
