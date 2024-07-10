using Calendaurus.Models;
using Microsoft.EntityFrameworkCore;

namespace Calendaurus.Services;

public class UserRepository : IUserRepository
{
    private readonly CalendaurusContext _context;
    private readonly DbSet<User> _users;

    public UserRepository(CalendaurusContext context)
    {
        _context = context;
        _users = context.Users;
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _users.FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<User> CreateAsync(User user)
    {
        _users.Add(user);

        await _context.SaveChangesAsync();

        return user;
    }
}