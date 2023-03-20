using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.Holiday.Commands.CreateHoliday
{
    public class CreateHolidayHandler : IRequestHandler<CreateHolidayCommand, CreateHolidayResponse>
    {

        IHoliday _HolidayRepo;
        public CreateHolidayHandler(IHoliday holiday)
        {
            _HolidayRepo = holiday;
        }

        public async Task<CreateHolidayResponse> Handle(CreateHolidayCommand request, CancellationToken cancellationToken)
        {
            return _HolidayRepo.CreateHoliday(request);
        }
    }
}
