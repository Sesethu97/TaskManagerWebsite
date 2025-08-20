using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using TaskManagerAPI.Data;
using TaskManagerAPI.Interfaces;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServices _userServices;

        public UserController(IUserServices userServices)
        {
            _userServices = userServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userServices.GetUsers(); 

            if (users == null || !users.Any())          
                return NoContent();

            return Ok(users);
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsersById(int id)
        {
            var user = await _userServices.GetUsersById(id);
            if (user == null )
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("user/{name}")]
        public async Task<IActionResult> GetUserbyName(string name)
        {
            var user = await _userServices.GetUsersByName(name);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);

        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _userServices.GetUsersById(id);

            if (user == null)
            {
                return NotFound();
            }
            var deleteUser = await _userServices.DeleteUser(user);
            return Ok(deleteUser);

        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromBody] TaskUsers user)
        {
            var existinguser = await _userServices.GetUsersByEmail(user.Email);
            if (existinguser != null)
            {
                return Conflict("A user with this email already exists.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var createdUser = await _userServices.CreateUser(user);
            return Ok(createdUser);
        }


        [HttpPut("update")]
        public IActionResult UpdateUser([FromBody] TaskUsers user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

         

            var updatedUser = _userServices.UpdateUser(user);
            return Ok(updatedUser);
        }
     

    }

}
