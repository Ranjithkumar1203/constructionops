using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Features.Notifications.Commands.UpdateNotificationRead
{
    public class UpdateNotificationCommand
    {
        public int Id { get; set; }
        public string NotificationText { get; set; }
        public string NotificationLevel { get; set; }
        public string NotificationType { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreatedOn { get; set; }
        public int UserId { get; set; }
    }
}
