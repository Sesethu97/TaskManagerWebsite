using Microsoft.EntityFrameworkCore;
using System.Linq;
using TaskManagerAPI.Data;
using TaskManagerAPI.Interfaces;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Services
{
    public class TaskServices : ITaskServices
    {
        private readonly AppDbContext _context;

        public TaskServices(AppDbContext context)
        {
            _context = context;
        }

        public async Task<TaskItems> CreateTask(TaskItems task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task DeleteAll()
        {
            _context.Tasks.RemoveRange(_context.Tasks);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteById(int id)
        {
            var taskId = _context.Tasks.FirstOrDefault(x => x.Id == id);

            if (taskId == null)
            {
                return false;
            }
            _context.Tasks.Remove(taskId);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteByName(string name)
        {
            var taskbyName = _context.Tasks.FirstOrDefault(x => x.Title == name);
            if (taskbyName == null)
            {
                return false;
            }
            _context.Remove(taskbyName);
            await _context.SaveChangesAsync();
            return true;

        }

        public Task<List<TaskItems>> GetAllTasks()
        {
            return _context.Tasks.ToListAsync();

        }

        public async Task<TaskItems> GetTaskById(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        public async Task<List<TaskItems>> GetTasksByDate(DateTime? date)
        {
            if (date == null)
            {
                return new List<TaskItems>();
            }
            var tasksByDate = await _context.Tasks
                .Where(x => x.DueDate.HasValue && x.DueDate.Value.Date == date.Value.Date)
                .ToListAsync();


            return tasksByDate;
        }

        public async Task<List<TaskItems>> GetTasksByList(string letter)
        {
            return await _context.Tasks
                .Where(x => x.Title.StartsWith(letter))
                .OrderBy(x => x.Title)
                .ToListAsync();
        }

    }

}
