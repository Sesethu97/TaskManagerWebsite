namespace TaskManagerAPI.Models
{
    public class TaskComments
    {

        public int Id { get; set; }
        public int TaskItemId { get; set; }
        public int UserId { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
