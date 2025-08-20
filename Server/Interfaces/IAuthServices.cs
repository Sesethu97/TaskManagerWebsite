using TaskManagerAPI.Models;

namespace Server.Interfaces
{
    public interface IAuthServices
    {
        Task<TaskUsers?> AuthenticateAsync(string email, string password);

    }
}
