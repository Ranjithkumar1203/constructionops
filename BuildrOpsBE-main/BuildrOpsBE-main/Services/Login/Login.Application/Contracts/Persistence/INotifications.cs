using Login.Application.Features.Notifications.Commands.GetNotifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Application.Contracts.Persistence
{
    public interface INotifications
    {
        public List<GetNotificationsResponse> GetNotificationsByUserId(GetNotificationsCommand command);
    }
}
