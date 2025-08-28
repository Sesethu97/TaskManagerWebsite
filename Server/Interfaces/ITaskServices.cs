using Server.DTO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Interfaces
{
    public interface ITaskServices
    {
        Task<List<TaskItems>> GetAllTasks();
        Task<TaskItems> UpdateTask(int id, TasksDTO dto);

        Task<TaskItems> GetTaskById(int id);
        Task<List<TaskItems>> GetTasksByUser(int userId);

        Task<List<TaskItems>> GetTasksByList(string letter);
        Task<List<TaskItems>> GetTasksByDate(DateTime? date);

        Task<bool> DeleteById(int id);
        Task<bool> DeleteByName(string name);
        Task DeleteAll();

        Task<TaskItems> CreateTask(TaskItems task);
    }
}
