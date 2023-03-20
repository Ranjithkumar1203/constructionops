using System;

namespace Login.Application.Features.Notifications.Commands.GetNotifications
{
    public class GetNotificationsResponse
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