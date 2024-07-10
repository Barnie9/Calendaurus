using System.ComponentModel.DataAnnotations;

namespace Calendaurus.Models;

public class User
{
    public Guid Id { get; set; }

    [Required, EmailAddress, StringLength(255)]
    public string Email { get; set; }
}