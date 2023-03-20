using MediatR;
using System.Collections.Generic;

namespace Login.Application.Features.Notifications.Commands.GetNotifications
{
    public class GetNotificationsCommand : IRequest<List<GetNotificationsResponse>>
    {

        public int UserId { get; set; }

    }
}