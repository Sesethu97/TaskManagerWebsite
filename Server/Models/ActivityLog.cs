namespace TaskManagerAPI.Models
{
    public class ActivityLog
    {
        
            public int Id { get; set; }
            public int TaskItemId { get; set; }
            public string Action { get; set; }
            public DateTime Timestamp { get; set; }
            public int UserId { get; set; }
        

    }
}
