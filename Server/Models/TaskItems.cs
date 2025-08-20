using System.ComponentModel.DataAnnotations;

namespace TaskManagerAPI.Models
{
    public class TaskItems
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? DueDate { get; set; }
        public string Status { get; set; } 
        public string Priority { get; set; }
        public int? AssignedUserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
    }
}