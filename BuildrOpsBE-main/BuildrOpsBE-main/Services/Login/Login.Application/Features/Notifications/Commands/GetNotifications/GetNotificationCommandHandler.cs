using Login.Application.Contracts.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Login.Application.Features.Notifications.Commands.GetNotifications
{
    public class GetNotificationCommandHandler : IRequestHandler<GetNotificationsCommand, List<GetNotificationsResponse>>
    {
        INotifications _Notifications;
        public GetNotificationCommandHandler(INotifications notification) 
        {
            _Notifications = notification;
        }
        public async Task<List<GetNotificationsResponse>> Handle(GetNotificationsCommand request, CancellationToken cancellationToken)
        {
            return _Notifications.GetNotificationsByUserId(request);
        }
    }
}
