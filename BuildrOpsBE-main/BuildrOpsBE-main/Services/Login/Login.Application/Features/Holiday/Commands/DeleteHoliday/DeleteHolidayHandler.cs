using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.Holiday.Commands.DeleteHoliday
{
    public class DeleteHolidayHandler : IRequestHandler<DeleteHolidayCommand, DeleteHolidayResponse>
    {

        IHoliday _HolidayRepo;
        public DeleteHolidayHandler(IHoliday holiday)
        {
            _HolidayRepo = holiday;
        }

        public async Task<DeleteHolidayResponse> Handle(DeleteHolidayCommand request, CancellationToken cancellationToken)
        {
            return _HolidayRepo.DeleteHoliday(request);
        }
    }
}
