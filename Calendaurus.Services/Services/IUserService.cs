using Calendaurus.Models;

namespace Calendaurus.Services;

public interface IUserService
{
    Task<User> GetByEmailAsync(string email);
}