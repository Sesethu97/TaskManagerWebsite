using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagerAPI.Data;
using TaskManagerAPI.Interfaces;
using TaskManagerAPI.Models;

public class UserServices : IUserServices
{
    private readonly AppDbContext _context;

    public UserServices(AppDbContext context)
    {
        _context = context;
    }

    public async Task<TaskUsers> CreateUser(TaskUsers user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<TaskUsers> UpdateUser(TaskUsers user)
    {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<TaskUsers> DeleteUser(TaskUsers user)
    {
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<List<TaskUsers>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task<TaskUsers> GetUsersById(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<TaskUsers> GetUsersByName(string name)
    {
        return await _context.Users.FirstOrDefaultAsync(x => x.Name == name);
    }

    public async Task<TaskUsers> GetUsersByEmail(string email)
    {
        return await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
    }

    public async Task<TaskUsers> Login(string identifier, string password)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.Name == identifier || x.Email == identifier);

        if (user == null)
            return null;

        if (user.Password != password)
            return null;

        return user;
    }

}
