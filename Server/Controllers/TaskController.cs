using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DTO;
using System.Security.Claims;
using System.Threading.Tasks;
using TaskManagerAPI.Data;
using TaskManagerAPI.Interfaces;
using TaskManagerAPI.Models;
using TaskManagerAPI.Services;

namespace TaskManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskServices _taskServices;

        public TaskController(ITaskServices taskServices)
        {
            _taskServices = taskServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            var tasks = await _taskServices.GetAllTasks();
            return Ok(tasks);
        }

        [HttpPost("create")]
        public async Task<IActionResult> PostTask([FromBody] TaskItems items)
        {
            var newTasks = await _taskServices.CreateTask(items);
            return Ok(newTasks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(int id)
        {
            var tasks = await _taskServices.GetTaskById(id);
            if (tasks == null)
            {
                return NotFound();
            }
            return Ok(tasks);
        }

        [HttpGet("task/{letter}")]
        public async Task<IActionResult> GetTaskByLetter(string letter)
        {
            var task = await _taskServices.GetTasksByList(letter);
            if (task == null || !task.Any())
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = _taskServices.GetTaskById(id);
            if (task == null)
            {
                return NotFound();
            }
            var deleteTask = await _taskServices.DeleteById(task.Id);
            return Ok(deleteTask);

        }

        [HttpPut("update/{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] TasksDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedTask = await _taskServices.UpdateTask(id, dto);
            if (updatedTask == null) return NotFound();

            return Ok(updatedTask);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetTasksByUser(int userId)
        {
            var tasks = await _taskServices.GetTasksByUser(userId);
            if (tasks == null || !tasks.Any())
                return NotFound("No tasks found for this user.");

            return Ok(tasks);
        }


    }
}
