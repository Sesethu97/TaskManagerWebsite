using System.ComponentModel.DataAnnotations;

namespace Server.DTO
{
    public class UsersDTO
    {
        [Required]
        public string Name { get; set; }

        public string? PhoneNumber { get; set; }
    }
}
