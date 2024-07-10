using Calendaurus.Models;

namespace Calendaurus.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<User> GetByEmailAsync(string email)
    {
        var user = await _userRepository.GetByEmailAsync(email);

        if (user == null)
        {
            user = new User
            {
                Id = new Guid(),
                Email = email
            };

            user = await _userRepository.CreateAsync(user);
        }

        return user!;
    }
}