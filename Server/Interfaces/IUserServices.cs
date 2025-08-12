using TaskManagerAPI.Models;

namespace TaskManagerAPI.Interfaces
{
    public interface IUserServices
    {
        Task<TaskUsers> CreateUser(TaskUsers user);
        Task<TaskUsers> UpdateUser(TaskUsers user);
        Task<TaskUsers> DeleteUser(TaskUsers user);
        Task<List<TaskUsers>> GetUsers();

        Task<TaskUsers> GetUsersById(int id);
        Task<TaskUsers> GetUsersByName(string name);
        Task<TaskUsers> GetUsersByEmail(string email);
    }
}
