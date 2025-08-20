using Microsoft.EntityFrameworkCore;
using Server.Interfaces;
using TaskManagerAPI.Data;
using TaskManagerAPI.Models;

namespace Server.Services
{
    public class AuthServices:IAuthServices
    {
        private readonly AppDbContext _context;

        public AuthServices(AppDbContext context)
        {
            _context = context;
        }

        public async Task<TaskUsers?> AuthenticateAsync(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null) return null;

            if (user.Password != password) return null;

            return user;
        }
    }
}
