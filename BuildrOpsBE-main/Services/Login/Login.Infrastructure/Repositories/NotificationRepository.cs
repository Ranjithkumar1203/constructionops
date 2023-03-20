using Login.Application.Contracts.Persistence;
using Login.Application.Features.Notifications.Commands.GetNotifications;
using Login.Infrastructure.Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Infrastructure.Repositories
{
    public class NotificationRepository : INotifications
    {

        private IDapper _dapper;
        public NotificationRepository(IDapper dapper)
        {
            _dapper = dapper;
        }
        public List<GetNotificationsResponse> GetNotificationsByUserId(GetNotificationsCommand command)
        {
            List<GetNotificationsResponse> responses = _dapper.GetAll<GetNotificationsResponse>($"SELECT * FROM [dbo].[Notifications] WHERE UserId={command.UserId} ", null, System.Data.CommandType.Text);
            return responses;
        }
    }
}
